@echo off
echo 🚀 Uploading Barberng to GitHub: https://github.com/ifeco9/barb_4
echo.

echo 📁 Current directory: %CD%
echo.

echo 🔧 Initializing Git repository...
git init

echo 📦 Adding all files...
git add .

echo 💾 Creating initial commit...
git commit -m "Initial commit - Barberng PWA with booking system and green theme"

echo 🌿 Setting main branch...
git branch -M main

echo 🔗 Adding remote repository...
git remote add origin https://github.com/ifeco9/barb_4.git

echo 📤 Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Upload complete! 
echo 🔗 Repository: https://github.com/ifeco9/barb_4
echo.
echo 🎯 Next: Deploy to Vercel for live access!
echo.

pause