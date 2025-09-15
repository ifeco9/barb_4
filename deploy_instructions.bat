@echo off
echo 🚀 Barberng - GitHub Upload & Deploy Script
echo.

echo 📋 Pre-deployment checklist:
echo ✅ .gitignore created
echo ✅ README.md updated  
echo ✅ vercel.json configured
echo ✅ Environment variables ready
echo.

echo 📝 Next steps:
echo.
echo 1️⃣ GITHUB SETUP:
echo    - Create new repository on github.com
echo    - Name it: barberng (or your preferred name)
echo    - Make it PUBLIC for easier deployment
echo    - DON'T initialize with README
echo.
echo 2️⃣ UPLOAD TO GITHUB:
echo    Run these commands in PowerShell:
echo.
echo    git init
echo    git add .
echo    git commit -m "Initial commit - Barberng PWA"
echo    git branch -M main
echo    git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
echo    git push -u origin main
echo.
echo 3️⃣ DEPLOY TO VERCEL:
echo    - Go to vercel.com
echo    - Sign up with GitHub
echo    - Import your barberng repository
echo    - Add environment variables:
echo      • NEXT_PUBLIC_SUPABASE_URL: https://fcqrexzjznmowzjcqvnd.supabase.co
echo      • NEXT_PUBLIC_SUPABASE_ANON_KEY: (from your .env.local file)
echo    - Click Deploy!
echo.
echo 4️⃣ INSTALL ON PHONE:
echo    - Open the live URL on your phone
echo    - iOS Safari: Share → Add to Home Screen
echo    - Android Chrome: Menu → Add to Home Screen
echo.
echo 🎯 READY TO PROCEED?
echo    1. Create your GitHub repository
echo    2. Come back with the repository URL
echo    3. I'll help you upload and deploy!
echo.

pause