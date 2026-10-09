@echo off
title Portfolio - Systems & Engineering Showcase
cd /d "%~dp0"

echo ========================================================
echo   Starting Portfolio Webapp (Sumit Gupta)
echo ========================================================
echo.

:: Check dependencies
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing dependencies via pnpm...
    call pnpm install
    if errorlevel 1 (
        echo [WARN] pnpm install encountered an issue, trying npm install...
        call npm install
    )
)

:: Open browser after 2 seconds
echo [INFO] Opening default browser at http://localhost:3000 ...
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3000"

:: Start Next.js development server
echo [INFO] Starting Next.js development server...
echo [INFO] Press Ctrl+C in this window to stop the server.
echo.

where pnpm >nul 2>nul
if %errorlevel% equ 0 (
    call pnpm dev
) else (
    echo [INFO] pnpm not found in PATH, falling back to npm...
    call npm run dev
)

if errorlevel 1 (
    echo.
    echo [ERROR] Development server exited with an error.
    pause
)
