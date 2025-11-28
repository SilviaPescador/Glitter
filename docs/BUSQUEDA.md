# 🔍 Funcionalidad de Búsqueda

Guía completa de la funcionalidad de búsqueda de glits en Glitter.

---

## 🚀 Inicio Rápido

### Activar la Búsqueda (Primera vez)

```bash
# Backend - Crear índice de texto en MongoDB
cd Glitter-api
npm run init-db
# o si no quieres borrar datos:
npm run create-search-index
```

### Usar la Búsqueda

1. Escribe un término en el campo de búsqueda de la navbar
2. Presiona Enter o clic en 🔍
3. Ve los resultados filtrados
4. Clic en "Limpiar búsqueda" para volver a ver todos

---

## 🏗️ Arquitectura

### Flujo Completo

```
Usuario escribe "coding" en NavBar
        ↓
NavBar → Backend: GET /glits?search=coding
        ↓
Backend busca en MongoDB con $text index
        ↓
Backend devuelve resultados
        ↓
NavBar → Vuex Store (guarda resultados)
        ↓
Redirige a /public o /public-plus
        ↓
Vista detecta búsqueda activa
        ↓
Muestra resultados filtrados
```

---

## 🔀 Enrutamiento Inteligente

### Para Usuarios NO Autenticados

| Acción | Ruta | Funcionalidades |
|--------|------|-----------------|
| Navegar | `/public` | Solo ver glits |
| Buscar | `/public` | Ver resultados |

### Para Usuarios Autenticados

| Acción | Ruta | Funcionalidades |
|--------|------|-----------------|
| Navegar | `/public-plus` | Follow, Kudos, Delete |
| Buscar | `/public-plus` | Resultados + Funcionalidades |

---

## 🔧 Configuración Backend

### 1. Índice de Texto en MongoDB

**Archivo:** `Glitter-api/models/glit.js`

```javascript
glitSchema.index({ text: "text" });
```

Este índice permite búsqueda rápida de texto completo.

### 2. Endpoint de Búsqueda

**Ruta:** `GET /glits?search=término`

```javascript
// En Glitter-api/routes/glits.js
const search = req.query.search;

if (search) {
  query.$text = { $search: search };
}
```

### 3. Crear el Índice

**Opción A - Con datos de ejemplo:**
```bash
npm run init-db
```

**Opción B - Sin borrar datos:**
```bash
npm run create-search-index
```

**Opción C - Manual:**
```bash
mongosh
use glitter
db.glits.createIndex({ text: "text" })
```

---

## 💻 Configuración Frontend

### 1. Store de Vuex

**Módulo:** `src/store/modules/search.js`

```javascript
state: {
  searchTerm: '',        // Término buscado
  searchResults: [],     // Resultados
  isSearching: false,    // Estado de carga
  hasSearched: false     // Si hay búsqueda activa
}
```

### 2. Componente NavBar

Gestiona la búsqueda:
- Validación de campo vacío
- Petición al backend
- Guarda resultados en store
- Redirige a vista correcta
- Muestra notificaciones

### 3. Vistas (PublicView y PublicPlusView)

Muestran resultados:
- Detectan búsqueda activa
- Filtran glits
- Header dinámico
- Botón limpiar búsqueda

---

## 🧪 Testing

### Test 1: Búsqueda Exitosa (Autenticado)

```
1. Inicia sesión
2. Busca "love"
3. ✅ Notificación: "Se encontraron X resultados"
4. ✅ Estás en /public-plus
5. ✅ Header: "Resultados de búsqueda: love"
6. ✅ Solo glits con "love"
7. ✅ Botones: Follow, Kudos, Delete
```

### Test 2: Búsqueda Sin Resultados

```
1. Busca "xyzabc123"
2. ✅ Notificación: "No se encontraron resultados"
3. ✅ Mensaje: "No se encontraron publicaciones"
4. ✅ Botón "Limpiar búsqueda" visible
```

### Test 3: Limpiar Búsqueda

```
1. Después de buscar
2. Clic en "Limpiar búsqueda"
3. ✅ Notificación: "Búsqueda limpiada"
4. ✅ Vuelven todos los glits
5. ✅ Header normal
```

---

## 🐛 Solución de Problemas

### Error: "text index required for $text query"

**Causa:** Falta el índice de texto en MongoDB

**Solución:**
```bash
cd Glitter-api
npm run create-search-index
```

### Resultados no se muestran

**Debugging:**
1. Abre consola del navegador (F12)
2. Busca algo
3. Revisa logs:
   ```
   🔍 getGlits llamado: { hasSearch: true, resultsCount: X }
   📋 Mostrando resultados de búsqueda: X
   ```

**Solución:**
- Verifica que Vue DevTools muestra datos en `store.search.searchResults`
- Reinicia frontend si es necesario

### Redirige a ruta incorrecta

**Problema:** Usuario autenticado va a `/public` en lugar de `/public-plus`

**Solución:**
- Verifica que `beforeEnter: isAuthenticated` está en la ruta `/public`
- Verifica que el guard detecta autenticación correctamente

---

## 💡 Características

### Búsqueda de Texto Completo

- ✅ Case-insensitive (mayúsculas/minúsculas)
- ✅ Busca palabras completas
- ✅ Soporta múltiples palabras
- ✅ Ignora palabras comunes (stop words)

### UX

- ✅ Notificaciones de feedback
- ✅ Header dinámico con término buscado
- ✅ Botón para limpiar búsqueda
- ✅ Mensaje cuando no hay resultados
- ✅ Validación de campo vacío

### Reactividad

- ✅ Resultados se muestran inmediatamente
- ✅ Watch detecta cambios en store
- ✅ Limpieza actualiza vista automáticamente

---

## 📝 Ejemplos de Búsqueda

Con los datos de ejemplo:

| Término | Resultados |
|---------|-----------|
| "coding" | 2-3 glits |
| "love" | 2 glits |
| "working" | 1 glit |
| "proud" | 1 glit |

---

## 🚀 Mejoras Futuras

- [ ] Autocompletado
- [ ] Búsqueda en tiempo real
- [ ] Filtros avanzados (fecha, autor, kudos)
- [ ] Historial de búsquedas
- [ ] Búsqueda por hashtags
- [ ] Búsqueda por menciones

---

[← Volver al README](../README.md)

