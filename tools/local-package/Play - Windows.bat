@echo off
title Engineering Academy
rem Engineering Academy — double-click to play. Starts a tiny local server
rem (built-in Windows PowerShell, nothing to install) and opens your browser.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0launcher\serve.ps1"
if errorlevel 1 pause
