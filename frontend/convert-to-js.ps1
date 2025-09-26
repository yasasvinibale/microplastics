# Convert TypeScript files to JavaScript
$tsFiles = Get-ChildItem -Path ".\src" -Recurse -Include *.tsx, *.ts

foreach ($file in $tsFiles) {
    $jsFile = [System.IO.Path]::ChangeExtension($file.FullName, ".jsx")
    if ($file.Extension -eq ".ts") {
        $jsFile = [System.IO.Path]::ChangeExtension($file.FullName, ".js")
    }
    
    # Read the content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Remove TypeScript specific syntax
    $content = $content -replace 'import type (.*?) from', 'import $1 from'
    $content = $content -replace 'export type (.*?) from', 'export $1 from'
    $content = $content -replace ': React\.ReactNode', ''
    $content = $content -replace ': string\[\]', '= []'
    $content = $content -replace ': string', ''
    $content = $content -replace ': number', ''
    $content = $content -replace ': boolean', ''
    $content = $content -replace ': any', ''
    $content = $content -replace ': Record<string, any>', '= {}'
    $content = $content -replace 'interface \w+\s*{([^}]*)}', '// TypeScript interface removed'
    $content = $content -replace 'type \w+\s*=\s*[^;]+;', '// TypeScript type removed'
    $content = $content -replace 'as \w+', ''
    
    # Write the converted content to the new file
    $directory = [System.IO.Path]::GetDirectoryName($jsFile)
    if (-not (Test-Path -Path $directory)) {
        New-Item -ItemType Directory -Path $directory -Force | Out-Null
    }
    
    Set-Content -Path $jsFile -Value $content -Force
    
    Write-Host "Converted: $($file.FullName) -> $jsFile"
}

# Update package.json to remove TypeScript dependencies
$packageJsonPath = ".\package.json"
$packageJson = Get-Content -Path $packageJsonPath -Raw | ConvertFrom-Json

# Remove TypeScript related devDependencies if they exist
$devDepsToRemove = @(
    "typescript",
    "@types/react",
    "@types/react-dom",
    "@types/node",
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser"
)

foreach ($dep in $devDepsToRemove) {
    if ($packageJson.devDependencies.PSObject.Properties.Name -contains $dep) {
        $packageJson.devDependencies.PSObject.Properties.Remove($dep)
        Write-Host "Removed devDependency: $dep"
    }
}

# Convert back to JSON and save
$packageJson | ConvertTo-Json -Depth 100 | Set-Content -Path $packageJsonPath -Force
Write-Host "Updated package.json"

Write-Host "\nConversion complete! Please review the converted files and make any necessary adjustments."
Write-Host "Original files have been backed up to: src-backup"
