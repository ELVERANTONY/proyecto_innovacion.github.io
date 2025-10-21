// JavaScript específico para la página de Innovación Tecnológica
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

    // Aplicar animaciones a los elementos
    const animatedElements = document.querySelectorAll('.tech-category, .impact-card, .timeline-item, .spec-category, .award-card, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animación secuencial para la línea de tiempo
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.animation = 'slideInFromLeft 0.6s ease forwards';
            }, index * 200);
        });
    }

    // Activar animación secuencial cuando la línea de tiempo sea visible
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTimeline();
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const timelineSection = document.querySelector('.vision-timeline');
    if (timelineSection) {
        timelineObserver.observe(timelineSection);
    }

    // Efecto de escritura para la visión de innovación
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

    // Activar efecto de escritura cuando la visión sea visible
    const visionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const paragraph = entry.target.querySelector('p');
                const originalText = paragraph.textContent;
                typeWriter(paragraph, originalText, 30);
                visionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const innovationOverview = document.querySelector('.innovation-overview');
    if (innovationOverview) {
        visionObserver.observe(innovationOverview);
    }

    // Interactividad para las tarjetas de impacto
    const impactCards = document.querySelectorAll('.impact-card');
    impactCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover clase activa de otros elementos
            impactCards.forEach(el => el.classList.remove('active'));
            
            // Agregar clase activa al elemento clickeado
            this.classList.add('active');
            
            // Agregar efecto visual
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Efecto de rotación 3D en los íconos de tecnología
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(360deg)';
            this.style.transition = 'transform 0.6s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0deg)';
        });
    });

    // Efecto de contador para las especificaciones
    function animateSpecs() {
        const specLists = document.querySelectorAll('.spec-category ul');
        
        specLists.forEach(list => {
            const items = list.querySelectorAll('li');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 100);
            });
        });
    }

    // Activar animación de especificaciones cuando sea visible
    const specsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSpecs();
                specsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const specsSection = document.querySelector('.tech-specs');
    if (specsSection) {
        specsObserver.observe(specsSection);
    }

    // Agregar estilos de animación
    if (!document.querySelector('#innovation-animations')) {
        const style = document.createElement('style');
        style.id = 'innovation-animations';
        style.textContent = `
            @keyframes slideInFromLeft {
                0% {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                100% {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            .timeline-year {
                transition: transform 0.3s ease;
            }
            
            .timeline-item:hover .timeline-year {
                transform: scale(1.1) rotate(5deg);
            }
            
            .impact-card.active {
                border-color: var(--accent-primary);
                box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
            }
        `;
        document.head.appendChild(style);
    }

    // Efecto de partículas de innovación (opcional)
    function createInnovationParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'innovation-particles';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particleContainer);
        
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--accent-primary);
                border-radius: 50%;
                opacity: 0.3;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: innovation-particle ${6 + Math.random() * 8}s infinite linear;
            `;
            
            particleContainer.appendChild(particle);
        }
        
        // Agregar animación CSS
        if (!document.querySelector('#innovation-particle-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'innovation-particle-styles';
            styleSheet.textContent = `
                @keyframes innovation-particle {
                    0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
                    10% { opacity: 0.3; }
                    90% { opacity: 0.3; }
                    100% { transform: translateY(-100px) translateX(${Math.random() * 300 - 150}px) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }

    // Activar partículas de innovación solo en desktop
    if (window.innerWidth > 768) {
        createInnovationParticles();
    }

    console.log('Innovación Tecnológica - Aplicación inicializada correctamente');
});
