@echo off
chcp 65001 >nul
set "PATH=%ProgramFiles%\nodejs;%PATH%"
cd /d "%~dp0"

echo === Деплой на Vercel ===
call npm run build
if errorlevel 1 exit /b 1

call npx vercel deploy --prod --yes
pause
