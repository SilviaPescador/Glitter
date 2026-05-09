#!/bin/bash

echo "========================================"
echo "  GLITTER - Inicio de Desarrollo"
echo "========================================"
echo ""

# Verificar si MongoDB está corriendo
echo "[1/4] Verificando MongoDB..."
if mongosh --eval "db.version()" > /dev/null 2>&1; then
    echo "[OK] MongoDB ya está corriendo"
else
    echo "[!] MongoDB no está corriendo. Iniciando..."
    
    # Detectar sistema operativo
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew services start mongodb-community
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo systemctl start mongod
    fi
    
    sleep 2
    
    if mongosh --eval "db.version()" > /dev/null 2>&1; then
        echo "[OK] MongoDB iniciado correctamente"
    else
        echo "[ERROR] No se pudo iniciar MongoDB."
        echo "Por favor, inicia MongoDB manualmente."
        exit 1
    fi
fi

echo ""
echo "[2/4] Iniciando Backend (Puerto 3000)..."
cd Glitter-api
gnome-terminal -- bash -c "pnpm start; exec bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && pnpm start"' 2>/dev/null || \
xterm -e "pnpm start" &
cd ..

sleep 3

echo ""
echo "[3/4] Iniciando Frontend (Puerto 8080)..."
cd Glitter-Vue
gnome-terminal -- bash -c "pnpm dev; exec bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && pnpm dev"' 2>/dev/null || \
xterm -e "pnpm dev" &
cd ..

echo ""
echo "[4/4] Esperando a que los servidores inicien..."
sleep 5

# Abrir navegador
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:8080
elif command -v open > /dev/null; then
    open http://localhost:8080
fi

echo ""
echo "========================================"
echo "  Glitter está corriendo!"
echo "========================================"
echo ""
echo "Backend:  http://localhost:3000"
echo "Frontend: http://localhost:8080"
echo ""

