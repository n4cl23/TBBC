'use client';

import { useState } from 'react';
import type { ZodType } from 'zod';

export type EditorialField = {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'select';
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
};

export function TypedEditorialForm<T extends Record<string, string>>({
  schema,
  fields,
  initial,
  submitLabel,
  onSubmit,
}: {
  schema: ZodType<T>;
  fields: EditorialField[];
  initial: T;
  submitLabel: string;
  onSubmit: (value: T) => Promise<void> | void;
}) {
  const [values, setValues] = useState<T>(initial);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message || 'Revise os campos obrigatórios.');
      return;
    }
    setSaving(true);
    setMessage('');
    try { await onSubmit(parsed.data); setMessage('Salvo com sucesso.'); } catch (caught) { setMessage(caught instanceof Error ? caught.message : 'Não foi possível salvar.'); } finally { setSaving(false); }
  }

  return <form onSubmit={submit} className="admin-panel" noValidate>
    {fields.map((field) => <label key={field.name} style={{ display: 'grid', gap: 6, marginBottom: 12 }}>
      <span>{field.label}</span>
      {field.type === 'textarea' ? <textarea className="admin-textarea" required={field.required} value={values[field.name] || ''} onChange={(event) => setValues({ ...values, [field.name]: event.target.value })} /> : field.type === 'select' ? <select className="admin-select" required={field.required} value={values[field.name] || ''} onChange={(event) => setValues({ ...values, [field.name]: event.target.value })}>{field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : <input className="admin-input" required={field.required} value={values[field.name] || ''} onChange={(event) => setValues({ ...values, [field.name]: event.target.value })} />}
    </label>)}
    <button className="admin-btn" disabled={saving} type="submit">{saving ? 'Salvando…' : submitLabel}</button>
    {message && <p className="muted" aria-live="polite">{message}</p>}
  </form>;
}
