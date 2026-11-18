const { test } = require('node:test');
const assert = require('node:assert/strict');
const app = require('./app');

test('health, validación y 404 (sin requerir MySQL)', async () => {
  const server = app.listen(0);
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    let r = await fetch(`${base}/api/health`);
    assert.equal(r.status, 200);
    assert.deepEqual(await r.json(), { status: 'ok' });
    r = await fetch(`${base}/api/contactos`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ nombre: 'A', email: 'mal', mensaje: 'corto' }) });
    assert.equal(r.status, 400);
    r = await fetch(`${base}/api/chatbot`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ prompt: '' }) });
    assert.equal(r.status, 400);
    r = await fetch(`${base}/api/no-existe`);
    assert.equal(r.status, 404);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
