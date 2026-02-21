# Simple Push Script
Write-Host "Getting ready to push to GitHub..." -ForegroundColor Cyan
Write-Host "Remote: https://github.com/arunyadav1511/portfolio"

Write-Host "`nIMPORTANT: A window should pop up asking you to sign in to GitHub." -ForegroundColor Yellow
Write-Host "Please sign in with your browser if asked." -ForegroundColor Yellow

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccess! Website deployed." -ForegroundColor Green
}
else {
    Write-Host "`nPush failed. Please check your internet or credentials." -ForegroundColor Red
}

Read-Host "Press Enter to close..."
