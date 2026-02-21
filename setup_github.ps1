# PowerShell script to setup GitHub remote and push
Write-Host "Setting up GitHub Repository for Portfolio Website..." -ForegroundColor Cyan

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
}

# Prompt for the Repository URL
Write-Host "`nPlease create a new repository on GitHub (https://github.com/new) if you haven't already."
Write-Host "Enter your GitHub Repository URL (e.g., https://github.com/arunyadav1511/portfolio.git):" -ForegroundColor Yellow
$repoUrl = Read-Host

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Error "Repository URL cannot be empty."
    exit 1
}

# Add remote
Write-Host "Adding remote origin..."
git remote remove origin 2>$null # Remove if exists to avoid error
git remote add origin $repoUrl

# Push
Write-Host "Pushing code to GitHub..."
git push -u origin main

Write-Host "`nSuccess! Your code has been pushed." -ForegroundColor Green
Write-Host "Now go to your Repository Settings > Pages on GitHub and enable GitHub Pages from the 'main' branch." -ForegroundColor Cyan
Read-Host "Press Enter to exit..."
