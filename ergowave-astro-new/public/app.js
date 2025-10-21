// Funcionalidad básica para el proyecto ErgoWave

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Manejar el toggle de tema
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Guardar preferencia en localStorage
            localStorage.setItem('theme', newTheme);
        });
        
        // Cargar tema guardado
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }
    
    // Manejar menú móvil (si existe)
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Funcionalidad para galerías (si se implementa)
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            // Implementar modal si es necesario
            console.log('Imagen clickeada:', this.src);
        });
    });
});
