# 📚 Índice de Documentación - Glitter

Guía rápida para navegar por toda la documentación del proyecto.

---

## 🎯 ¿Qué necesitas?

### 🚀 **"Quiero empezar YA"**
→ **[Inicio Rápido](docs/QUICK-START.md)** (5 minutos)

### 📦 **"Es mi primera vez con el proyecto"**
→ **[Guía de Instalación](docs/INSTALACION.md)** (paso a paso)

### 🐛 **"Tengo un problema"**
→ **[Solución de Problemas](docs/TROUBLESHOOTING.md)**

### 🗄️ **"MongoDB no funciona en Windows"**
→ **[MongoDB en Windows](docs/MONGODB-WINDOWS.md)**

### 🏗️ **"Quiero entender cómo funciona"**
→ **[Arquitectura del Sistema](docs/ARQUITECTURA.md)**

### 📡 **"Necesito la documentación de la API"**
→ **[API Reference](docs/API.md)**

### 🔍 **"¿Cómo funciona la búsqueda?"**
→ **[Funcionalidad de Búsqueda](docs/BUSQUEDA.md)**

---

## 📖 Documentación por Categoría

### 🎓 Para Empezar

| Documento | Tiempo | Descripción |
|-----------|--------|-------------|
| [Inicio Rápido](docs/QUICK-START.md) | 5 min | Configuración rápida |
| [Instalación](docs/INSTALACION.md) | 20 min | Guía completa paso a paso |
| [MongoDB Windows](docs/MONGODB-WINDOWS.md) | 10 min | Instalación en Windows |

### 📖 Documentación Técnica

| Documento | Contenido |
|-----------|-----------|
| [Arquitectura](docs/ARQUITECTURA.md) | Diseño del sistema completo |
| [API Reference](docs/API.md) | Todos los endpoints documentados |
| [Búsqueda](docs/BUSQUEDA.md) | Sistema de búsqueda de texto |

### 🔧 Soporte

| Documento | Para qué sirve |
|-----------|----------------|
| [Troubleshooting](docs/TROUBLESHOOTING.md) | Solución de problemas comunes |

---

## 📁 Estructura de Documentación

```
📦 Glitter/
│
├── 📄 README.md                    ← EMPIEZA AQUÍ
│   └── Visión general + enlaces
│
├── 📄 DOCUMENTACION.md             ← ESTE ARCHIVO (índice)
│
├── 📁 docs/                        ← Documentación detallada
│   │
│   ├── 🎓 Manuales de Uso
│   │   ├── QUICK-START.md          Inicio rápido
│   │   ├── INSTALACION.md          Instalación completa
│   │   ├── TROUBLESHOOTING.md      Solución de problemas
│   │   └── MONGODB-WINDOWS.md      MongoDB en Windows
│   │
│   └── 📖 Documentación Técnica
│       ├── ARQUITECTURA.md         Diseño del sistema
│       ├── API.md                  Endpoints
│       └── BUSQUEDA.md             Sistema de búsqueda
│
├── 🎨 Glitter-Vue/                 ← Frontend
│   └── README.md                   Documentación específica
│
└── ⚙️ Glitter-api/                 ← Backend
    └── README.md                   Documentación específica
```

---

## 🎯 Flujo Recomendado

### Día 1: Configuración
```
1. README.md (visión general)
2. QUICK-START.md (configurar en 5 min)
3. Verificar que funciona
```

### Día 2: Exploración
```
1. ARQUITECTURA.md (entender el sistema)
2. Explorar código frontend (Glitter-Vue/)
3. Explorar código backend (Glitter-api/)
```

### Día 3+: Desarrollo
```
1. API.md (referencia de endpoints)
2. BUSQUEDA.md (si trabajas con búsqueda)
3. TROUBLESHOOTING.md (cuando tengas problemas)
```

---

## 🔗 Enlaces Rápidos

### Documentación
- [README Principal](README.md)
- [Backend README](Glitter-api/README.md)
- [Frontend README](Glitter-Vue/README.md)

### Repositorios
- [Backend en GitHub](https://github.com/No-Woman-No-Work/Glitter-api)
- [Frontend en GitHub](https://github.com/No-Woman-No-Work/Glitter-Vue)

### Recursos Externos
- [Vue 3](https://vuejs.org/)
- [Vuex 4](https://vuex.vuejs.org/)
- [Vite](https://vite.dev/)
- [Express](https://expressjs.com/)
- [MongoDB](https://docs.mongodb.com/)

---

## 📊 Referencia Rápida

### Puertos
- **MongoDB:** 27017
- **Backend:** 3000
- **Frontend:** 8080

### Comandos Esenciales

```bash
# Backend
cd Glitter-api
pnpm install && pnpm run init-db && pnpm start

# Frontend
cd Glitter-Vue
pnpm install && pnpm dev

# MongoDB
net start MongoDB  # Windows
mongosh            # Conectar
```

### Endpoints Clave

```
POST   /auth/login            # Iniciar sesión
GET    /glits/                # Listar glits públicos
GET    /glits?search=término  # Buscar glits
POST   /glits/                # Crear glit
POST   /glits/:id/kudos       # Dar kudos
POST   /users/:id/follow      # Seguir usuario
```

---

## 🆘 Ayuda Rápida

### Problema Común → Solución Directa

| Problema | Documento |
|----------|-----------|
| MongoDB no se conecta | [MongoDB Windows](docs/MONGODB-WINDOWS.md) |
| Puerto ocupado | [Troubleshooting](docs/TROUBLESHOOTING.md) |
| Error de CORS | [Troubleshooting](docs/TROUBLESHOOTING.md) |
| Búsqueda no funciona | [Búsqueda](docs/BUSQUEDA.md) |
| Error al instalar | [Instalación](docs/INSTALACION.md) |

---

## 💡 Tips

- **Primera vez:** Sigue el orden recomendado
- **Problemas:** Consulta TROUBLESHOOTING.md primero
- **Desarrollo:** Ten API.md a mano como referencia
- **VS Code:** Usa el workspace `glitter-workspace.code-workspace`

---

## 👥 Créditos

**Equipo de Desarrollo:**
- Andrea Ares Fernandez
- Emma Alonso McCoy
- Nelanyi Ruiz Contreras
- Silvia Pescador López
- Mariana Antoniol

**Organización:** No-Woman-No-Work  
**Bootcamp:** Women in Tech  
**Asistencia técnica:** Claude Sonnet 4.5 (Anthropic)

---

<div align="center">

**[← Volver al README](README.md)**

**¿Perdido? Empieza por [Inicio Rápido](docs/QUICK-START.md)**

</div>

