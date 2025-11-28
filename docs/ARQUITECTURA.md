# 🏗️ Arquitectura de Glitter

## 📐 Visión General

```
┌─────────────────────────────────────────────────────────────┐
│                         USUARIO                              │
│                    (Navegador Web)                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Vue 3)                          │
│                   Puerto: 8080                               │
├─────────────────────────────────────────────────────────────┤
│  • Vue Router (Navegación)                                   │
│  • Vuex (Estado Global)                                      │
│  • Axios (Cliente HTTP)                                      │
│  • Bootstrap (Estilos)                                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API
                         │ (http://localhost:3000)
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Express.js)                       │
│                   Puerto: 3000                               │
├─────────────────────────────────────────────────────────────┤
│  • Express (Servidor HTTP)                                   │
│  • JWT (Autenticación)                                       │
│  • Mongoose (ODM)                                            │
│  • Multer (Upload de archivos)                              │
│  • CORS (Cross-Origin)                                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ MongoDB Driver
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   BASE DE DATOS (MongoDB)                    │
│                   Puerto: 27017                              │
├─────────────────────────────────────────────────────────────┤
│  Colecciones:                                                │
│  • users (Usuarios)                                          │
│  • glits (Publicaciones)                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Frontend - Glitter-Vue

### Estructura de Carpetas

```
Glitter-Vue/
├── public/
│   ├── index.html          ← HTML base
│   └── favicon.ico
│
├── src/
│   ├── main.js             ← Punto de entrada
│   ├── App.vue             ← Componente raíz
│   │
│   ├── store/              ← ✨ Vuex Store (Estado Global)
│   │   ├── index.js        ← Store principal
│   │   └── modules/
│   │       ├── auth.js     ← Autenticación
│   │       ├── notifications.js  ← Notificaciones
│   │       └── search.js   ← Búsqueda
│   │
│   ├── api/
│   │   └── glitterApi.js   ← Cliente Axios configurado
│   │
│   ├── router/
│   │   ├── index.js        ← Configuración de rutas
│   │   └── authGuard.js    ← Protección de rutas inteligente
│   │
│   ├── components/
│   │   ├── NavBar.vue      ← Barra de navegación reactiva
│   │   ├── GlitCard.vue    ← Tarjeta de publicación
│   │   ├── UserCard.vue    ← Tarjeta de usuario
│   │   ├── NotificationToast.vue  ← Sistema de notificaciones
│   │   ├── ConfirmModal.vue       ← Modal de confirmación
│   │   └── ...
│   │
│   ├── views/
│   │   ├── LandingPageView.vue  ← Página de inicio
│   │   ├── LoginView.vue        ← Inicio de sesión
│   │   ├── SignupView.vue       ← Registro
│   │   ├── HomeView.vue         ← Feed principal
│   │   ├── PublicView.vue       ← Vista pública
│   │   ├── PrivateView.vue      ← Vista privada (autenticada)
│   │   ├── UserProfileView.vue  ← Perfil de usuario
│   │   └── ...
│   │
│   ├── assets/
│   │   ├── styles.css      ← Estilos globales
│   │   └── img/            ← Imágenes
│   │
│   └── utils/
│       ├── emailRegex.js   ← Validación de email
│       └── followingUsersName.js
│
├── package.json
├── vue.config.js           ← Configuración de Vue CLI
└── babel.config.js         ← Configuración de Babel
```

### Flujo de Datos con Vuex

```
┌─────────────┐
│   Usuario   │
│   Acción    │
└──────┬──────┘
       │
       ↓
┌─────────────────────────────────────┐
│         Componente Vue              │
│  (NavBar, LoginView, etc.)          │
└──────┬──────────────────────────────┘
       │
       ↓
┌─────────────────────────────────────┐
│         Vuex Store                  │
│  ┌─────────────────────────────┐   │
│  │ auth (autenticación)        │   │
│  │ notifications (toasts)      │   │
│  │ search (búsqueda)           │   │
│  └─────────────────────────────┘   │
└──────┬──────────────────────────────┘
       │
       ↓
┌─────────────┐
│   Axios     │
│ (glitterApi)│
└──────┬──────┘
       │
       ↓
   Backend API
```

**Ventajas de Vuex:**
- ✅ Estado global reactivo
- ✅ Navbar se actualiza automáticamente
- ✅ Datos compartidos entre componentes
- ✅ Debugging con Vue DevTools

### Rutas Principales

| Ruta | Componente | Protegida | Descripción |
|------|------------|-----------|-------------|
| `/` | LandingPageView | No | Página de inicio |
| `/login` | LoginView | No | Inicio de sesión |
| `/signup` | SignupView | No | Registro |
| `/home` | HomeView | Sí | Feed principal |
| `/public` | PublicView | No | Vista pública |
| `/private` | PrivateView | Sí | Vista privada |
| `/profile/:id` | UserProfileView | Sí | Perfil de usuario |

---

## ⚙️ Backend - Glitter-api

### Estructura de Carpetas

```
Glitter-api/
├── app.js                  ← Servidor Express principal
├── init-db.js              ← Script de inicialización de BD
├── authMiddleware.js       ← Middleware de autenticación JWT
│
├── lib/
│   └── connectMongoose.js  ← Conexión a MongoDB
│
├── models/
│   ├── user.js             ← Modelo de Usuario
│   └── glit.js             ← Modelo de Publicación
│
├── routes/
│   ├── auth.js             ← Rutas de autenticación
│   ├── glits.js            ← Rutas de publicaciones
│   └── users.js            ← Rutas de usuarios
│
├── public/
│   └── uploads/            ← Imágenes subidas
│
└── package.json
```

### Middleware Stack

```
Request
   ↓
┌──────────────────┐
│  express.json()  │  ← Parsear JSON
└────────┬─────────┘
         ↓
┌──────────────────┐
│   cors()         │  ← Permitir CORS
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Rutas (/auth,   │  ← Enrutamiento
│  /glits, /users) │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ authMiddleware   │  ← Verificar JWT (si aplica)
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Controlador     │  ← Lógica de negocio
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Modelo          │  ← Interacción con BD
│  (Mongoose)      │
└────────┬─────────┘
         ↓
     Response
```

### Endpoints por Módulo

#### 🔐 Autenticación (`/auth`)

```javascript
POST   /auth/register         // Registrar usuario
POST   /auth/login            // Iniciar sesión (devuelve JWT)
GET    /auth/verify-token     // Verificar token válido
POST   /auth/forgot-password  // Solicitar reset de contraseña
POST   /auth/reset-password   // Resetear contraseña
```

#### 📝 Publicaciones (`/glits`)

```javascript
GET    /glits/                // Listar glits públicos
GET    /glits/private         // Listar glits de usuarios seguidos [AUTH]
POST   /glits/                // Crear glit [AUTH]
DELETE /glits/:glitId         // Eliminar glit [AUTH]
POST   /glits/:glitId/kudos   // Dar kudos [AUTH]
DELETE /glits/:glitId/kudos   // Quitar kudos [AUTH]
```

#### 👥 Usuarios (`/users`)

```javascript
POST   /users/:userId/follow    // Seguir usuario [AUTH]
DELETE /users/:userId/follow    // Dejar de seguir [AUTH]
```

---

## 🗄️ Base de Datos - MongoDB

### Colección: users

```javascript
{
  _id: ObjectId,
  username: String,          // Único, requerido
  email: String,             // Único, requerido
  password: String,          // Hash (bcrypt)
  avatar: String,            // URL de la imagen
  bio: String,               // Biografía
  following: [ObjectId],     // IDs de usuarios seguidos
  followers: [ObjectId],     // IDs de seguidores
  createdAt: Date,
  updatedAt: Date
}
```

### Colección: glits

```javascript
{
  _id: ObjectId,
  text: String,              // Contenido (requerido)
  author: ObjectId,          // Referencia a User
  image: String,             // URL de imagen (opcional)
  kudos: [ObjectId],         // IDs de usuarios que dieron kudos
  createdAt: Date,
  updatedAt: Date
}
```

### Índices

```javascript
// users
db.users.createIndex({ username: 1 }, { unique: true })
db.users.createIndex({ email: 1 }, { unique: true })

// glits
db.glits.createIndex({ author: 1 })
db.glits.createIndex({ createdAt: -1 })
db.glits.createIndex({ text: "text" })  // Búsqueda de texto
```

---

## 🔐 Autenticación JWT

### Flujo de Autenticación

```
1. REGISTRO/LOGIN
   Usuario → POST /auth/login
   ↓
   Backend verifica credenciales
   ↓
   Backend genera JWT
   ↓
   Frontend recibe JWT
   ↓
   Frontend guarda JWT en localStorage

2. PETICIONES AUTENTICADAS
   Frontend lee JWT de localStorage
   ↓
   Frontend añade header: Authorization: Bearer <JWT>
   ↓
   Backend verifica JWT con authMiddleware
   ↓
   Si válido: procesa petición
   Si inválido: devuelve 401 Unauthorized
```

### Estructura del JWT

```javascript
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "_id": "user_id_here",
  "username": "username_here",
  "iat": 1234567890,  // Issued at
  "exp": 1234567890   // Expiration
}

// Signature
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  JWT_SECRET
)
```

---

## 🔄 Flujos Principales

### 1. Crear una Publicación (Glit)

```
Frontend (GlitCard.vue)
   ↓
Usuario escribe texto y selecciona imagen
   ↓
Frontend: axios.post('/glits', formData)
   ↓
Backend: authMiddleware verifica JWT
   ↓
Backend: multer procesa imagen
   ↓
Backend: Glit.create({ text, author, image })
   ↓
MongoDB: Guarda documento
   ↓
Backend: Devuelve glit creado
   ↓
Frontend: Actualiza lista de glits
   ↓
Usuario ve su nueva publicación
```

### 2. Dar Kudos

```
Frontend (GlitCard.vue)
   ↓
Usuario hace clic en botón de kudos
   ↓
Frontend: axios.post(`/glits/${glitId}/kudos`)
   ↓
Backend: authMiddleware verifica JWT
   ↓
Backend: Glit.findByIdAndUpdate(
  glitId,
  { $addToSet: { kudos: userId } }
)
   ↓
MongoDB: Añade userId al array kudos
   ↓
Backend: Devuelve glit actualizado
   ↓
Frontend: Actualiza UI (contador de kudos)
   ↓
Usuario ve kudos incrementado
```

### 3. Seguir Usuario

```
Frontend (UserCard.vue)
   ↓
Usuario hace clic en "Seguir"
   ↓
Frontend: axios.post(`/users/${userId}/follow`)
   ↓
Backend: authMiddleware verifica JWT
   ↓
Backend: User.findByIdAndUpdate(
  currentUserId,
  { $addToSet: { following: targetUserId } }
)
   ↓
Backend: User.findByIdAndUpdate(
  targetUserId,
  { $addToSet: { followers: currentUserId } }
)
   ↓
MongoDB: Actualiza ambos usuarios
   ↓
Backend: Devuelve confirmación
   ↓
Frontend: Actualiza UI (botón "Siguiendo")
   ↓
Usuario ve que ahora sigue al usuario
```

---

## 🚀 Despliegue

### Desarrollo Local

```
MongoDB (127.0.0.1:27017)
   ↑
Backend (localhost:3000)
   ↑
Frontend (localhost:8080)
```

### Producción (Ejemplo)

```
MongoDB Atlas (Cloud)
   ↑
Backend (Heroku/Railway/DigitalOcean)
   ↑
Frontend (Vercel/Netlify)
```

---

## 📊 Tecnologías y Versiones

### Frontend
- Vue 3.2.46
- Vue Router 4.0.3
- Vuex 4.0.0
- Axios 1.12.0
- Bootstrap (vía mdbvue)

### Backend
- Node.js (v14+)
- Express 4.21.2
- Mongoose 6.13.8
- jsonwebtoken 9.0.0
- Multer 2.0.2
- CORS 2.8.5

### Base de Datos
- MongoDB 4.17.2+

---

## 🔧 Configuración de Entorno

### Variables de Entorno

#### Backend (.env)
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/glitter
JWT_SECRET=tu_secreto_aqui
NODE_ENV=development
```

#### Frontend (.env.development)
```env
VUE_APP_API_URL=http://localhost:3000
PORT=8080
```

---

## ✨ Mejoras Implementadas (v2.0)

### Estado Global con Vuex
- ✅ Store configurado con módulos (auth, notifications, search)
- ✅ Navbar reactiva - se actualiza automáticamente al login/logout
- ✅ Estado compartido entre componentes
- ✅ Debugging con Vue DevTools

### Sistema de Notificaciones
- ✅ Componente NotificationToast con animaciones
- ✅ 4 tipos: success, error, warning, info
- ✅ Auto-cierre configurable
- ✅ Feedback visual en todas las acciones

### Modales de Confirmación
- ✅ Componente ConfirmModal reutilizable
- ✅ Prevención de acciones destructivas
- ✅ Diseño coherente con el tema

### Búsqueda de Texto Completo
- ✅ Índice de texto en MongoDB
- ✅ Búsqueda desde navbar
- ✅ Resultados filtrados en tiempo real
- ✅ Enrutamiento inteligente según autenticación
- ✅ Limpiar búsqueda funcional

### Mejoras de Código
- ✅ API Client sin errores
- ✅ Guards inteligentes
- ✅ Sin mutaciones directas de Vuex
- ✅ Mejor manejo de errores
- ✅ Logs útiles para debugging

**Asistencia técnica:** Claude Sonnet 4.5 (Anthropic)

---

## 🎯 Mejoras Futuras

### Funcionalidades
- [ ] Comentarios en glits
- [ ] Mensajería directa
- [ ] Notificaciones en tiempo real (WebSockets)
- [ ] Hashtags y menciones (@usuario)
- [ ] Reglits (compartir publicaciones)
- [ ] Modo oscuro
- [ ] Búsqueda avanzada con filtros

### Técnicas
- [ ] Tests unitarios (Jest) y E2E (Cypress)
- [ ] Paginación infinita
- [ ] Caché con Redis
- [ ] CI/CD con GitHub Actions
- [ ] Docker containers
- [ ] Rate limiting
- [ ] Compresión de imágenes
- [ ] CDN para assets estáticos
- [ ] PWA (Progressive Web App)

---

## 📚 Recursos

- **Vue 3:** https://vuejs.org/
- **Vuex 4:** https://vuex.vuejs.org/
- **Express:** https://expressjs.com/
- **MongoDB:** https://docs.mongodb.com/
- **Mongoose:** https://mongoosejs.com/
- **JWT:** https://jwt.io/
- **Claude Sonnet 4.5:** https://www.anthropic.com/claude

---

**Desarrollado con ❤️ por el equipo No-Woman-No-Work**

**Asistencia técnica y mejoras v2.0:** Claude Sonnet 4.5 (Anthropic)

