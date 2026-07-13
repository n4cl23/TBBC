import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy } from './proxy';

describe('proteção administrativa', () => {
  afterEach(() => vi.unstubAllEnvs());
  it('nega produção sem configuração', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('ADMIN_USER', '');
    vi.stubEnv('ADMIN_PASSWORD', '');
    expect(proxy(new NextRequest('http://localhost/admin')).status).toBe(503);
  });
  it('aceita credenciais configuradas', () => {
    vi.stubEnv('ADMIN_USER', 'keeper');
    vi.stubEnv('ADMIN_PASSWORD', 'oath');
    const request = new NextRequest('http://localhost/admin', {
      headers: { authorization: `Basic ${btoa('keeper:oath')}` },
    });
    expect(proxy(request).status).toBe(200);
  });
});

describe('reescrita localizada', () => {
  it('marca a primeira reescrita e permite o passe interno seguinte', () => {
    const first = proxy(
      new NextRequest('http://localhost/pt-br/colecoes/beasts-of-asterheim'),
    );
    expect(first.headers.get('x-middleware-rewrite')).toContain(
      '/colecoes/beasts-of-asterheim',
    );
    const internal = proxy(
      new NextRequest('http://localhost/colecoes/beasts-of-asterheim', {
        headers: { 'x-tbcc-internal-rewrite': '1' },
      }),
    );
    expect(internal.status).toBe(200);
    expect(internal.headers.get('location')).toBeNull();
  });
});
