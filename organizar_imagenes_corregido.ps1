$filePath = "semana02/index.html"
$imagesPath = "c:/ANTONY2025/C4/INNOVACION/Proyecto/images/SEMANA02"

# Obtener todas las imágenes de la semana 2
$images = Get-ChildItem -Path $imagesPath -Filter "*.png" | Sort-Object Name

# Crear sección de galería
$gallerySection = @"
            <!-- Galería de Imágenes del Proceso de Diseño -->
            <section class="content-section">
                <h2>Galería del Proceso de Diseño</h2>
                <div class="gallery-container">
                    <div class="gallery-grid">
"@

# Agregar cada imagen a la galería
foreach ($img in $images) {
    $imgName = [System.IO.Path]::GetFileNameWithoutExtension($img.Name)
    $imgName = $imgName -replace '\s*\(\d+\)$', ''  # Eliminar números entre paréntesis al final
    $imgPath = $img.FullName.Replace('\', '/')
    $imgPath = "../" + ($imgPath -split 'Proyecto/')[1]  # Hacer la ruta relativa
    
    $gallerySection += @"
                        <div class="gallery-item">
                            <div class="gallery-img-container">
                                <img src="$imgPath" alt="$imgName" class="gallery-image">
                            </div>
                            <div class="gallery-caption">$imgName</div>
                        </div>
"@
}

# Cerrar la sección de galería
$gallerySection += @"
                    </div>
                </div>
            </section>
"@

# Leer el contenido actual del archivo
$content = Get-Content -Path $filePath -Raw

# Insertar la galería después de la sección de resultados
$content = $content -replace '(?s)(<\/main>)', "$gallerySection`$1"

# Agregar estilos CSS
$css = @"

/* Estilos para la galería */
.gallery-container {
    width: 100%;
    margin: 2rem 0;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 15px;
}

.gallery-item {
    background: var(--surface);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border);
}

.gallery-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.gallery-img-container {
    width: 100%;
    height: 250px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
}

.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
    cursor: pointer;
}

.gallery-item:hover .gallery-image {
    transform: scale(1.05);
}

.gallery-caption {
    padding: 15px;
    text-align: center;
    font-size: 0.9rem;
    color: var(--text-secondary);
    background: var(--surface);
    border-top: 1px solid var(--border);
}

/* Estilos para el modal */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    overflow: auto;
    justify-content: center;
    align-items: flex-start;
    padding-top: 50px;
}

.modal-content {
    max-width: 90%;
    max-height: 80vh;
    object-fit: contain;
}

.close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    z-index: 1001;
}

/* Estilos para móviles */
@media (max-width: 768px) {
    .gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
    
    .gallery-img-container {
        height: 200px;
    }
    
    .modal-content {
        max-width: 95%;
        max-height: 70vh;
    }
}
"@

# Agregar el CSS al final del head
$content = $content -replace '(?s)(<\/style>)', "`$1`n$css"

# Agregar el script para el modal
$script = @"

<script>
// Script para el modal de la galería
document.addEventListener('DOMContentLoaded', function() {
    // Crear el modal
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="close">&times;</span>
        <img class="modal-content" id="modalImage">
    `;
    document.body.appendChild(modal);

    // Obtener todas las imágenes de la galería
    const images = document.querySelectorAll('.gallery-image');
    const modalImg = document.getElementById('modalImage');
    const modalContainer = document.getElementById('imageModal');
    const span = document.getElementsByClassName('close')[0];

    // Agregar evento de clic a cada imagen
    images.forEach(img => {
        img.addEventListener('click', function() {
            modalContainer.style.display = 'flex';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
    });

    // Cerrar el modal
    function closeModal() {
        modalContainer.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }

    // Cerrar el modal al hacer clic en la X
    span.onclick = closeModal;

    // Cerrar el modal al hacer clic fuera de la imagen
    window.onclick = function(event) {
        if (event.target == modalContainer) {
            closeModal();
        }
    }
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});
</script>
"@

# Agregar el script antes de cerrar el body
$content = $content -replace '(?s)(<\/body>)', "$script`$1"

# Guardar los cambios
$content | Set-Content -Path $filePath -NoNewline -Encoding UTF8

Write-Host "Galería de imágenes agregada exitosamente al archivo $filePath"
