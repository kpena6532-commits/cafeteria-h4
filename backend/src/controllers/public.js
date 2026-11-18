const content = require('../models/content');
const db = require('../config/database');

exports.storefront = async (req, res) => res.json(await content.storefront());
exports.section = async (req, res) => {
  const rows = await content.list(req.params.section);
  if (rows === null) return res.status(404).json({ error: 'Sección inexistente' });
  res.json(rows);
};
exports.contact = async (req, res) => {
  const { nombre, email, asunto = '', mensaje } = req.body || {};
  if (typeof nombre !== 'string' || nombre.trim().length < 2 || nombre.length > 100 ||
    typeof email !== 'string' || email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof asunto !== 'string' || asunto.length > 150 || typeof mensaje !== 'string' ||
    mensaje.trim().length < 10 || mensaje.length > 3000) {
    return res.status(400).json({ error: 'Verifica nombre, correo, asunto y mensaje (mínimo 10 caracteres).' });
  }
  const [result] = await db.execute('INSERT INTO contactos (nombre,email,asunto,mensaje) VALUES (?,?,?,?)',
    [nombre.trim(), email.trim(), asunto.trim(), mensaje.trim()]);
  res.status(201).json({ mensaje: 'Mensaje recibido correctamente', id: result.insertId });
};
