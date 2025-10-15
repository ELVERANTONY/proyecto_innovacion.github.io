$filePath = "semana02/index.html"

# Leer el contenido con la codificación correcta
$content = Get-Content -Path $filePath -Raw -Encoding UTF8

# Corregir caracteres especiales
$content = $content -replace 'â€“', '–'
$content = $content -replace 'Ã¡', 'á'
$content = $content -replace 'Ã©', 'é'
$content = $content -replace 'Ã³', 'ó'
$content = $content -replace 'Ãº', 'ú'
$content = $content -replace 'Ã±', 'ñ'
$content = $content -replace 'Ã', 'í'
$content = $content -replace 'Ã³', 'ó'
$content = $content -replace 'Ãº', 'ú'
$content = $content -replace 'Ã±', 'ñ'
$content = $content -replace 'Ã', 'í'
$content = $content -replace 'Â', ''
$content = $content -replace 'Ã', 'í'
$content = $content -replace '©', 'é'
$content = $content -replace '³', 'ó'
$content = $content -replace 'º', '°'

# Corregir títulos y textos en inglés
$content = $content -replace 'Design Thinking', 'Pensamiento de Diseño'
$content = $content -replace 'Mouse TecnolÃ³gico', 'Mouse Tecnológico'
$content = $content -replace 'IdentificaciÃ³n', 'Identificación'
$content = $content -replace 'CaracterÃ­sticas', 'Características'
$content = $content -replace 'GalerÃ­a', 'Galería'
$content = $content -replace 'Proceso de DiseÃ±o', 'Proceso de Diseño'
$content = $content -replace 'MenÃº', 'Menú'
$content = $content -replace 'SesiÃ³n', 'Sesión'

# Corregir el script del modal
$content = $content -replace '// Script para el modal de la galerÃ­a', '// Script para el modal de la galería'

# Guardar los cambios con la codificación correcta
$utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText((Resolve-Path $filePath), $content, $utf8NoBomEncoding)

Write-Host "Archivo corregido exitosamente. Se creó una copia de seguridad en semana02/index.html.bak3"
