const db = require('../config/database');

const sections = Object.freeze({
  configuracion: 'configuracion', servicios: 'servicios', categorias: 'categorias',
  productos: 'productos', especialidades: 'especialidades', galeria: 'galeria',
  horarios: 'horarios', preguntas: 'preguntas_frecuentes'
});

async function list(section) {
  if (!Object.hasOwn(sections, section)) return null;
  const table = sections[section];
  const order = section === 'configuracion' ? 'clave' : section === 'horarios' ? 'orden' : section === 'categorias' ? 'orden, id' : section === 'preguntas' ? 'id' : 'orden, id';
  const [rows] = await db.query(`SELECT * FROM \`${table}\` ORDER BY ${order}`);
  return rows;
}

async function storefront() {
  const names = ['configuracion','categorias','productos','servicios','especialidades','galeria','horarios','preguntas'];
  const results = await Promise.all(names.map(list));
  const result = Object.fromEntries(names.map((key, index) => [key, results[index]]));
  result.configuracion = Object.fromEntries(result.configuracion.map(row => [row.clave, row.valor]));
  return result;
}

async function chatbotFacts() {
  const data = await storefront();
  return {
    configuracion: data.configuracion,
    productos: data.productos.filter(p => p.disponible).map(({ nombre, precio, descripcion, categoria_id }) => ({ nombre, precio, descripcion, categoria_id })),
    servicios: data.servicios.filter(s => s.activo).map(({ titulo, descripcion }) => ({ titulo, descripcion })),
    horarios: data.horarios,
    preguntas_frecuentes: data.preguntas.filter(p => p.activa).map(({ pregunta, respuesta }) => ({ pregunta, respuesta }))
  };
}
module.exports = { list, storefront, chatbotFacts };
