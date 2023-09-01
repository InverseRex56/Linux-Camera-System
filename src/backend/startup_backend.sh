#!/bin/bash

# Specify the path to your project directory
projectDir="C:\Users\chris\OneDrive\Documents\GitHub\Senior_Design\src\backend"

# Check if the project directory exists
if (-not (Test-Path -Path $projectDir -PathType Container)) {
    Write-Host "Project directory not found: $projectDir"
    exit 1
}

# Open a new PowerShell terminal, change to the project directory, and run docker-compose
Start-Process powershell -ArgumentList "-NoExit -Command `"`cd '$projectDir'; docker-compose up --build`""
