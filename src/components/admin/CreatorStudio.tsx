'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  Check,
  ChevronRight,
  Circle,
  Clock3,
  Download,
  FileBox,
  ImageIcon,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

type StudioCharacter = {
  slug: string;
  name: string;
  image: string;
  collection: string;
  status: string;
  multipart: boolean;
  lycheeReady: boolean;
};
type StageState = 'done' | 'active' | 'waiting';

const stages = [
  'Ideia',
  'Pesquisa',
  'Lore',
  'Conceito',
  'Prompt',
  'Modelagem',
  'Escultura',
  'Revisão',
  'Render',
  'Multipart',
  'Teste STL',
  'Suportes',
  'Lychee',
  'Impressão',
  'Pintura',
  'Fotos',
  'Publicado',
];
const tabs = [
  'Resumo',
  'Lore',
  'Arte',
  'Prompt',
  'Arquivos',
  'STL',
  'Impressão',
  'Galeria',
  'Versões',
  'Timeline',
  'Relacionamentos',
  'Downloads',
  'Marketplace',
];

export function CreatorStudio({
  characters,
}: {
  characters: StudioCharacter[];
}) {
  const [query, setQuery] = useState('');
  const [selectedSlug, setSelectedSlug] = useState(characters[0]?.slug ?? '');
  const [tab, setTab] = useState('Resumo');
  const filtered = useMemo(
    () =>
      characters.filter((character) =>
        character.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [characters, query],
  );
  const character =
    characters.find((item) => item.slug === selectedSlug) ?? characters[0];
  const stageIndex = Math.max(
    3,
    Math.min(
      15,
      stages.findIndex(
        (stage) => stage.toLowerCase() === character?.status.toLowerCase(),
      ),
    ),
  );
  const stateFor = (index: number): StageState =>
    index < stageIndex ? 'done' : index === stageIndex ? 'active' : 'waiting';
  if (!character)
    return (
      <div className="admin-panel">
        Cadastre um personagem para iniciar o pipeline.
      </div>
    );

  return (
    <div className="studio-layout">
      <aside className="studio-roster" aria-label="Personagens do estúdio">
        <label className="studio-search">
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar personagem"
          />
        </label>
        <div className="studio-character-list">
          {filtered.map((item) => (
            <button
              key={item.slug}
              className={item.slug === character.slug ? 'selected' : ''}
              onClick={() => setSelectedSlug(item.slug)}
            >
              <span className="studio-avatar">
                <Image src={item.image} alt="" fill sizes="44px" />
              </span>
              <span>
                <strong>{item.name}</strong>
                <small>{item.status}</small>
              </span>
              <ChevronRight size={15} />
            </button>
          ))}
        </div>
      </aside>

      <div className="studio-workspace">
        <header className="studio-identity">
          <div className="studio-portrait">
            <Image
              src={character.image}
              alt={`Miniatura de ${character.name}`}
              fill
              sizes="96px"
            />
          </div>
          <div>
            <span className="eyebrow">
              {character.collection.replaceAll('-', ' ')}
            </span>
            <h1 className="admin-title">{character.name}</h1>
            <p className="muted">
              Workspace criativo · alterações rastreadas por versão
            </p>
          </div>
          <div className="studio-health">
            <span>
              <ShieldCheck size={17} /> Integridade 86%
            </span>
            <strong>
              {stageIndex} de {stages.length} etapas
            </strong>
          </div>
        </header>

        <section className="studio-pipeline" aria-labelledby="pipeline-title">
          <div className="studio-section-head">
            <div>
              <span className="eyebrow">Production pipeline</span>
              <h2 id="pipeline-title" className="serif">
                Da ideia à publicação
              </h2>
            </div>
            <Link className="admin-btn secondary" href="/admin/roadmap">
              Abrir roadmap
            </Link>
          </div>
          <div className="pipeline-track">
            {stages.map((stage, index) => {
              const state = stateFor(index);
              return (
                <button
                  className={`pipeline-stage ${state}`}
                  key={stage}
                  aria-current={state === 'active' ? 'step' : undefined}
                  title={`${stage}: ${state === 'done' ? 'concluído' : state === 'active' ? 'em andamento' : 'aguardando'}`}
                >
                  <span>
                    {state === 'done' ? (
                      <Check size={13} />
                    ) : state === 'active' ? (
                      <Clock3 size={13} />
                    ) : (
                      <Circle size={10} />
                    )}
                  </span>
                  <small>{stage}</small>
                </button>
              );
            })}
          </div>
        </section>

        <nav className="studio-tabs" aria-label="Workspace do personagem">
          {tabs.map((item) => (
            <button
              className={tab === item ? 'active' : ''}
              onClick={() => setTab(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </nav>
        <section className="studio-tab-content" aria-live="polite">
          {tab === 'Resumo' ? (
            <Overview stageIndex={stageIndex} />
          ) : (
            <ModuleTab tab={tab} character={character} />
          )}
        </section>
      </div>
    </div>
  );
}

function Overview({ stageIndex }: { stageIndex: number }) {
  const readiness = Math.round((stageIndex / 16) * 100);
  return (
    <>
      <div className="studio-metrics">
        <Metric
          label="Progresso"
          value={`${readiness}%`}
          note="pipeline criativo"
        />
        <Metric label="Arquivos" value="12" note="4 versões rastreadas" />
        <Metric label="Checklists" value="18/24" note="6 itens pendentes" />
        <Metric label="Publicação" value="—" note="sem data definida" />
      </div>
      <div className="studio-columns">
        <article className="admin-panel">
          <span className="eyebrow">Próxima ação</span>
          <h2 className="serif">Validar a escultura</h2>
          <p className="muted">
            Responsável: Direção de Arte · prazo ainda não definido
          </p>
          <ul className="studio-checklist">
            <li className="checked">
              <Check /> Silhueta aprovada
            </li>
            <li className="checked">
              <Check /> Escala confirmada
            </li>
            <li>
              <Circle /> Revisar espessuras
            </li>
            <li>
              <Circle /> Anexar render de revisão
            </li>
          </ul>
          <button className="admin-btn">Atualizar etapa</button>
        </article>
        <article className="admin-panel">
          <span className="eyebrow">Validação de impressão</span>
          <h2 className="serif">Checklist técnico</h2>
          <div className="validation-grid">
            {[
              'Malha fechada',
              'Normais',
              'Ilhas',
              'Espessura',
              'Hollow',
              'Drain holes',
              'Suportes',
              'Teste real',
            ].map((item, index) => (
              <span className={index < 4 ? 'ok' : ''} key={item}>
                {index < 4 ? <Check /> : <Circle />}
                {item}
              </span>
            ))}
          </div>
          <Link className="admin-btn secondary" href="/admin/print-guide">
            Abrir validação
          </Link>
        </article>
        <article className="admin-panel studio-activity">
          <span className="eyebrow">Timeline</span>
          <h2 className="serif">Atividade recente</h2>
          <p>
            <strong>Prompt v4 aprovado</strong>
            <small>Direção de Arte · hoje</small>
          </p>
          <p>
            <strong>Arquivo base atualizado</strong>
            <small>Modelagem · há 2 dias</small>
          </p>
          <p>
            <strong>Lore vinculado à coleção</strong>
            <small>Narrativa · há 4 dias</small>
          </p>
        </article>
      </div>
    </>
  );
}

function ModuleTab({
  tab,
  character,
}: {
  tab: string;
  character: StudioCharacter;
}) {
  const routes: Record<
    string,
    { href: string; icon: typeof FileBox; title: string; description: string }
  > = {
    Lore: {
      href: '/admin/world',
      icon: Sparkles,
      title: 'Banco de conhecimento conectado',
      description:
        'Eventos, facções, locais, artefatos e relações automáticas.',
    },
    Arte: {
      href: '/admin/art-bible',
      icon: ImageIcon,
      title: 'Art Bible evolutiva',
      description:
        'Moodboards, comparativos, materiais, paletas, símbolos e silhuetas.',
    },
    Prompt: {
      href: '/admin/prompts',
      icon: Sparkles,
      title: 'Prompt Studio',
      description:
        'Prompts categorizados, duplicação, pesquisa e histórico de versões.',
    },
    Arquivos: {
      href: '/admin/galeria',
      icon: ImageIcon,
      title: 'Digital Asset Manager',
      description:
        'Mídia, metadados, tags, favoritos, versões e arquivos relacionados.',
    },
    STL: {
      href: '/admin/stl',
      icon: FileBox,
      title: 'STL Center',
      description:
        'STL, OBJ, GLB, multipart, escala, peso, volume, resina e perfis.',
    },
    Impressão: {
      href: '/admin/print-guide',
      icon: ShieldCheck,
      title: 'Print Validation',
      description:
        'Malha, normais, ilhas, hollow, suportes, testes, falhas e correções.',
    },
    Galeria: {
      href: `/admin/personagens/${character.slug}`,
      icon: ImageIcon,
      title: 'Galeria do personagem',
      description:
        'Imagem principal, estudos, renders, fotografias e ordenação editorial.',
    },
    Versões: {
      href: '/admin/history',
      icon: Clock3,
      title: 'Histórico imutável',
      description:
        'Compare versões, audite alterações e restaure estados anteriores.',
    },
    Timeline: {
      href: '/admin/timeline',
      icon: Clock3,
      title: 'Timeline narrativa e produtiva',
      description:
        'Eventos do universo e marcos de produção em uma visão cronológica.',
    },
    Relacionamentos: {
      href: '/admin/world',
      icon: Sparkles,
      title: 'World Graph',
      description:
        'Relações bidirecionais entre personagens, locais, facções e artefatos.',
    },
    Downloads: {
      href: '/admin/stl',
      icon: Download,
      title: 'Pacotes e exportações',
      description:
        'Fichas técnicas e ativos preparados para distribuição futura.',
    },
    Marketplace: {
      href: '/admin/marketplace/listings',
      icon: Download,
      title: 'Distribuição multicanal',
      description: 'Preço, moeda, disponibilidade, licença e links oficiais por marketplace.',
    },
  };
  const selectedModule = routes[tab] ?? routes.Arquivos;
  const Icon = selectedModule.icon;
  return (
    <div className="studio-module-empty">
      <Icon size={34} />
      <span className="eyebrow">{tab}</span>
      <h2 className="serif">{selectedModule.title}</h2>
      <p>{selectedModule.description}</p>
      <Link className="admin-btn" href={selectedModule.href}>
        Abrir módulo <ChevronRight size={16} />
      </Link>
    </div>
  );
}

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article>
      <span className="eyebrow">{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}
