const baseUrl = (process.env.SMOKE_BASE_URL || '').replace(/\/$/, '');
if (!baseUrl) throw new Error('SMOKE_BASE_URL ausente.');

const checks = [
  ['home', '/pt-br', 200],
  ['health', '/api/health', 200],
  ['canon', '/api/canon', 200],
  ['graph', '/api/graph', 200],
  ['cms-unauthenticated', '/admin', 401],
];

for (const [name, path, expected] of checks) {
  const headers = {};
  const response = await fetch(`${baseUrl}${path}`, { headers, redirect: 'manual' });
  if (response.status !== expected) throw new Error(`${name}: HTTP ${response.status}; esperado ${expected}.`);
  process.stdout.write(`${name}: ok\n`);
}

if (!process.env.ADMIN_USER || !process.env.ADMIN_PASSWORD) throw new Error('Credenciais administrativas ausentes.');
const authorization=`Basic ${Buffer.from(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASSWORD}`).toString('base64')}`;
const admin=await fetch(`${baseUrl}/admin`,{headers:{authorization},redirect:'manual'});
if(admin.status!==200)throw new Error(`cms-authenticated: HTTP ${admin.status}; esperado 200.`);
const graphResponse=await fetch(`${baseUrl}/api/graph`),graph=await graphResponse.json();
if(graph.nodes?.length!==142||graph.edges?.length!==305||graph.stats?.loops!==0)throw new Error('graph-integrity: contagens ou loops inválidos.');
process.stdout.write('cms-authenticated: ok\ngraph-integrity: ok\n');
