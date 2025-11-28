# ✨ Glitter - Plataforma de Micro-contenido

> Aplicación fullstack de red social tipo Twitter, desarrollada con Vue 3, Express y MongoDB.

[![Vue 3](https://img.shields.io/badge/Vue-3.2-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.17-47A248?logo=mongodb)](https://www.mongodb.com/)

---

## 🚀 Inicio Rápido

### Opción 1: Script Automático (Recomendado)

**Windows:**
```bash
# 1. Iniciar MongoDB (PowerShell como Admin)
net start MongoDB

# 2. Ejecutar script
start-dev.bat
```

**Mac/Linux:**
```bash
./start-dev.sh
```

### Opción 2: Manual

```bash
# Terminal 1 - Backend
cd Glitter-api
npm install && npm run init-db && npm start

# Terminal 2 - Frontend
cd Glitter-Vue
npm install && npm run serve
```

**Abre:** http://localhost:8080

📖 **¿Primera vez?** Lee la [Guía de Inicio Rápido](docs/QUICK-START.md)

---

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| **[Inicio Rápido](docs/QUICK-START.md)** | Configuración en 5 minutos |
| **[Guía de Instalación](docs/INSTALACION.md)** | Instalación detallada paso a paso |
| **[Arquitectura](docs/ARQUITECTURA.md)** | Estructura y diseño del sistema |
| **[API Reference](docs/API.md)** | Documentación de endpoints |
| **[Solución de Problemas](docs/TROUBLESHOOTING.md)** | Problemas comunes y soluciones |
| **[MongoDB en Windows](docs/MONGODB-WINDOWS.md)** | Guía específica para Windows |

---

## 🏗️ Estructura del Proyecto

```
📦 Glitter-FullStack-Social-Media-Project-Express-Vue
│
├── 🎨 Glitter-Vue/              Frontend (Vue 3) - Puerto 8080
│   ├── src/
│   │   ├── components/          Componentes reutilizables
│   │   ├── views/               Páginas/Vistas
│   │   ├── router/              Configuración de rutas
│   │   └── api/                 Cliente HTTP (Axios)
│   └── package.json
│
├── ⚙️ Glitter-api/              Backend (Express) - Puerto 3000
│   ├── routes/                  Endpoints de la API
│   ├── models/                  Modelos de MongoDB
│   ├── lib/                     Utilidades
│   └── package.json
│
├── 📁 docs/                     Documentación
├── 🚀 start-dev.bat             Script de inicio (Windows)
├── 🚀 start-dev.sh              Script de inicio (Mac/Linux)
└── 💻 glitter-workspace.code-workspace
```

---

## 🛠️ Tecnologías

### Frontend
- **Vue 3** - Framework progresivo
- **Vue Router** - Navegación SPA
- **Vuex** - Gestión de estado
- **Axios** - Cliente HTTP
- **Bootstrap** - Estilos y componentes

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **Multer** - Upload de archivos

---

## 📋 Requisitos Previos

- **Node.js** v14+ - [Descargar](https://nodejs.org/)
- **MongoDB** v4+ - [Descargar](https://www.mongodb.com/try/download/community)
- **npm** o **yarn**

**Verificar instalaciones:**
```bash
node --version
npm --version
mongod --version
```

---

## 🎯 Funcionalidades

- ✍️ **Crear publicaciones** (glits) con texto e imágenes
- ⭐ **Sistema de kudos** (likes)
- 👥 **Seguir/dejar de seguir** usuarios
- 🔍 **Búsqueda** de usuarios y publicaciones
- 🔐 **Autenticación JWT** segura
- 📱 **Diseño responsive**
- 🔄 **Feed público y privado**
- 👤 **Perfiles de usuario**

---

## 🔧 Comandos Principales

### Backend (Glitter-api)
```bash
npm install          # Instalar dependencias
npm run init-db      # Inicializar base de datos
npm start            # Iniciar servidor (puerto 3000)
```

### Frontend (Glitter-Vue)
```bash
npm install          # Instalar dependencias
npm run serve        # Servidor de desarrollo (puerto 8080)
npm run build        # Build de producción
npm run lint         # Linter
```

### MongoDB
```bash
mongosh              # Abrir shell de MongoDB
net start MongoDB    # Iniciar servicio (Windows)
```

---

## 📡 API Endpoints

**Base URL:** `http://localhost:3000`

### Autenticación
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión
- `GET /auth/verify-token` - Verificar token

### Publicaciones (Glits)
- `GET /glits/` - Listar glits públicos
- `GET /glits/private` - Listar glits privados [AUTH]
- `POST /glits/` - Crear glit [AUTH]
- `DELETE /glits/:glitId` - Eliminar glit [AUTH]
- `POST /glits/:glitId/kudos` - Dar kudos [AUTH]

### Usuarios
- `POST /users/:userId/follow` - Seguir usuario [AUTH]
- `DELETE /users/:userId/follow` - Dejar de seguir [AUTH]

📖 **Documentación completa:** [API Reference](docs/API.md)

---

## 💻 Desarrollo con VS Code

### Abrir Workspace
```bash
# Opción 1: Desde VS Code
File > Open Workspace from File > glitter-workspace.code-workspace

# Opción 2: Desde terminal
code glitter-workspace.code-workspace
```

### Extensiones Recomendadas
- ESLint
- Prettier
- Volar (Vue)
- MongoDB for VS Code

### Debugging
Presiona `F5` y selecciona "🌟 Fullstack: Backend + Frontend"

---

## 🐛 Solución de Problemas

### MongoDB no se conecta
```bash
# Verificar servicio (Windows)
Get-Service -Name MongoDB

# Iniciar servicio
net start MongoDB
```
📖 **Guía completa:** [MongoDB en Windows](docs/MONGODB-WINDOWS.md)

### Puerto ocupado
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Más problemas
📖 Ver [Solución de Problemas](docs/TROUBLESHOOTING.md)

---

## 🎓 Guías de Aprendizaje

1. **Día 1:** [Instalación](docs/INSTALACION.md) → [Quick Start](docs/QUICK-START.md)
2. **Día 2:** [Arquitectura](docs/ARQUITECTURA.md) → Explorar código
3. **Día 3+:** Desarrollar nuevas funcionalidades

---

## 👥 Equipo

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

- [Backend Repository](https://github.com/No-Woman-No-Work/Glitter-api)
- [Frontend Repository](https://github.com/No-Woman-No-Work/Glitter-Vue)
- [Documentación Vue 3](https://vuejs.org/)
- [Documentación Express](https://expressjs.com/)
- [Documentación MongoDB](https://docs.mongodb.com/)

---

## 🆘 Ayuda

¿Problemas? Consulta en orden:
1. [Quick Start](docs/QUICK-START.md)
2. [Troubleshooting](docs/TROUBLESHOOTING.md)
3. [Instalación Detallada](docs/INSTALACION.md)

---

<div align="center">

**¡Feliz desarrollo con Glitter! ✨**

[Inicio Rápido](docs/QUICK-START.md) • [Documentación](docs/) • [Reportar Bug](https://github.com/No-Woman-No-Work/Glitter-api/issues)

</div>
