const baseUrl = (process.env.SMOKE_BASE_URL || '').replace(/\/$/, '');
if (!baseUrl) throw new Error('SMOKE_BASE_URL ausente.');

const checks = [
  ['home', '/pt-br', 200],
  ['health', '/api/health', 200],
  ['canon', '/api/canon', 200],
  ['graph', '/api/graph', 200],
  ['cms-auth', '/admin', process.env.ADMIN_USER && process.env.ADMIN_PASSWORD ? 200 : 401],
];

for (const [name, path, expected] of checks) {
  const headers = {};
  if (name === 'cms-auth' && process.env.ADMIN_USER && process.env.ADMIN_PASSWORD) headers.authorization = `Basic ${Buffer.from(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASSWORD}`).toString('base64')}`;
  const response = await fetch(`${baseUrl}${path}`, { headers, redirect: 'manual' });
  if (response.status !== expected) throw new Error(`${name}: HTTP ${response.status}; esperado ${expected}.`);
  process.stdout.write(`${name}: ok\n`);
}
