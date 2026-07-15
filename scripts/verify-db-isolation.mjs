import crypto from 'node:crypto';

const preview = process.env.PREVIEW_DATABASE_URL;
const production = process.env.PRODUCTION_DATABASE_URL;
if (!preview || !production) throw new Error('PREVIEW_DATABASE_URL e PRODUCTION_DATABASE_URL são obrigatórias.');

const fingerprint = (value) => crypto.createHash('sha256').update(new URL(value).host + new URL(value).pathname).digest('hex');
if (fingerprint(preview) === fingerprint(production)) throw new Error('Preview e Production compartilham o mesmo PostgreSQL. Release bloqueado.');
process.stdout.write('Isolamento PostgreSQL confirmado.\n');
