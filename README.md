# CoffeeHouse | Evaluación Continua H4

Proyecto web multimedia de cafetería. **Frontend Angular 19 + API Node.js/Express + MySQL + chatbot Ollama/Gemma 3**. Basado en la organización de capas del backend de ejemplo (Chaco), adaptado al dominio cafetería.

## Estructura

```text
cafeteria-h4/
├── frontend/        Angular: componentes, servicios, estilos y vistas
├── backend/
│   ├── src/config/       Conexión MySQL
│   ├── src/models/       Consultas SQL
│   ├── src/controllers/  Lógica de API REST
│   ├── src/middleware/   Errores
│   ├── src/chatbot/      Ollama y Gemma 3
│   ├── src/app.js        Rutas y middlewares
│   └── database/         Esquema y datos de muestra
├── postman/         Colección de pruebas API
└── docs/            Pruebas y despliegue
```

## Requisitos

- Node.js 20.19+ o 22.12+ (Node 24 también funciona)
- MySQL 8 o MariaDB compatible, XAMPP con MySQL sirve
- Angular CLI (se instala localmente con `npm install`)
- Ollama con `gemma3:4b` instalado y en ejecución
- Postman

## Puesta en marcha en Windows (PowerShell)

1. Iniciar MySQL desde XAMPP. En **phpMyAdmin > SQL**, ejecutar primero `backend/database/schema.sql` y luego `backend/database/seed.sql`. También puedes usar la consola: `mysql -u root -p < backend/database/schema.sql` y luego `mysql -u root -p < backend/database/seed.sql`.
2. Abrir terminal en `backend`, ejecutar `Copy-Item .env.example .env` y adaptar las credenciales MySQL. **No subir `.env` a GitHub.**
3. En `backend`: `npm install` y `npm start`. Revisar http://localhost:3000/api/health y http://localhost:3000/api/tienda.
4. Instalar y ejecutar Ollama. Descargar modelo con `ollama pull gemma3:4b`; comprobar con `ollama list`. Si ejecutas Ollama en Windows, asegúrate de que escuche en `127.0.0.1:11434`.
5. En otra terminal dentro de `frontend`: `npm install` y `npm start`. Abrir http://localhost:4200.
6. Importar `postman/Cafeteria-H4.postman_collection.json` en Postman, ejecutar los casos. El test de chatbot requiere Ollama activo; los de base requieren MySQL.

## Toda la página depende de MySQL

Angular **no contiene títulos, precios, productos, historia, datos comerciales ni lista fija de categorías**. Al abrir el sitio llama a `GET /api/tienda`. Ese endpoint consulta MySQL y devuelve la información completa. Angular vuelve a consultar cada **15 segundos** mientras la pestaña está visible, de modo que una edición SQL se refleja sin recompilar y sin recargar (en hasta ~15 segundos). También puedes recargar para verla de inmediato. Las respuestas del chatbot consultan MySQL en cada pregunta.

Ejemplo de evaluación del docente:

```sql
USE cafeteria_h4;
UPDATE configuracion SET valor='LA MEJOR CAFETERÍA DE COCHABAMBA' WHERE clave='titulo_inicio';
UPDATE configuracion SET valor='Café Aurora' WHERE clave='nombre';
UPDATE productos SET precio=25.50 WHERE id=2;
UPDATE configuracion SET valor='Av. América 123, Cochabamba' WHERE clave='direccion';
```

**Recargar http://localhost:4200**: verás el título, logo/nombre, precio y dirección nuevos. El chatbot recibirá los valores actualizados al hacerle una nueva pregunta. Las fotografías, el video y los textos son editables en la tabla `configuracion`, `productos` y `galeria`. La dirección, teléfonos y precios iniciales son **datos demostrativos**, reemplázalos por los de tu cafetería real antes de entregar.

Para comprobarlo en Postman, ejecutar `GET /api/tienda` antes y después del `UPDATE` y comparar JSON. El navegador debe mostrar la misma respuesta.

## Endpoints

| Método | Ruta | Función |
|---|---|---|
| GET | `/api/health` | Estado API |
| GET | `/api/tienda` | Toda la página desde MySQL |
| GET | `/api/contenido/configuracion` | Títulos y textos |
| GET | `/api/contenido/productos` | Menú y precios |
| GET | `/api/contenido/servicios` | Servicios |
| GET | `/api/contenido/categorias` | Categorías |
| GET | `/api/contenido/especialidades` | Destacados |
| GET | `/api/contenido/galeria` | Fotos |
| GET | `/api/contenido/horarios` | Horarios |
| GET | `/api/contenido/preguntas` | FAQ |
| POST | `/api/contactos` | Guarda mensajes en MySQL |
| POST | `/api/chatbot` | Gemma 3 con datos actuales de MySQL |

## Recomendaciones y límites

- No se permite editar tablas desde el frontend público; el profesor puede actualizar MySQL desde phpMyAdmin. No hay panel administrativo porque necesitaría autenticación y permisos.
- La comunicación es Angular → API REST Node.js → MySQL; el navegador **nunca** se conecta directamente a MySQL ni a Ollama.
- El chatbot necesita que Ollama siga activo en el equipo servidor y puede tardar en generar respuestas.
- El video es una URL de ejemplo de Pexels; comprueba su disponibilidad/licencia y reemplázalo por el video Pexels definitivo si es necesario.
- Los cambios se sincronizan mediante consulta periódica cada 15 segundos. Para sincronización al milisegundo entre sesiones se necesitaría añadir SSE o WebSockets.
- Para GitHub: inicializa el repositorio en `cafeteria-h4`, ejecuta `git add .`, `git commit -m "Proyecto cafetería H4 Angular Node MySQL Ollama"`, crea un repositorio en GitHub y `git push -u origin main`. **No publiques contraseñas ni datos reales de contacto de clientes.**
