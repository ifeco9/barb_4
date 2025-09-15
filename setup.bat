@echo off
echo 🚀 Setting up Barberng PWA...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies.
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Copy environment file
if not exist .env.local (
    echo 📝 Creating environment file...
    copy .env.example .env.local >nul
    echo ✅ Environment file created (.env.local^)
    echo.
    echo ⚠️  IMPORTANT: Please edit .env.local with your Supabase configuration:
    echo    - NEXT_PUBLIC_SUPABASE_URL
    echo    - NEXT_PUBLIC_SUPABASE_ANON_KEY
    echo    - SUPABASE_SERVICE_ROLE_KEY
) else (
    echo ✅ Environment file already exists
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo Next steps:
echo 1. Edit .env.local with your Supabase configuration
echo 2. Set up your database using the schema in database/schema.sql
echo 3. Run 'npm run dev' to start the development server
echo.
echo For detailed instructions, see SETUP.md
echo.
echo Happy coding! 🚀
echo.
pause