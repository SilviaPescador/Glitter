# ⚙️ Glitter API - Backend

> Backend RESTful API para Glitter, construido con Express.js y MongoDB.

[![Node.js](https://img.shields.io/badge/Node.js-14+-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.17-47A248?logo=mongodb)](https://www.mongodb.com/)

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Inicializar base de datos con datos de ejemplo
npm run init-db

# Iniciar servidor
npm start
```

El servidor estará corriendo en: **http://localhost:3000**

📖 **Documentación completa:** [README Principal](../README.md)

---

## 📋 Requisitos

- **Node.js** v14 o superior
- **MongoDB** v4 o superior (corriendo en puerto 27017)
- **npm** v6 o superior

---

## 🛠️ Scripts Disponibles

```bash
pnpm start         # Iniciar servidor en puerto 3000
pnpm run init-db   # Inicializar/resetear base de datos
npm test          # Ejecutar tests (por implementar)
```

---

## 📁 Estructura del Proyecto

```
Glitter-api/
├── app.js                  # Punto de entrada, configuración de Express
├── authMiddleware.js       # Middleware de autenticación JWT
├── init-db.js              # Script de inicialización de BD
│
├── lib/
│   └── connectMongoose.js  # Configuración de conexión a MongoDB
│
├── models/
│   ├── user.js             # Modelo de Usuario
│   └── glit.js             # Modelo de Publicación
│
├── routes/
│   ├── auth.js             # Rutas de autenticación
│   ├── glits.js            # Rutas de publicaciones
│   └── users.js            # Rutas de usuarios
│
├── public/
│   └── uploads/            # Imágenes subidas por usuarios
│
└── package.json
```

---

## 🔌 API Endpoints

**Base URL:** `http://localhost:3000`

### Autenticación (`/auth`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Registrar nuevo usuario | No |
| POST | `/auth/login` | Iniciar sesión (devuelve JWT) | No |
| GET | `/auth/verify-token` | Verificar token válido | Sí |
| POST | `/auth/forgot-password` | Solicitar reset de contraseña | No |
| POST | `/auth/reset-password` | Resetear contraseña | No |

### Publicaciones (`/glits`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/glits/` | Listar glits públicos | No |
| GET | `/glits/private` | Listar glits de usuarios seguidos | Sí |
| POST | `/glits/` | Crear nuevo glit | Sí |
| DELETE | `/glits/:glitId` | Eliminar glit propio | Sí |
| POST | `/glits/:glitId/kudos` | Dar kudos | Sí |
| DELETE | `/glits/:glitId/kudos` | Quitar kudos | Sí |

### Usuarios (`/users`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/users/:userId/follow` | Seguir usuario | Sí |
| DELETE | `/users/:userId/follow` | Dejar de seguir | Sí |

📖 **Documentación completa de la API:** [docs/API.md](../docs/API.md)

---

## 🔐 Autenticación

Este API usa **JWT (JSON Web Tokens)** para autenticación.

### Obtener un Token

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Usar el Token

Incluye el token en el header `Authorization`:

```bash
curl -X POST http://localhost:3000/glits/ \
  -H "Authorization: Bearer <tu_token_aqui>" \
  -H "Content-Type: application/json" \
  -d '{"text":"Mi primer glit!"}'
```

---

## 🗄️ Base de Datos

### Modelos

#### User
```javascript
{
  username: String,      // Único, requerido
  email: String,         // Único, requerido
  password: String,      // Hash (bcrypt)
  avatar: String,        // URL opcional
  bio: String,
  following: [ObjectId], // Usuarios seguidos
  followers: [ObjectId], // Seguidores
  createdAt: Date,
  updatedAt: Date
}
```

#### Glit
```javascript
{
  text: String,          // Requerido (max 280 caracteres)
  author: ObjectId,      // Referencia a User
  image: String,         // URL opcional
  kudos: [ObjectId],     // Usuarios que dieron kudos
  createdAt: Date,
  updatedAt: Date
}
```

### Inicializar Base de Datos

```bash
pnpm run init-db
```

Esto creará:
- Base de datos "glitter"
- Usuarios de ejemplo
- Publicaciones de ejemplo

---

## 🔧 Configuración

### Variables de Entorno (Opcional)

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/glitter
JWT_SECRET=tu_secreto_super_seguro
NODE_ENV=development

# Opcional: Email (MailJet)
MAILJET_API_KEY=tu_api_key
MAILJET_API_SECRET=tu_api_secret
MAILJET_SENDER_EMAIL=tu_email@ejemplo.com
```

### Configuración Actual

Por defecto, el servidor usa:
- **Puerto:** 3000
- **MongoDB:** `mongodb://127.0.0.1:27017/glitter`
- **JWT Secret:** "glitter" (⚠️ cambiar en producción)

---

## 🧪 Testing

```bash
# Verificar que el servidor funciona
curl http://localhost:3000/glits/

# Debería devolver un JSON con publicaciones
```

---

## 📦 Dependencias Principales

```json
{
  "express": "^4.21.2",        // Framework web
  "mongoose": "^6.13.8",       // ODM para MongoDB
  "jsonwebtoken": "^9.0.0",    // Autenticación JWT
  "multer": "^2.0.2",          // Upload de archivos
  "cors": "^2.8.5",            // Cross-Origin Resource Sharing
  "validator": "^13.15.20",    // Validación de datos
  "node-mailjet": "^6.0.11"    // Envío de emails
}
```

---

## 🐛 Solución de Problemas

### MongoDB no se conecta

```bash
# Verificar que MongoDB está corriendo
mongosh

# Iniciar MongoDB (Windows)
net start MongoDB

# Iniciar MongoDB (Mac)
brew services start mongodb-community
```

### Puerto 3000 ocupado

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

📖 **Más ayuda:** [docs/TROUBLESHOOTING.md](../docs/TROUBLESHOOTING.md)

---

## 🔒 Seguridad

### Para Desarrollo
- ✅ CORS habilitado para todos los orígenes
- ✅ JWT con secret simple
- ✅ Sin rate limiting

### Para Producción
- ⚠️ Cambiar `JWT_SECRET` a un valor seguro
- ⚠️ Configurar CORS para dominios específicos
- ⚠️ Implementar rate limiting
- ⚠️ Usar HTTPS
- ⚠️ Validar y sanitizar todas las entradas
- ⚠️ Configurar variables de entorno

---

## 📚 Documentación Adicional

- **[README Principal](../README.md)** - Visión general del proyecto completo
- **[API Reference](../docs/API.md)** - Documentación detallada de endpoints
- **[Arquitectura](../docs/ARQUITECTURA.md)** - Diseño del sistema
- **[Instalación](../docs/INSTALACION.md)** - Guía de instalación completa

---

## 👥 Autores

Desarrollado por **No-Woman-No-Work**:
- Andrea Ares Fernandez
- Emma Alonso McCoy
- Nelanyi Ruiz Contreras
- Silvia Pescador López
- Mariana Antoniol

---

## 📄 Licencia

ISC License

---

## 🔗 Enlaces

- [Repositorio Backend](https://github.com/No-Woman-No-Work/Glitter-api)
- [Repositorio Frontend](https://github.com/No-Woman-No-Work/Glitter-Vue)
- [Documentación Express](https://expressjs.com/)
- [Documentación MongoDB](https://docs.mongodb.com/)
- [Documentación Mongoose](https://mongoosejs.com/)

---

<div align="center">

**[← Volver al README principal](../README.md)**

</div>
