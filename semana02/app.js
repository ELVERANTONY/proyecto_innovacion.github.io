// JavaScript específico para la página de Semana 02
document.addEventListener('DOMContentLoaded', function() {
    
    // Animaciones de entrada para las secciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animaciones a las tarjetas
    const animatedElements = document.querySelectorAll('.reto-card, .team-member, .idea-item, .feature-item, .swot-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efecto hover mejorado para las tarjetas de retos
    const retoCards = document.querySelectorAll('.reto-card');
    retoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.borderColor = 'var(--accent-primary)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.borderColor = 'var(--border)';
            }
        });
    });

    // Animación de conteo para las estadísticas
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/\d/g, '');
            
            if (number) {
                let current = 0;
                const increment = number / 30;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        stat.textContent = number + suffix;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, 50);
            }
        });
    }

    // Activar animación de estadísticas cuando sea visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statisticsSection = document.querySelector('.statistics');
    if (statisticsSection) {
        statsObserver.observe(statisticsSection);
    }

    // Efecto de resaltado para la solución seleccionada
    const selectedItems = document.querySelectorAll('.selected');
    selectedItems.forEach(item => {
        item.style.animation = 'pulse 2s infinite';
    });

    // Agregar estilos de animación
    if (!document.querySelector('#pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = `
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
                70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
            }
        `;
        document.head.appendChild(style);
    }

    // Efecto de escritura para el insight principal
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Activar efecto de escritura cuando el insight sea visible
    const insightObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const blockquote = entry.target.querySelector('blockquote');
                const originalText = blockquote.textContent;
                typeWriter(blockquote, originalText, 30);
                insightObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const insightCard = document.querySelector('.insight-card');
    if (insightCard) {
        insightObserver.observe(insightCard);
    }

    // Interactividad para las características del BioGrip
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Remover clase activa de otros elementos
            featureItems.forEach(el => el.classList.remove('active'));
            
            // Agregar clase activa al elemento clickeado
            this.classList.add('active');
            
            // Agregar efecto visual
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Efecto de parallax suave para las imágenes de galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        galleryItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const speed = 0.1 + (index * 0.05);
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                item.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    });

    // Función para mostrar tooltips en las características
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.parentElement.querySelector('h4').textContent;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--bg-primary);
                color: var(--text-primary);
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.875rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s ease;
                border: 1px solid var(--border);
                box-shadow: var(--shadow);
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
        });
        
        icon.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    console.log('Semana 02 - Aplicación inicializada correctamente');
});
