'use client';

import { editorialReviewSchema } from '@/lib/editorial-forms';
import { TypedEditorialForm } from './TypedEditorialForm';

export function EditorialReviewForm() {
  return <TypedEditorialForm schema={editorialReviewSchema} initial={{ entity: 'characters', id: '', decision: 'submit', note: '' }} submitLabel="Registrar decisão" fields={[{ name: 'entity', label: 'Tipo de conteúdo', type: 'select', options: [{ value: 'characters', label: 'Personagens' }, { value: 'collections', label: 'Coleções' }, { value: 'realms', label: 'Reinos' }, { value: 'creatures', label: 'Criaturas' }, { value: 'gallery', label: 'Galeria' }] }, { name: 'id', label: 'ID ou slug do registro', required: true }, { name: 'decision', label: 'Decisão', type: 'select', options: [{ value: 'submit', label: 'Enviar para revisão' }, { value: 'approve', label: 'Aprovar revisão' }, { value: 'requestChanges', label: 'Solicitar ajustes' }] }, { name: 'note', label: 'Nota editorial', type: 'textarea', required: true }]} onSubmit={async (value) => { const response = await fetch('/api/admin/editorial/review', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(value) }); const json = await response.json(); if (!response.ok) throw new Error(json.message); }} />;
}
