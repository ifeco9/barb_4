@echo off
echo 🔧 Fixing Vercel deployment configuration...
echo.

echo 📝 The issue was in vercel.json - fixed the runtime configuration
echo ✅ Updated vercel.json with proper Next.js 15 settings
echo.

echo 📤 Pushing fix to GitHub...
echo.

echo Running Git commands:
echo.

git add vercel.json
if %errorlevel% neq 0 (
    echo ❌ Git add failed. Make sure you're in the right directory and Git is installed.
    pause
    exit /b 1
)

git commit -m "Fix vercel.json configuration for Next.js 15 deployment"
if %errorlevel% neq 0 (
    echo ❌ Git commit failed. 
    pause
    exit /b 1
)

git push origin main
if %errorlevel% neq 0 (
    echo ❌ Git push failed.
    pause
    exit /b 1
)

echo.
echo ✅ Fix pushed to GitHub successfully!
echo.
echo 🚀 Next steps:
echo    1. Go to your Vercel dashboard
echo    2. The deployment should automatically restart
echo    3. Or trigger a new deployment manually
echo.
echo 🔗 Your repository: https://github.com/ifeco9/barb_4
echo 📊 Vercel dashboard: https://vercel.com/dashboard
echo.

pause