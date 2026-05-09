@echo off
echo ========================================
echo   GLITTER - Inicio de Desarrollo
echo ========================================
echo.

REM Verificar si MongoDB está corriendo
echo [1/4] Verificando MongoDB...

REM Intentar con mongosh primero
mongosh --eval "db.version()" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] MongoDB ya está corriendo
    goto mongodb_ok
)

REM Intentar con mongo (versión antigua)
mongo --eval "db.version()" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] MongoDB ya está corriendo
    goto mongodb_ok
)

REM MongoDB no responde, intentar iniciar el servicio
echo [!] MongoDB no responde. Intentando iniciar el servicio...
net start MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Servicio MongoDB iniciado
    timeout /t 2 /nobreak >nul
    goto mongodb_ok
)

REM Intentar con nombre alternativo del servicio
net start "MongoDB Server" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Servicio MongoDB iniciado
    timeout /t 2 /nobreak >nul
    goto mongodb_ok
)

REM No se pudo iniciar MongoDB
echo.
echo [ADVERTENCIA] No se pudo verificar/iniciar MongoDB automaticamente.
echo.
echo Por favor, verifica manualmente:
echo   1. Abre PowerShell como Administrador
echo   2. Ejecuta: net start MongoDB
echo   3. O ejecuta: mongod --dbpath="C:\data\db"
echo.
echo Si MongoDB ya esta corriendo, puedes continuar de todas formas.
echo.
choice /C SN /M "Continuar de todas formas (S/N)"
if errorlevel 2 exit /b 1

:mongodb_ok

echo.
echo [2/4] Iniciando Backend (Puerto 3000)...
start "Glitter API" cmd /k "cd Glitter-api && pnpm start"

timeout /t 3 /nobreak >nul

echo.
echo [3/4] Iniciando Frontend (Puerto 8080)...
start "Glitter Vue" cmd /k "cd Glitter-Vue && pnpm dev"

echo.
echo [4/4] Abriendo navegador...
timeout /t 5 /nobreak >nul
start http://localhost:8080

echo.
echo ========================================
echo   Glitter está corriendo!
echo ========================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:8080
echo.
echo Presiona cualquier tecla para cerrar esta ventana
echo (Los servidores seguirán corriendo en sus propias ventanas)
pause >nul

