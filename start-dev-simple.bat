@echo off
echo ========================================
echo   GLITTER - Inicio de Desarrollo
echo   (Version Simple - Sin verificar MongoDB)
echo ========================================
echo.

echo IMPORTANTE: Asegurate de que MongoDB este corriendo antes de continuar.
echo.
echo Para iniciar MongoDB manualmente:
echo   - PowerShell (Admin): net start MongoDB
echo   - O ejecuta: mongod --dbpath="C:\data\db"
echo.
pause

echo.
echo [1/3] Iniciando Backend (Puerto 3000)...
start "Glitter API" cmd /k "cd Glitter-api && npm start"

timeout /t 3 /nobreak >nul

echo.
echo [2/3] Iniciando Frontend (Puerto 8080)...
start "Glitter Vue" cmd /k "cd Glitter-Vue && npm run serve"

echo.
echo [3/3] Abriendo navegador...
timeout /t 5 /nobreak >nul
start http://localhost:8080

echo.
echo ========================================
echo   Glitter esta corriendo!
echo ========================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:8080
echo.
echo Presiona cualquier tecla para cerrar esta ventana
echo (Los servidores seguiran corriendo en sus propias ventanas)
pause >nul

