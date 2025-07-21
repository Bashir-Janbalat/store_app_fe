@echo off
setlocal

echo Stopping and removing old containers...
docker-compose -f docker-compose.store_app_fe.yml down

echo Removing old images (optional)...
docker image prune -f

echo Building and starting React frontend (Production Mode) on port 4000...
docker-compose -f docker-compose.local.store_app_fe.yml up --build -d
IF %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] docker-compose konnte nicht gestartet werden.
    exit /b %ERRORLEVEL%
)

timeout /t 3 > nul
start http://localhost:4000

echo Frontend läuft auf http://localhost:4000
endlocal
pause
