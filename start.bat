@echo off
chcp 65001 >nul
set "PATH=%ProgramFiles%\nodejs;%PATH%"
echo === Wanda Group Landing — автозапуск ===

where npm >nul 2>&1
if errorlevel 1 (
  echo [1/3] Node.js не найден. Устанавливаю...
  winget install OpenJS.NodeJS.LTS --source winget --accept-package-agreements --accept-source-agreements --silent
  echo.
  echo Node.js установлен. ПЕРЕЗАПУСТИТЕ этот скрипт.
  pause
  exit /b 0
)

echo [1/3] Node.js OK
cd /d "%~dp0"

if not exist node_modules (
  echo [2/3] Устанавливаю зависимости...
  call npm install
) else (
  echo [2/3] Зависимости OK
)

echo [3/3] Запускаю сайт — http://localhost:5173
call npm run dev
