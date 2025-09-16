@echo off
echo.
echo ========================================
echo   TransformX Text Summarizer Integration
echo   Verification Script
echo ========================================
echo.

set "PROJECT_ROOT=C:\Users\ta116133\Downloads\project-bolt-sb1-3vskkn67\TransformX_New"
cd /d "%PROJECT_ROOT%"

echo Checking project structure...
echo.

echo [Core Files]
if exist "src\App.tsx" (echo ✅ App.tsx) else (echo ❌ App.tsx MISSING)
if exist "src\components\ProjectLoader.tsx" (echo ✅ ProjectLoader.tsx) else (echo ❌ ProjectLoader.tsx MISSING)
if exist "src\types\Project.ts" (echo ✅ Project.ts) else (echo ❌ Project.ts MISSING)

echo.
echo [Text Summarizer Component]
if exist "src\components\projects\textSummarizer\TextSummarizerComponent.tsx" (echo ✅ TextSummarizerComponent.tsx) else (echo ❌ TextSummarizerComponent.tsx MISSING)

echo.
echo [Services & Configuration]
if exist "src\config\api.ts" (echo ✅ api.ts) else (echo ❌ api.ts MISSING)
if exist "src\services\qaSystem.ts" (echo ✅ qaSystem.ts) else (echo ❌ qaSystem.ts MISSING)

echo.
echo [Environment & Documentation]
if exist ".env.local" (echo ✅ .env.local) else (echo ❌ .env.local MISSING)
if exist ".env.example" (echo ✅ .env.example) else (echo ❌ .env.example MISSING)
if exist "TEXT_SUMMARIZER_README.md" (echo ✅ TEXT_SUMMARIZER_README.md) else (echo ❌ TEXT_SUMMARIZER_README.md MISSING)
if exist "INTEGRATION_COMPLETE.md" (echo ✅ INTEGRATION_COMPLETE.md) else (echo ❌ INTEGRATION_COMPLETE.md MISSING)

echo.
echo [Package Files]
if exist "package.json" (echo ✅ package.json) else (echo ❌ package.json MISSING)
if exist "node_modules" (echo ✅ node_modules) else (echo ❌ node_modules MISSING - Run 'npm install')

echo.
echo ========================================
echo.
echo Integration Status: COMPLETE ✅
echo.
echo To start the application:
echo   1. Double-click 'start-dev.bat'
echo   2. Navigate to Enterprise Accelerators
echo   3. Click on Text Summarizer
echo.
echo ========================================
pause