# 🐛 Solución de Problemas - Glitter

Guía completa para resolver problemas comunes al desarrollar con Glitter.

---

## 🗄️ Problemas con MongoDB

### MongoDB no se conecta

**Síntomas:**
- Error: `Failed to connect MongoDB`
- Backend no arranca
- Mensaje: `ECONNREFUSED 127.0.0.1:27017`

**Soluciones:**

1. **Verificar que MongoDB está corriendo:**

```bash
# Windows
Get-Service -Name MongoDB

# Mac
brew services list | grep mongodb

# Linux
sudo systemctl status mongod

# Todos los sistemas
mongosh
```

2. **Iniciar MongoDB:**

```bash
# Windows (PowerShell como Admin)
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

3. **Iniciar manualmente si el servicio no existe:**

```bash
# Windows
mongod --dbpath="C:\data\db"

# Mac/Linux
mongod --dbpath=/usr/local/var/mongodb
```

📖 **Más ayuda:** [MongoDB en Windows](MONGODB-WINDOWS.md)

---

### Base de datos vacía o sin datos

**Síntomas:**
- No aparecen publicaciones
- No hay usuarios de ejemplo

**Solución:**

```bash
cd Glitter-api
pnpm run init-db
```

Esto reiniciará la base de datos con datos de ejemplo.

---

### Error: "MongoServerError: E11000 duplicate key error"

**Causa:** Intentas crear un documento con un campo único que ya existe.

**Solución:**

```bash
# Opción 1: Eliminar la base de datos
mongosh
use glitter
db.dropDatabase()
exit

# Opción 2: Eliminar colección específica
mongosh
use glitter
db.users.drop()
# o
db.glits.drop()
exit

# Luego reinicializar
cd Glitter-api
pnpm run init-db
```

---

## 🔌 Problemas con Puertos

### Puerto 3000 ya en uso (Backend)

**Síntomas:**
- Error: `Port 3000 is already in use`
- Backend no arranca

**Solución Windows:**

```powershell
# Ver qué proceso usa el puerto
netstat -ano | findstr :3000

# Matar el proceso (reemplaza <PID> con el número que viste)
taskkill /PID <PID> /F
```

**Solución Mac/Linux:**

```bash
# Ver y matar proceso
lsof -ti:3000 | xargs kill -9
```

---

### Puerto 8080 ya en uso (Frontend)

**Síntomas:**
- Error: `Port 8080 is already in use`
- Vue CLI pregunta si quieres usar otro puerto

**Solución:**

1. **Vite usará automáticamente el siguiente puerto disponible** (8081, 8082, etc.)

2. **O matar el proceso:**

```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8080 | xargs kill -9
```

---

## 📦 Problemas con Dependencias

### Error al instalar dependencias

**Síntomas:**
- `pnpm install` falla
- Errores de permisos
- Errores de compilación

**Soluciones:**

1. **Limpiar caché y reinstalar:**

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm cache store prune
pnpm install
```

2. **Permisos (Mac/Linux):**

```bash
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

3. **Usar versión LTS de Node.js:**

```bash
# Verificar versión
node --version

# Si es muy antigua, actualiza desde nodejs.org
```

---

### Error: "gyp ERR! build error"

**Causa:** Faltan herramientas de compilación.

**Solución:**

```bash
# Windows
npm install --global windows-build-tools

# Mac
xcode-select --install

# Linux (Ubuntu/Debian)
sudo apt-get install build-essential
```

---

## 🌐 Problemas de CORS

### Error: "Access to XMLHttpRequest blocked by CORS policy"

**Síntomas:**
- Frontend no puede comunicarse con backend
- Errores en consola del navegador

**Soluciones:**

1. **Verificar que el backend está corriendo:**

```bash
curl http://localhost:3000/glits/
```

2. **Verificar configuración de CORS en `Glitter-api/app.js`:**

```javascript
const cors = require("cors");
app.use(cors());
```

3. **Verificar que el frontend apunta al backend correcto:**

Archivo: `Glitter-Vue/src/api/glitterApi.js`

```javascript
const glitterApi = axios.create({
  baseURL: "http://localhost:3000", // Debe coincidir con el puerto del backend
});
```

---

## 🔐 Problemas de Autenticación

### Token inválido o expirado

**Síntomas:**
- Error 401: Unauthorized
- Redirigido al login constantemente

**Solución:**

```javascript
// Limpiar localStorage
localStorage.clear()

// O específicamente el token
localStorage.removeItem('access_token')
```

Luego vuelve a iniciar sesión.

---

### No puedo iniciar sesión

**Soluciones:**

1. **Verificar credenciales:**
   - Email correcto
   - Contraseña correcta

2. **Verificar que el usuario existe:**

```bash
mongosh
use glitter
db.users.find({ email: "tu_email@ejemplo.com" })
```

3. **Crear nuevo usuario:**
   - Usa el formulario de registro
   - O ejecuta `pnpm run init-db` para crear usuarios de ejemplo

---

## 🖼️ Problemas con Imágenes

### Las imágenes no se cargan

**Síntomas:**
- Imágenes rotas (icono de imagen rota)
- Error 404 al cargar imágenes

**Soluciones:**

1. **Verificar que la carpeta uploads existe:**

```bash
ls Glitter-api/public/uploads/
```

2. **Verificar permisos de la carpeta:**

```bash
# Mac/Linux
chmod 755 Glitter-api/public/uploads/
```

3. **Verificar configuración de archivos estáticos:**

Archivo: `Glitter-api/app.js`

```javascript
app.use(express.static("./public"));
```

---

### Error al subir imágenes

**Síntomas:**
- Error al crear glit con imagen
- Imagen no se guarda

**Soluciones:**

1. **Verificar tamaño de la imagen** (máximo 5MB)

2. **Verificar formato** (jpg, jpeg, png, gif, webp)

3. **Verificar configuración de Multer** en el backend

---

## 🚀 Problemas al Iniciar

### Backend no arranca

**Checklist:**

- [ ] MongoDB está corriendo
- [ ] Puerto 3000 está libre
- [ ] Dependencias instaladas (`pnpm install`)
- [ ] Base de datos inicializada (`pnpm run init-db`)

**Verificar logs:**

```bash
cd Glitter-api
pnpm start
# Lee los mensajes de error
```

---

### Frontend no arranca

**Checklist:**

- [ ] Puerto 8080 está libre (o acepta alternativo)
- [ ] Dependencias instaladas (`pnpm install`)
- [ ] Node.js versión correcta (v14+)

**Verificar logs:**

```bash
cd Glitter-Vue
pnpm dev
# Lee los mensajes de error
```

---

## 🔧 Problemas con Scripts

### start-dev.bat no funciona (Windows)

**Soluciones:**

1. **Ejecutar desde PowerShell o CMD** (no Git Bash):

```powershell
cd ruta/al/proyecto
.\start-dev.bat
```

2. **Usar el script simple:**

```powershell
.\start-dev-simple.bat
```

3. **Iniciar manualmente:**

Ver [Quick Start](QUICK-START.md) - Opción Manual

---

### start-dev.sh no funciona (Mac/Linux)

**Soluciones:**

1. **Hacer el script ejecutable:**

```bash
chmod +x start-dev.sh
```

2. **Ejecutar con bash:**

```bash
bash start-dev.sh
```

---

## 🌐 Problemas en el Navegador

### Página en blanco

**Soluciones:**

1. **Abrir consola del navegador** (F12)
   - Lee los errores en la consola

2. **Verificar que el frontend está corriendo:**
   - Debe mostrar "VITE ready → http://localhost:8080/"

3. **Limpiar caché del navegador:**
   - Ctrl+Shift+R (recarga forzada)
   - O modo incógnito

---

### Componentes no se actualizan

**Causa:** Hot-reload no funciona.

**Soluciones:**

1. **Reiniciar el servidor de desarrollo:**

```bash
# Ctrl+C para detener
pnpm dev
```

2. **Limpiar caché de Vite:**

```bash
rm -rf node_modules/.vite
pnpm dev
```

---

## 💻 Problemas con VS Code

### Debugging no funciona

**Soluciones:**

1. **Verificar que los servidores están corriendo**

2. **Reinstalar extensiones:**
   - Desinstala y reinstala Volar, ESLint, etc.

3. **Verificar configuración de launch.json:**

Debe existir: `.vscode/launch.json`

---

### ESLint muestra errores

**Soluciones:**

1. **Instalar dependencias:**

```bash
pnpm install
```

2. **Configurar ESLint:**

```bash
# Backend
cd Glitter-api
pnpm run lint -- --fix

# Frontend
cd Glitter-Vue
pnpm lint -- --fix
```

---

## 🔄 Reinicio Completo

Si nada funciona, prueba un reinicio completo:

### 1. Detener todo

```bash
# Ctrl+C en todas las terminales
# O cerrar todas las ventanas de terminal
```

### 2. Limpiar MongoDB

```bash
mongosh
use glitter
db.dropDatabase()
exit
```

### 3. Limpiar dependencias

```bash
cd Glitter-api
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Frontend
cd Glitter-Vue
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 4. Reinicializar base de datos

```bash
cd Glitter-api
pnpm run init-db
```

### 5. Iniciar todo de nuevo

```bash
# Opción 1: Script
start-dev.bat  # Windows
./start-dev.sh # Mac/Linux

# Opción 2: Manual
# Terminal 1
cd Glitter-api && pnpm start

# Terminal 2
cd Glitter-Vue && pnpm dev
```

---

## 🆘 Obtener Más Ayuda

Si el problema persiste:

1. **Revisa los logs** completos en las terminales
2. **Busca el error específico** en Google
3. **Consulta la documentación oficial:**
   - [Vue 3](https://vuejs.org/)
   - [Express](https://expressjs.com/)
   - [MongoDB](https://docs.mongodb.com/)

---

## 📝 Reportar un Bug

Si encuentras un bug en el código:

1. Verifica que no sea un problema de configuración
2. Anota los pasos para reproducirlo
3. Incluye los mensajes de error completos
4. Reporta en GitHub Issues

---

[← Volver al README](../README.md)

