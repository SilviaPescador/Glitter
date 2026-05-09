# 📦 Guía de Instalación Completa - Glitter

Guía detallada para instalar y configurar Glitter en tu entorno local.

---

## 📋 Pre-requisitos

### Software Necesario

1. **Node.js** (v14 o superior)
   - Descargar: https://nodejs.org/
   - Verificar: `node --version`

2. **MongoDB** (v4 o superior)
   - Descargar: https://www.mongodb.com/try/download/community
   - Verificar: `mongod --version`

3. **pnpm** (gestor de paquetes del proyecto)
   - Instalar: `npm install -g pnpm`
   - Verificar: `pnpm --version`

4. **Git** (opcional, recomendado)
   - Descargar: https://git-scm.com/
   - Verificar: `git --version`

---

## 🗄️ Instalación de MongoDB

### Windows

1. **Descargar MongoDB Community Server**
   - https://www.mongodb.com/try/download/community
   - Selecciona: Windows, MSI

2. **Instalar:**
   - Ejecuta el instalador
   - Selecciona "Complete"
   - ✅ Marca "Install MongoDB as a Service"
   - ✅ Marca "Install MongoDB Compass" (opcional)

3. **Crear carpeta de datos:**
   ```powershell
   mkdir C:\data\db
   ```

4. **Iniciar servicio:**
   ```powershell
   net start MongoDB
   ```

📖 **Problemas con MongoDB en Windows?** Lee [MongoDB en Windows](MONGODB-WINDOWS.md)

### Mac

```bash
# Instalar con Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Iniciar servicio
brew services start mongodb-community

# Verificar
mongosh
```

### Linux (Ubuntu/Debian)

```bash
# Importar clave pública
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Añadir repositorio
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Instalar
sudo apt-get update
sudo apt-get install -y mongodb-org

# Iniciar
sudo systemctl start mongod
sudo systemctl enable mongod

# Verificar
mongosh
```

---

## 📦 Instalación del Proyecto

### 1. Clonar o Descargar el Proyecto

Si tienes Git:
```bash
cd ~/Documents/MIS_PROYECTOS
# El proyecto ya debe estar descargado
```

### 2. Instalar Dependencias del Backend

```bash
cd Glitter-api
pnpm install
```

Esto instalará:
- Express
- Mongoose
- JWT
- Multer
- CORS
- Y más...

### 3. Instalar Dependencias del Frontend

```bash
cd ../Glitter-Vue
pnpm install
```

Esto instalará:
- Vue 3
- Vue Router
- Vuex
- Axios
- Vite (build tool)
- Y más...

---

## 🗄️ Configuración de la Base de Datos

### 1. Asegúrate de que MongoDB está corriendo

```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 2. Inicializar la Base de Datos

```bash
cd Glitter-api
pnpm run init-db
```

Esto creará:
- Base de datos "glitter"
- Colecciones: users, glits
- Datos de ejemplo para probar

### 3. Verificar la Base de Datos

```bash
mongosh
use glitter
show collections
db.users.countDocuments()
db.glits.countDocuments()
exit
```

---

## 🚀 Primer Inicio

### Opción 1: Con Scripts (Recomendado)

**Windows:**
```bash
start-dev.bat
```

**Mac/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Opción 2: Manual

**Terminal 1 - Backend:**
```bash
cd Glitter-api
pnpm start
```

Deberías ver:
```
Glitter is listening in 3000
Connected to MongoDB on glitter
```

**Terminal 2 - Frontend:**
```bash
cd Glitter-Vue
pnpm dev
```

Deberías ver:
```
VITE v6.x.x  ready in Xms
  ➜  Local:   http://localhost:8080/
```

### Opción 3: VS Code

1. Abre el workspace: `glitter-workspace.code-workspace`
2. Presiona `Ctrl+Shift+P`
3. Escribe "Tasks: Run Task"
4. Selecciona "🌟 Start: Fullstack"

---

## ✅ Verificación de la Instalación

### 1. Backend
```bash
curl http://localhost:3000/glits/
```
Deberías ver un JSON con publicaciones.

### 2. Frontend
Abre: http://localhost:8080
Deberías ver la página de inicio de Glitter.

### 3. Base de Datos
```bash
mongosh
use glitter
db.users.find().pretty()
db.glits.find().pretty()
```

---

## 🔧 Configuración Adicional

### Variables de Entorno (Opcional)

#### Backend
Crea `Glitter-api/.env`:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/glitter
JWT_SECRET=tu_secreto_super_seguro
NODE_ENV=development
```

#### Frontend
Ya está configurado en `Glitter-Vue/.env.development` (si se necesita):
```env
VITE_API_URL=http://localhost:3000
```

---

## 💻 Configuración de VS Code

### 1. Abrir Workspace
```bash
code glitter-workspace.code-workspace
```

### 2. Instalar Extensiones Recomendadas

VS Code te preguntará si quieres instalar las extensiones recomendadas:
- ESLint
- Prettier
- Volar (Vue)
- MongoDB for VS Code

Haz clic en "Install All"

### 3. Configurar Debugging

Ya está configurado en `.vscode/launch.json`

Para debuggear:
1. Ve a la pestaña "Run and Debug" (Ctrl+Shift+D)
2. Selecciona "🌟 Fullstack: Backend + Frontend"
3. Presiona F5

---

## 🎯 Configuración Recomendada para Desarrollo

### 1. MongoDB como Servicio Automático

**Windows:**
```powershell
Set-Service -Name MongoDB -StartupType Automatic
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl enable mongod
```

### 2. Agregar MongoDB al PATH

**Windows:**
```powershell
$env:Path += ";C:\Program Files\MongoDB\Server\6.0\bin"
[Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::Machine)
```

Reinicia tu terminal después de esto.

---

## 🐛 Solución de Problemas

### Errores de Instalación

**Error: `EACCES: permission denied`**
```bash
# Mac/Linux
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

**Error: `gyp ERR! build error`**
```bash
# Instalar herramientas de compilación
# Windows: npm install --global windows-build-tools
# Mac: xcode-select --install
# Linux: sudo apt-get install build-essential
```

### MongoDB no se conecta

📖 Ver [MongoDB en Windows](MONGODB-WINDOWS.md) o [Troubleshooting](TROUBLESHOOTING.md)

### Puerto ocupado

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

---

## 📚 Siguientes Pasos

1. ✅ Instalación completada
2. 📖 Lee [Quick Start](QUICK-START.md) para iniciar rápidamente
3. 🏗️ Estudia [Arquitectura](ARQUITECTURA.md) para entender el sistema
4. 📡 Revisa [API Reference](API.md) para conocer los endpoints
5. 🚀 ¡Empieza a desarrollar!

---

## 🆘 Ayuda

Si tienes problemas:
1. Revisa [Troubleshooting](TROUBLESHOOTING.md)
2. Verifica que todos los pre-requisitos están instalados
3. Asegúrate de que MongoDB está corriendo
4. Limpia e reinstala dependencias:
   ```bash
   # Backend
   cd Glitter-api && rm -rf node_modules pnpm-lock.yaml && pnpm install
   # Frontend
   cd Glitter-Vue && rm -rf node_modules pnpm-lock.yaml && pnpm install
   ```

---

[← Volver al README](../README.md)

