# Fix Authentication Script
Write-Host "Fixing GitHub permissions..." -ForegroundColor Cyan

# Force the correct username in the URL
git remote set-url origin https://arunyadav1511@github.com/arunyadav1511/portfolio.git

Write-Host "Clearing old credentials..."
# Attempt to use specific username context
$env:GCM_INTERACTIVE = "always"

Write-Host "Pushing as user: arunyadav1511..."
Write-Host "Please sign in as 'arunyadav1511' in the browser window if it pops up." -ForegroundColor Yellow

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccess! Connected and pushed." -ForegroundColor Green
}
else {
    Write-Host "`nStill failed. You might need to sign out of GitHub in your default browser first." -ForegroundColor Red
}

Read-Host "Press Enter..."
