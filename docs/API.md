# 📡 API Reference - Glitter

Documentación completa de los endpoints de la API de Glitter.

---

## 🌐 Base URL

```
http://localhost:3000
```

En producción, reemplaza con tu dominio.

---

## 🔐 Autenticación

La mayoría de los endpoints requieren autenticación mediante JWT (JSON Web Token).

### Cómo autenticarse:

1. Obtén un token mediante `/auth/login` o `/auth/register`
2. Incluye el token en el header de tus peticiones:

```http
Authorization: Bearer <tu_token_aqui>
```

---

## 📋 Endpoints

### 🔐 Autenticación

#### Registrar Usuario

```http
POST /auth/register
```

**Body:**
```json
{
  "username": "usuario123",
  "email": "usuario@ejemplo.com",
  "password": "contraseña_segura"
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "usuario123",
    "email": "usuario@ejemplo.com"
  }
}
```

---

#### Iniciar Sesión

```http
POST /auth/login
```

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña_segura"
}
```

**Respuesta exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "usuario123",
    "email": "usuario@ejemplo.com"
  }
}
```

---

#### Verificar Token

```http
GET /auth/verify-token
```

**Headers:**
```http
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "valid": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "usuario123"
  }
}
```

---

#### Recuperar Contraseña

```http
POST /auth/forgot-password
```

**Body:**
```json
{
  "email": "usuario@ejemplo.com"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Email de recuperación enviado"
}
```

---

#### Resetear Contraseña

```http
POST /auth/reset-password
```

**Body:**
```json
{
  "token": "token_de_recuperacion",
  "newPassword": "nueva_contraseña_segura"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Contraseña actualizada exitosamente"
}
```

---

### 📝 Publicaciones (Glits)

#### Listar Glits Públicos

```http
GET /glits/
```

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Glits por página (default: 10)

**Respuesta exitosa (200):**
```json
{
  "results": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "text": "Mi primer glit!",
      "author": {
        "_id": "507f1f77bcf86cd799439012",
        "username": "usuario123",
        "avatar": "/uploads/avatar.jpg"
      },
      "image": "/uploads/glit-image.jpg",
      "kudos": ["507f1f77bcf86cd799439013"],
      "createdAt": "2023-11-28T10:00:00.000Z"
    }
  ],
  "totalDocs": 50,
  "page": 1,
  "totalPages": 5
}
```

---

#### Listar Glits Privados (Feed Personalizado)

```http
GET /glits/private
```

**Headers:**
```http
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (opcional): Número de página
- `limit` (opcional): Glits por página

**Respuesta:** Igual que glits públicos, pero solo de usuarios seguidos.

---

#### Crear Glit

```http
POST /glits/
```

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body (FormData):**
```
text: "Contenido del glit"
image: [archivo] (opcional)
```

**Respuesta exitosa (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "text": "Contenido del glit",
  "author": "507f1f77bcf86cd799439012",
  "image": "/uploads/1234567890.jpg",
  "kudos": [],
  "createdAt": "2023-11-28T10:00:00.000Z"
}
```

---

#### Eliminar Glit

```http
DELETE /glits/:glitId
```

**Headers:**
```http
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "message": "Glit eliminado exitosamente"
}
```

**Nota:** Solo puedes eliminar tus propios glits.

---

#### Dar Kudos

```http
POST /glits/:glitId/kudos
```

**Headers:**
```http
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "text": "Contenido del glit",
  "kudos": ["507f1f77bcf86cd799439013"],
  "kudosCount": 1
}
```

---

#### Quitar Kudos

```http
DELETE /glits/:glitId/kudos
```

**Headers:**
```http
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "text": "Contenido del glit",
  "kudos": [],
  "kudosCount": 0
}
```

---

### 👥 Usuarios

#### Seguir Usuario

```http
POST /users/:userId/follow
```

**Headers:**
```http
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "message": "Ahora sigues a este usuario",
  "following": true
}
```

**Nota:** No puedes seguirte a ti mismo.

---

#### Dejar de Seguir Usuario

```http
DELETE /users/:userId/follow
```

**Headers:**
```http
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "message": "Has dejado de seguir a este usuario",
  "following": false
}
```

---

## 🚨 Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Petición exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token inválido o no proporcionado |
| 403 | Forbidden - No tienes permisos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## 🔒 Seguridad

### JWT Token

- Los tokens expiran después de 24 horas
- Almacena el token en `localStorage` en el frontend
- Incluye el token en cada petición autenticada

### Contraseñas

- Las contraseñas se hashean con bcrypt
- Nunca se devuelven en las respuestas de la API

---

## 📊 Modelos de Datos

### User

```javascript
{
  _id: ObjectId,
  username: String,      // Único, requerido
  email: String,         // Único, requerido
  password: String,      // Hash, requerido
  avatar: String,        // URL opcional
  bio: String,           // Biografía opcional
  following: [ObjectId], // IDs de usuarios seguidos
  followers: [ObjectId], // IDs de seguidores
  createdAt: Date,
  updatedAt: Date
}
```

### Glit

```javascript
{
  _id: ObjectId,
  text: String,          // Requerido
  author: ObjectId,      // Referencia a User
  image: String,         // URL opcional
  kudos: [ObjectId],     // IDs de usuarios que dieron kudos
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Ejemplos de Uso

### Con cURL

```bash
# Registrar usuario
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Crear glit (con token)
curl -X POST http://localhost:3000/glits/ \
  -H "Authorization: Bearer <tu_token>" \
  -H "Content-Type: application/json" \
  -d '{"text":"Mi primer glit desde cURL!"}'
```

### Con JavaScript (Axios)

```javascript
import axios from 'axios';

// Configurar cliente
const api = axios.create({
  baseURL: 'http://localhost:3000'
});

// Login
const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

// Crear glit
const createGlit = async (text) => {
  const token = localStorage.getItem('token');
  const response = await api.post('/glits/', 
    { text },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
```

---

## 🔄 Rate Limiting

Actualmente no hay rate limiting implementado, pero se recomienda:
- Máximo 100 peticiones por minuto por IP
- Máximo 1000 peticiones por hora por usuario autenticado

---

## 📝 Notas

- Todos los timestamps están en formato ISO 8601 (UTC)
- Las imágenes se suben a `/public/uploads/`
- El tamaño máximo de imagen es 5MB
- Los glits tienen un límite de 280 caracteres

---

[← Volver al README](../README.md)

