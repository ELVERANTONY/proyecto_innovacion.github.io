$filePath = "semana02/index.html"
$backupPath = "$filePath.bak4"

# Hacer una copia de seguridad
Copy-Item -Path $filePath -Destination $backupPath -Force

# Leer el contenido con la codificación correcta
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::GetEncoding(1252))

# Guardar con codificación UTF-8 sin BOM
[System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($false))

Write-Host "Archivo corregido exitosamente. Se creó una copia de seguridad en $backupPath"
