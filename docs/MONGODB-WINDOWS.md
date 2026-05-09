# 🗄️ Guía de MongoDB para Windows

## 🔍 Verificar si MongoDB está instalado

### Opción 1: Verificar el servicio

Abre **PowerShell** y ejecuta:

```powershell
Get-Service -Name MongoDB*
```

Deberías ver algo como:
```
Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB Server
```

### Opción 2: Verificar la instalación

```powershell
# Buscar MongoDB en archivos de programa
Test-Path "C:\Program Files\MongoDB"
```

Si devuelve `True`, MongoDB está instalado.

### Opción 3: Verificar desde CMD

```cmd
sc query MongoDB
```

---

## ✅ Iniciar MongoDB

### Método 1: Como Servicio (Recomendado)

**PowerShell como Administrador:**

```powershell
# Iniciar servicio
net start MongoDB

# O con el nombre completo
net start "MongoDB Server"
```

**Verificar que está corriendo:**

```powershell
Get-Service -Name MongoDB
```

### Método 2: Manual (Si no está como servicio)

1. **Crear carpeta de datos** (si no existe):

```powershell
mkdir C:\data\db
```

2. **Iniciar MongoDB manualmente:**

```powershell
# Busca donde está instalado MongoDB
cd "C:\Program Files\MongoDB\Server\6.0\bin"

# O la versión que tengas instalada
cd "C:\Program Files\MongoDB\Server\5.0\bin"
cd "C:\Program Files\MongoDB\Server\4.4\bin"

# Iniciar MongoDB
.\mongod.exe --dbpath="C:\data\db"
```

**Deja esta ventana abierta** mientras trabajas con Glitter.

---

## 🐛 Solución de Problemas

### Problema 1: "MongoDB no está instalado"

**Solución: Instalar MongoDB**

1. **Descargar MongoDB Community Server:**
   - Ve a: https://www.mongodb.com/try/download/community
   - Selecciona: Windows, MSI
   - Descarga la última versión

2. **Instalar:**
   - Ejecuta el instalador
   - Selecciona "Complete"
   - **IMPORTANTE:** Marca "Install MongoDB as a Service"
   - Marca "Install MongoDB Compass" (opcional, pero útil)

3. **Verificar instalación:**

```powershell
mongod --version
```

### Problema 2: "El servicio MongoDB no existe"

**Solución: Instalar MongoDB como servicio**

**PowerShell como Administrador:**

```powershell
# Navega a la carpeta de MongoDB
cd "C:\Program Files\MongoDB\Server\6.0\bin"

# Crea la carpeta de datos
mkdir C:\data\db
mkdir C:\data\log

# Instala el servicio
.\mongod.exe --install --serviceName "MongoDB" --serviceDisplayName "MongoDB Server" --dbpath "C:\data\db" --logpath "C:\data\log\mongod.log"

# Inicia el servicio
net start MongoDB
```

### Problema 3: "mongosh: command not found"

**Causa:** No tienes MongoDB Shell instalado o no está en el PATH.

**Solución 1: Instalar MongoDB Shell**

1. Descarga desde: https://www.mongodb.com/try/download/shell
2. Instala el MSI
3. Reinicia tu terminal

**Solución 2: Usar mongo (versión antigua)**

Si tienes MongoDB 4.x o anterior, usa `mongo` en lugar de `mongosh`:

```cmd
mongo --version
```

**Solución 3: Agregar al PATH**

**PowerShell como Administrador:**

```powershell
# Agregar MongoDB al PATH
$env:Path += ";C:\Program Files\MongoDB\Server\6.0\bin"

# Hacer permanente
[Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::Machine)
```

Reinicia tu terminal después de esto.

### Problema 4: "Access denied" al iniciar servicio

**Causa:** No tienes permisos de administrador.

**Solución:**

1. Cierra tu terminal actual
2. Busca "PowerShell" o "CMD" en el menú inicio
3. Click derecho → "Ejecutar como administrador"
4. Ejecuta: `net start MongoDB`

### Problema 5: MongoDB no se conecta desde Glitter

**Verificar que MongoDB está escuchando:**

```powershell
netstat -ano | findstr :27017
```

Deberías ver algo como:
```
TCP    0.0.0.0:27017          0.0.0.0:0              LISTENING       1234
```

Si no ves nada, MongoDB no está corriendo.

**Verificar conexión:**

```powershell
# Con mongosh
mongosh

# O con mongo
mongo
```

Si te conectas correctamente, verás:
```
MongoDB shell version v6.0.x
connecting to: mongodb://127.0.0.1:27017
```

---

## 🎯 Configuración Recomendada

### Para Desarrollo

**Configurar MongoDB para iniciar automáticamente:**

**PowerShell como Administrador:**

```powershell
# Configurar inicio automático
Set-Service -Name MongoDB -StartupType Automatic

# Iniciar ahora
Start-Service -Name MongoDB

# Verificar
Get-Service -Name MongoDB
```

---

## 🔧 Comandos Útiles

### Gestión del Servicio

```powershell
# Iniciar
net start MongoDB
Start-Service -Name MongoDB

# Detener
net stop MongoDB
Stop-Service -Name MongoDB

# Reiniciar
Restart-Service -Name MongoDB

# Ver estado
Get-Service -Name MongoDB

# Ver todos los servicios de MongoDB
Get-Service -Name MongoDB*
```

### Verificar MongoDB

```powershell
# Conectar a MongoDB
mongosh
# o
mongo

# Ver versión
mongod --version

# Ver procesos
Get-Process -Name mongod
```

### Limpiar y Reiniciar

```powershell
# Detener MongoDB
net stop MongoDB

# Limpiar logs (opcional)
Remove-Item "C:\data\log\*" -Force

# Iniciar MongoDB
net start MongoDB
```

---

## 📊 Verificación Completa

Ejecuta estos comandos para verificar todo:

```powershell
# 1. Verificar instalación
mongod --version

# 2. Verificar servicio
Get-Service -Name MongoDB

# 3. Verificar puerto
netstat -ano | findstr :27017

# 4. Conectar
mongosh
# Dentro de mongosh:
show dbs
exit
```

Si todos estos comandos funcionan, MongoDB está correctamente configurado.

---

## 🚀 Iniciar Glitter después de configurar MongoDB

Una vez que MongoDB esté corriendo:

### Opción 1: Script mejorado

```cmd
start-dev.bat
```

### Opción 2: Script simple (sin verificación)

```cmd
start-dev-simple.bat
```

### Opción 3: Manual

**Terminal 1:**
```cmd
cd Glitter-api
pnpm install
pnpm run init-db
pnpm start
```

**Terminal 2:**
```cmd
cd Glitter-Vue
pnpm install
pnpm dev
```

---

## 💡 Consejos

1. **Siempre ejecuta PowerShell como Administrador** para gestionar servicios
2. **Deja MongoDB corriendo** mientras desarrollas
3. **Usa MongoDB Compass** para visualizar los datos (GUI)
4. **Configura inicio automático** para no tener que iniciarlo manualmente

---

## 🆘 Ayuda Adicional

Si nada de esto funciona:

1. **Desinstala MongoDB completamente:**
   - Panel de Control → Programas → Desinstalar
   - Elimina carpetas: `C:\Program Files\MongoDB` y `C:\data`

2. **Reinstala MongoDB:**
   - Descarga el instalador MSI
   - Instala como servicio
   - Verifica con `Get-Service -Name MongoDB`

3. **Verifica firewall:**
   - Windows Defender puede estar bloqueando el puerto 27017

---

## 📞 Recursos

- **Documentación oficial:** https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
- **MongoDB Compass:** https://www.mongodb.com/products/compass
- **MongoDB Shell:** https://www.mongodb.com/try/download/shell

---

**¡Buena suerte! 🚀**

