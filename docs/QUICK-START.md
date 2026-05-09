# ⚡ Inicio Rápido - Glitter

Configura y ejecuta Glitter en menos de 5 minutos.

---

## 🎯 Opción 1: Inicio Automático (Más Fácil)

### Windows

1. **Iniciar MongoDB** (PowerShell como Administrador):
   ```powershell
   net start MongoDB
   ```

2. **Ejecutar script:**
   ```
   Doble clic en: start-dev.bat
   ```

3. **¡Listo!** Se abrirá automáticamente en http://localhost:8080

### Mac/Linux

```bash
# Iniciar MongoDB
brew services start mongodb-community  # Mac
sudo systemctl start mongod            # Linux

# Ejecutar script
./start-dev.sh
```

---

## 🔧 Opción 2: Inicio Manual

### Paso 1: Iniciar MongoDB

**Windows:**
```powershell
net start MongoDB
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### Paso 2: Backend (Terminal 1)

```bash
cd Glitter-api
pnpm install         # Solo primera vez
pnpm run init-db     # Solo primera vez
pnpm start
```

✅ Verás: `Glitter is listening in 3000`

### Paso 3: Frontend (Terminal 2)

```bash
cd Glitter-Vue
pnpm install         # Solo primera vez
pnpm dev
```

✅ Verás: `VITE ready in Xms → http://localhost:8080/`

### Paso 4: Abrir Navegador

Abre: **http://localhost:8080**

---

## ✅ Verificación

### Backend funcionando:
```bash
curl http://localhost:3000/glits/
```
Deberías ver un JSON con publicaciones.

### Frontend funcionando:
Abre http://localhost:8080 - Deberías ver la página de inicio.

### MongoDB funcionando:
```bash
mongosh
use glitter
db.users.find()
```

---

## 🐛 Problemas Comunes

### MongoDB no se conecta

**Windows:** 📖 Lee [MongoDB en Windows](MONGODB-WINDOWS.md)

```bash
# Verificar
mongosh

# Si no funciona, iniciar manualmente
mongod --dbpath="C:\data\db"  # Windows
mongod --dbpath=/usr/local/var/mongodb  # Mac/Linux
```

### Puerto ocupado

**Windows:**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### Más problemas
📖 Ver [Solución de Problemas](TROUBLESHOOTING.md)

---

## 📚 Siguientes Pasos

- 📖 [Instalación Detallada](INSTALACION.md)
- 🏗️ [Arquitectura del Sistema](ARQUITECTURA.md)
- 📡 [Documentación de la API](API.md)

---

[← Volver al README](../README.md)

