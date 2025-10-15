// JavaScript específico para la página de Semana 06
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
    const animatedElements = document.querySelectorAll('.process-card, .joint-card, .step-item, .evidence-item, .spec-card, .lesson-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animación secuencial para los pasos
    function animateStepsSequentially() {
        const steps = document.querySelectorAll('.step-item');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
                step.style.animation = 'slideInFromLeft 0.6s ease forwards';
            }, index * 200);
        });
    }

    // Activar animación secuencial cuando los pasos sean visibles
    const stepsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStepsSequentially();
                stepsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const stepContainer = document.querySelector('.step-container');
    if (stepContainer) {
        stepsObserver.observe(stepContainer);
    }

    // Efecto de zoom en las imágenes
    const images = document.querySelectorAll('.step-image img, .evidence-item img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                cursor: pointer;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 12px;
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });

    // Efecto de contador para las especificaciones
    function animateSpecs() {
        const specCards = document.querySelectorAll('.spec-card');
        
        specCards.forEach(card => {
            const specValue = card.querySelector('p');
            const originalText = specValue.textContent;
            
            const numbers = originalText.match(/\d+(\.\d+)?/g);
            if (numbers) {
                const targetNumber = parseFloat(numbers[0]);
                const unit = originalText.replace(/\d+(\.\d+)?/g, '');
                
                let current = 0;
                const increment = targetNumber / 30;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetNumber) {
                        specValue.textContent = targetNumber + unit;
                        clearInterval(timer);
                    } else {
                        specValue.textContent = current.toFixed(1) + unit;
                    }
                }, 50);
            }
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

    const specsSection = document.querySelector('.specs-grid');
    if (specsSection) {
        specsObserver.observe(specsSection);
    }

    // Efecto de resaltado para las tarjetas de proceso
    const processCards = document.querySelectorAll('.process-card');
    processCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.borderColor = 'var(--accent-primary)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.borderColor = 'var(--border)';
        });
    });

    // Efecto de escritura para el contenido teórico
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

    // Activar efecto de escritura cuando el contenido teórico sea visible
    const theoryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const paragraph = entry.target.querySelector('p');
                const originalText = paragraph.textContent;
                typeWriter(paragraph, originalText, 30);
                theoryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const theoryContent = document.querySelector('.theory-content');
    if (theoryContent) {
        theoryObserver.observe(theoryContent);
    }

    // Interactividad para las lecciones aprendidas
    const lessonCards = document.querySelectorAll('.lesson-card');
    lessonCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Remover clase activa de otros elementos
            lessonCards.forEach(el => el.classList.remove('active'));
            
            // Agregar clase activa al elemento clickeado
            this.classList.add('active');
            
            // Agregar efecto visual
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Efecto de rotación 3D en el ícono de la herramienta
    const toolIcon = document.querySelector('.tool-icon');
    if (toolIcon) {
        toolIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(360deg)';
            this.style.transition = 'transform 0.6s ease';
        });
        
        toolIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0deg)';
        });
    }

    // Agregar estilos de animación
    if (!document.querySelector('#step-animations')) {
        const style = document.createElement('style');
        style.id = 'step-animations';
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
            
            .step-number {
                transition: transform 0.3s ease;
            }
            
            .step-item:hover .step-number {
                transform: scale(1.1) rotate(5deg);
            }
            
            .process-icon {
                transition: transform 0.3s ease;
            }
            
            .process-card:hover .process-icon {
                transform: scale(1.2) rotate(10deg);
            }
        `;
        document.head.appendChild(style);
    }

    // Efecto de progreso visual para los pasos
    function updateStepProgress() {
        const steps = document.querySelectorAll('.step-item');
        const stepNumbers = document.querySelectorAll('.step-number');
        
        steps.forEach((step, index) => {
            const rect = step.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                stepNumbers[index].style.background = 'var(--gradient-primary)';
                stepNumbers[index].style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
            } else {
                stepNumbers[index].style.background = 'var(--surface)';
                stepNumbers[index].style.boxShadow = 'none';
            }
        });
    }

    // Actualizar progreso en scroll
    window.addEventListener('scroll', updateStepProgress);
    
    // Inicializar progreso
    updateStepProgress();

    // Efecto de partículas láser (opcional)
    function createLaserParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'laser-particles';
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
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 1px;
                height: 1px;
                background: var(--accent-primary);
                border-radius: 50%;
                opacity: 0.5;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: laser-particle ${3 + Math.random() * 4}s infinite linear;
            `;
            
            particleContainer.appendChild(particle);
        }
        
        // Agregar animación CSS
        if (!document.querySelector('#laser-particle-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'laser-particle-styles';
            styleSheet.textContent = `
                @keyframes laser-particle {
                    0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
                    10% { opacity: 0.5; }
                    90% { opacity: 0.5; }
                    100% { transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }

    // Activar partículas láser solo en desktop
    if (window.innerWidth > 768) {
        createLaserParticles();
    }

    console.log('Semana 06 - Aplicación inicializada correctamente');
});
