'use client';
import {
  Copy,
  Eye,
  History,
  Plus,
  Save,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type {
  CmsEntityType,
  CmsRecord,
  CmsVersion,
  PublicationStatus,
} from '@/types/cms';
import { locales, type Locale } from '@/lib/i18n';
import { translationCompletion } from '@/types/translation';
const labels: Record<CmsEntityType, string> = {
  characters: 'Personagens',
  collections: 'Coleções',
  guardians: 'Guardiões',
  realms: 'Reinos',
  crowns: 'Coroas',
  weapons: 'Armas',
  creatures: 'Criaturas',
  events: 'Eventos canônicos',
  timeline: 'Timeline',
  locations: 'Locais',
  artifacts: 'Artefatos',
  factions: 'Facções',
  guilds: 'Guildas',
  bossEncounters: 'Encontros de boss',
  canonAliases: 'Aliases canônicos',
  semanticRelations: 'Relações semânticas',
  buildings: 'Construções',
  battles: 'Batalhas',
  printProfiles: 'Perfis de impressão',
  mediaAssets: 'Ativos de mídia',
  prompts: 'Prompts',
  roadmap: 'Roadmap',
  gallery: 'Galeria',
  news: 'Novidades',
  artBible: 'Art Bible',
  printGuide: 'Guia de impressão',
  stlAssets: 'Arquivos 3D',
  marketplaces: 'Marketplaces',
  marketplaceListings: 'Anúncios de marketplace',
  marketplacePrices: 'Histórico de preços',
};
export function EntityManager({ entity }: { entity: CmsEntityType }) {
  const [records, setRecords] = useState<CmsRecord[]>([]),
    [query, setQuery] = useState(''),
    [status, setStatus] = useState(''),
    [editing, setEditing] = useState<CmsRecord>(),
    [draft, setDraft] = useState(''),
    [slug, setSlug] = useState(''),
    [publication, setPublication] = useState<PublicationStatus>('draft'),
    [editorLocale, setEditorLocale] = useState<Locale>('pt-br'),
    [versions, setVersions] = useState<CmsVersion[]>([]),
    [message, setMessage] = useState(''),
    [loading, setLoading] = useState(true);
  async function load() {
    setLoading(true);
    const res = await fetch(`/api/admin/cms/${entity}`);
    setRecords(await res.json());
    setLoading(false);
  }
  useEffect(() => {
    void load();
  }, [entity]);
  const filtered = useMemo(
    () =>
      records.filter(
        (x) =>
          (!status || x.status === status) &&
          JSON.stringify(x.data).toLowerCase().includes(query.toLowerCase()),
      ),
    [records, query, status],
  );
  async function open(record?: CmsRecord) {
    setEditorLocale('pt-br');
    if (!record) {
      setEditing(undefined);
      setSlug('');
      setDraft(JSON.stringify({ name: '', summary: '' }, null, 2));
      setPublication('draft');
      setVersions([]);
      return;
    }
    const res = await fetch(
        `/api/admin/cms/${entity}/${encodeURIComponent(record.id)}`,
      ),
      json = await res.json();
    setEditing(record);
    setSlug(record.slug);
    setDraft(JSON.stringify(record.data, null, 2));
    setPublication(record.status);
    setVersions(json.versions || []);
  }
  function selectLocale(locale: Locale) {
    setEditorLocale(locale);
    if (locale === 'pt-br') {
      setDraft(
        JSON.stringify(editing?.data || { name: '', summary: '' }, null, 2),
      );
      setPublication(editing?.status || 'draft');
      return;
    }
    const translations = (editing?.data.translations || {}) as Record<
      string,
      { fields?: Record<string, unknown>; status?: PublicationStatus }
    >;
    const translation = translations[locale];
    setDraft(JSON.stringify(translation?.fields || {}, null, 2));
    setPublication(translation?.status || 'draft');
  }
  function currentCompletion() {
    try {
      return translationCompletion(
        entity,
        JSON.parse(draft || '{}') as Record<string, unknown>,
      );
    } catch {
      return 'incomplete';
    }
  }
  async function save() {
    try {
      const fields = JSON.parse(draft) as Record<string, unknown>;
      if (
        editorLocale !== 'pt-br' &&
        publication === 'published' &&
        translationCompletion(entity, fields) !== 'complete'
      ) {
        setMessage(
          'Tradução incompleta. Preencha os campos obrigatórios antes de publicar.',
        );
        return;
      }
      const existingTranslations = (editing?.data.translations || {}) as Record<
        string,
        unknown
      >;
      const data =
          editorLocale === 'pt-br'
            ? fields
            : {
                ...(editing?.data || {}),
                translations: {
                  ...existingTranslations,
                  [editorLocale]: {
                    fields,
                    status: publication,
                    updatedAt: new Date().toISOString(),
                  },
                },
              },
        url = editing
          ? `/api/admin/cms/${entity}/${encodeURIComponent(editing.id)}`
          : `/api/admin/cms/${entity}`,
        res = await fetch(url, {
          method: editing ? 'PATCH' : 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            slug,
            data,
            status:
              editorLocale === 'pt-br'
                ? publication
                : editing?.status || 'draft',
          }),
        }),
        json = await res.json();
      setMessage(json.message);
      if (res.ok) {
        await load();
        setEditing(undefined);
        setDraft('');
      }
    } catch {
      setMessage('JSON inválido. Revise os campos antes de salvar.');
    }
  }
  async function action(record: CmsRecord, type: 'duplicate' | 'delete') {
    if (
      type === 'delete' &&
      !confirm(`Excluir ${String(record.data.name || record.slug)}?`)
    )
      return;
    const res = await fetch(
        `/api/admin/cms/${entity}/${encodeURIComponent(record.id)}`,
        {
          method: type === 'delete' ? 'DELETE' : 'PATCH',
          headers: { 'content-type': 'application/json' },
          body:
            type === 'duplicate'
              ? JSON.stringify({ action: 'duplicate' })
              : undefined,
        },
      ),
      json = await res.json();
    setMessage(json.message);
    if (res.ok) await load();
  }
  async function restore(version: CmsVersion) {
    if (!editing || !confirm(`Restaurar a versão ${version.version}?`)) return;
    const res = await fetch(
        `/api/admin/cms/${entity}/${encodeURIComponent(editing.id)}`,
        {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action: 'restore', versionId: version.id }),
        },
      ),
      json = await res.json();
    setMessage(json.message);
    if (res.ok) {
      await load();
      await open(json.record);
    }
  }
  return (
    <>
      <p className="admin-panel" aria-live="polite">
        {message || `${records.length} registros em ${labels[entity]}.`}
      </p>
      <div className="admin-toolbar">
        <label className="admin-input" style={{ display: 'flex', gap: 8 }}>
          <Search size={16} />
          <input
            style={{
              background: 'transparent',
              border: 0,
              color: 'white',
              outline: 0,
            }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar conteúdo"
          />
        </label>
        <select
          className="admin-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filtrar por status"
        >
          <option value="">Todos os status</option>
          <option value="published">Publicado</option>
          <option value="draft">Rascunho</option>
          <option value="archived">Arquivado</option>
        </select>
        <button className="admin-btn" onClick={() => open()}>
          <Plus size={16} />
          Novo
        </button>
      </div>
      {loading ? (
        <div className="admin-panel">Carregando…</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Versão</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <tr key={record.id}>
                  <td>
                    <strong>
                      {String(
                        record.data.name || record.data.title || record.slug,
                      )}
                    </strong>
                  </td>
                  <td>{record.slug}</td>
                  <td>
                    <span className="badge">{record.status}</span>
                  </td>
                  <td>v{record.version}</td>
                  <td>
                    <div className="admin-actions">
                      <button
                        className="admin-btn"
                        onClick={() => open(record)}
                      >
                        Editar
                      </button>
                      <button
                        className="admin-btn secondary"
                        onClick={() => action(record, 'duplicate')}
                      >
                        <Copy size={15} />
                        Duplicar
                      </button>
                      <button
                        className="admin-btn secondary"
                        onClick={() => action(record, 'delete')}
                      >
                        <Trash2 size={15} />
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {draft && (
        <div
          className="cms-editor"
          role="dialog"
          aria-modal="true"
          aria-label={`Editor de ${labels[entity]}`}
        >
          <div className="cms-editor-head">
            <div>
              <span className="eyebrow">Editor CMS</span>
              <h2 className="serif">
                {editing
                  ? String(editing.data.name || editing.slug)
                  : `Novo em ${labels[entity]}`}
              </h2>
            </div>
            <button
              className="admin-btn secondary"
              onClick={() => setDraft('')}
            >
              <X />
              Fechar
            </button>
          </div>
          <div className="admin-grid">
            <div className="admin-panel">
              <div
                className="translation-tabs"
                role="tablist"
                aria-label="Idioma editorial"
              >
                {locales.map((locale) => (
                  <button
                    role="tab"
                    aria-selected={editorLocale === locale}
                    className={`admin-btn ${editorLocale === locale ? '' : 'secondary'}`}
                    onClick={() => selectLocale(locale)}
                    key={locale}
                  >
                    {locale === 'pt-br'
                      ? 'Português'
                      : locale === 'en'
                        ? 'English'
                        : 'Español'}
                  </button>
                ))}
              </div>
              <p className="muted">
                Status do idioma:{' '}
                <strong>
                  {editorLocale === 'pt-br' ? 'principal' : currentCompletion()}
                </strong>
                {editorLocale !== 'pt-br' &&
                !(
                  editing?.data.translations as
                    Record<string, unknown> | undefined
                )?.[editorLocale]
                  ? ' · usando fallback pt-BR'
                  : ''}
              </p>
              <label>
                Slug
                <input
                  className="admin-input"
                  value={slug}
                  onChange={(e) =>
                    setSlug(
                      e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                    )
                  }
                />
              </label>
              <label>
                Status
                <select
                  className="admin-select"
                  value={publication}
                  onChange={(e) =>
                    setPublication(e.target.value as PublicationStatus)
                  }
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                  <option value="archived">Arquivado</option>
                </select>
              </label>
              <label>
                Conteúdo JSON
                <textarea
                  className="admin-textarea cms-json"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
              </label>
              <div className="admin-toolbar">
                {editorLocale !== 'pt-br' && (
                  <button
                    className="admin-btn secondary"
                    onClick={() =>
                      setDraft(
                        JSON.stringify(
                          Object.fromEntries(
                            Object.entries(editing?.data || {}).filter(
                              ([key]) => key !== 'translations',
                            ),
                          ),
                          null,
                          2,
                        ),
                      )
                    }
                  >
                    <Copy size={16} />
                    Copiar português como base
                  </button>
                )}
                <button className="admin-btn" onClick={save}>
                  <Save size={16} />
                  Salvar
                </button>
                <button
                  className="admin-btn secondary"
                  onClick={() =>
                    setMessage(
                      'Preview utiliza o conteúdo atual do editor sem publicar.',
                    )
                  }
                >
                  <Eye size={16} />
                  Preview
                </button>
              </div>
            </div>
            <aside className="admin-panel">
              <h3 className="serif">
                <History size={17} /> Histórico
              </h3>
              {!versions.length ? (
                <p className="muted">
                  A primeira versão será criada ao salvar.
                </p>
              ) : (
                versions.map((v) => (
                  <div className="version-row" key={v.id}>
                    <div>
                      <strong>Versão {v.version}</strong>
                      <small>
                        {new Date(v.createdAt).toLocaleString('pt-BR')} ·{' '}
                        {v.actor}
                      </small>
                    </div>
                    <button
                      className="admin-btn secondary"
                      onClick={() => restore(v)}
                    >
                      Restaurar
                    </button>
                  </div>
                ))
              )}
            </aside>
          </div>
        </div>
      )}
    </>
  );
}
