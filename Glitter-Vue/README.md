# 🎨 Glitter Vue - Frontend

> Frontend SPA para Glitter, construido con Vue 3, Vue Router y Vuex.

[![Vue 3](https://img.shields.io/badge/Vue-3.2-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-4.0-4FC08D)](https://router.vuejs.org/)
[![Vuex](https://img.shields.io/badge/Vuex-4.0-4FC08D)](https://vuex.vuejs.org/)

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo con hot-reload
npm run serve
```

La aplicación estará corriendo en: **http://localhost:8080**

📖 **Documentación completa:** [README Principal](../README.md)

---

## 📋 Requisitos

- **Node.js** v14 o superior
- **npm** v6 o superior
- **Backend corriendo** en http://localhost:3000

---

## 🛠️ Scripts Disponibles

```bash
npm run serve     # Servidor de desarrollo (puerto 8080)
npm run build     # Build de producción
npm run lint      # Linter y corrección de código
```

---

## 📁 Estructura del Proyecto

```
Glitter-Vue/
├── public/
│   ├── index.html          # HTML base
│   └── favicon.ico
│
├── src/
│   ├── main.js             # Punto de entrada
│   ├── App.vue             # Componente raíz
│   │
│   ├── api/
│   │   └── glitterApi.js   # Cliente Axios configurado
│   │
│   ├── router/
│   │   ├── index.js        # Configuración de rutas
│   │   └── authGuard.js    # Protección de rutas privadas
│   │
│   ├── components/
│   │   ├── NavBar.vue      # Barra de navegación
│   │   ├── GlitCard.vue    # Tarjeta de publicación
│   │   ├── UserCard.vue    # Tarjeta de usuario
│   │   ├── SearchBar.vue   # Barra de búsqueda
│   │   └── ...
│   │
│   ├── views/
│   │   ├── LandingPageView.vue  # Página de inicio
│   │   ├── LoginView.vue        # Inicio de sesión
│   │   ├── SignupView.vue       # Registro
│   │   ├── HomeView.vue         # Feed principal
│   │   ├── PublicView.vue       # Vista pública
│   │   ├── PrivateView.vue      # Vista privada
│   │   ├── UserProfileView.vue  # Perfil de usuario
│   │   └── ...
│   │
│   ├── assets/
│   │   ├── styles.css      # Estilos globales
│   │   └── img/            # Imágenes y logos
│   │
│   └── utils/
│       ├── emailRegex.js   # Validación de email
│       └── followingUsersName.js
│
├── package.json
├── vue.config.js           # Configuración de Vue CLI
└── babel.config.js         # Configuración de Babel
```

---

## 🗺️ Rutas de la Aplicación

| Ruta | Componente | Protegida | Descripción |
|------|------------|-----------|-------------|
| `/` | LandingPageView | No | Página de bienvenida |
| `/login` | LoginView | No | Inicio de sesión |
| `/signup` | SignupView | No | Registro de usuario |
| `/home` | HomeView | Sí | Feed principal |
| `/public` | PublicView | No | Vista pública de glits |
| `/private` | PrivateView | Sí | Feed personalizado |
| `/profile/:id` | UserProfileView | Sí | Perfil de usuario |
| `/password` | PasswordView | No | Recuperar contraseña |
| `/unsubscribe` | UnsubscribeView | Sí | Darse de baja |

---

## 🎨 Componentes Principales

### Componentes de UI

- **`NavBar.vue`** - Barra de navegación con menú responsive
- **`FooterSection.vue`** - Pie de página
- **`SearchBar.vue`** - Barra de búsqueda de usuarios/glits
- **`LogoutButton.vue`** - Botón de cerrar sesión

### Componentes de Contenido

- **`GlitCard.vue`** - Tarjeta de publicación con kudos y opciones
- **`GlitItem.vue`** - Item de glit en lista
- **`UserCard.vue`** - Tarjeta de usuario con botón follow
- **`CustomCard.vue`** - Tarjeta genérica reutilizable

---

## 🔌 API Client

El proyecto usa Axios para comunicarse con el backend.

### Configuración

Archivo: `src/api/glitterApi.js`

```javascript
import axios from "axios";

const glitterApi = axios.create({
  baseURL: "http://localhost:3000", // URL del backend
});

// Interceptor para añadir token JWT
glitterApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default glitterApi;
```

### Uso en Componentes

```javascript
import glitterApi from "@/api/glitterApi";

// Obtener glits públicos
const glits = await glitterApi.get("/glits/");

// Crear un glit
const newGlit = await glitterApi.post("/glits/", {
  text: "Mi primer glit!"
});

// Dar kudos
await glitterApi.post(`/glits/${glitId}/kudos`);
```

---

## 🎯 Funcionalidades Implementadas

### Autenticación
- ✅ Registro de usuarios
- ✅ Inicio de sesión con JWT
- ✅ Recuperación de contraseña
- ✅ Protección de rutas privadas
- ✅ Logout

### Publicaciones (Glits)
- ✅ Ver glits públicos
- ✅ Ver feed personalizado (usuarios seguidos)
- ✅ Crear glits con texto
- ✅ Subir imágenes
- ✅ Dar/quitar kudos
- ✅ Eliminar glits propios

### Usuarios
- ✅ Ver perfiles
- ✅ Seguir/dejar de seguir
- ✅ Buscar usuarios
- ✅ Ver lista de seguidores/siguiendo

### UI/UX
- ✅ Diseño responsive
- ✅ Hot-reload en desarrollo
- ✅ Navegación SPA fluida
- ✅ Feedback visual de acciones

---

## 🔧 Configuración

### Variables de Entorno

Archivo: `.env.development`

```env
VUE_APP_API_URL=http://localhost:3000
PORT=8080
```

Archivo: `.env.production`

```env
VUE_APP_API_URL=https://tu-api-produccion.com
```

### Vue Config

Archivo: `vue.config.js`

```javascript
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  // Configuración adicional...
});
```

---

## 🎨 Estilos

### Framework CSS

El proyecto usa **Bootstrap** a través de `mdbvue` (Material Design Bootstrap Vue).

### Estilos Globales

Archivo: `src/assets/styles.css`

Incluye estilos personalizados para:
- Tipografía
- Colores del tema
- Componentes custom
- Utilidades

---

## 📦 Dependencias Principales

```json
{
  "vue": "^3.2.46",                    // Framework principal
  "vue-router": "^4.0.3",              // Enrutamiento
  "vuex": "^4.0.0",                    // Gestión de estado
  "axios": "^1.12.0",                  // Cliente HTTP
  "mdbvue": "^6.7.3",                  // Bootstrap Vue
  "@fortawesome/fontawesome-free": "^6.2.1",  // Iconos
  "vue-awesome-paginate": "^1.1.46"    // Paginación
}
```

---

## 🧪 Testing

```bash
# Verificar que la app funciona
npm run serve

# Abrir en navegador
open http://localhost:8080
```

---

## 🏗️ Build de Producción

```bash
# Crear build optimizado
npm run build

# Los archivos se generan en dist/
```

El build incluye:
- ✅ Minificación de código
- ✅ Tree-shaking
- ✅ Code splitting
- ✅ Optimización de assets
- ✅ Source maps

---

## 🐛 Solución de Problemas

### Backend no responde

Verifica que el backend está corriendo:

```bash
curl http://localhost:3000/glits/
```

### Error de CORS

Asegúrate de que el backend tiene CORS habilitado:

```javascript
// En Glitter-api/app.js
app.use(cors());
```

### Puerto 8080 ocupado

Vue CLI automáticamente usará el siguiente puerto disponible (8081, 8082, etc.)

### Hot-reload no funciona

```bash
# Reinicia el servidor
npm run serve
```

📖 **Más ayuda:** [docs/TROUBLESHOOTING.md](../docs/TROUBLESHOOTING.md)

---

## 💻 Desarrollo

### Convenciones de Código

- **Componentes:** PascalCase (`GlitCard.vue`)
- **Variables:** camelCase (`userName`)
- **Constantes:** UPPER_SNAKE_CASE (`API_URL`)
- **Archivos:** kebab-case (`auth-guard.js`)

### ESLint

```bash
# Ejecutar linter
npm run lint

# Auto-fix
npm run lint -- --fix
```

---

## 🚀 Mejoras Futuras

- [ ] Tests unitarios (Jest + Vue Test Utils)
- [ ] Tests E2E (Cypress)
- [ ] PWA (Progressive Web App)
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)
- [ ] Lazy loading de rutas
- [ ] Optimización de imágenes
- [ ] Skeleton loaders
- [ ] Infinite scroll
- [ ] Notificaciones en tiempo real (WebSockets)

---

## 📚 Documentación Adicional

- **[README Principal](../README.md)** - Visión general del proyecto completo
- **[Arquitectura](../docs/ARQUITECTURA.md)** - Diseño del sistema
- **[API Reference](../docs/API.md)** - Documentación de endpoints
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

- [Repositorio Frontend](https://github.com/No-Woman-No-Work/Glitter-Vue)
- [Repositorio Backend](https://github.com/No-Woman-No-Work/Glitter-api)
- [Documentación Vue 3](https://vuejs.org/)
- [Documentación Vue Router](https://router.vuejs.org/)
- [Documentación Vuex](https://vuex.vuejs.org/)
- [Vue CLI](https://cli.vuejs.org/)

---

<div align="center">

**[← Volver al README principal](../README.md)**

</div>
