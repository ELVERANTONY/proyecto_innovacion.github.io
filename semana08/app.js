// JavaScript específico para la página de Semana 08
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
    const animatedElements = document.querySelectorAll('.process-step, .gallery-item, .test-result, .spec-card, .lesson-card, .step-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efecto de zoom en las imágenes de galería
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
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

    // Animación de contador para las especificaciones
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

    // Efecto de escritura para el objetivo
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

    // Activar efecto de escritura cuando el objetivo sea visible
    const objectiveObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const paragraph = entry.target.querySelector('p');
                const originalText = paragraph.textContent;
                typeWriter(paragraph, originalText, 30);
                objectiveObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const objectiveContent = document.querySelector('.objective-content');
    if (objectiveContent) {
        objectiveObserver.observe(objectiveContent);
    }

    // Interactividad para los pasos del proceso
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.borderColor = 'var(--accent-primary)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.borderColor = 'var(--border)';
        });
    });

    // Efecto de resaltado para los resultados de pruebas
    const testResults = document.querySelectorAll('.test-result');
    testResults.forEach(result => {
        result.addEventListener('click', function() {
            // Remover clase activa de otros elementos
            testResults.forEach(el => el.classList.remove('active'));
            
            // Agregar clase activa al elemento clickeado
            this.classList.add('active');
            
            // Agregar efecto visual
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Animación secuencial para los próximos pasos
    function animateNextSteps() {
        const steps = document.querySelectorAll('.step-item');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
                step.style.animation = 'slideInFromLeft 0.6s ease forwards';
            }, index * 300);
        });
    }

    // Activar animación secuencial cuando los próximos pasos sean visibles
    const nextStepsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNextSteps();
                nextStepsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const nextStepsSection = document.querySelector('.next-steps');
    if (nextStepsSection) {
        nextStepsObserver.observe(nextStepsSection);
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

    // Agregar estilos de animación
    if (!document.querySelector('#integration-animations')) {
        const style = document.createElement('style');
        style.id = 'integration-animations';
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
            
            .step-icon {
                transition: transform 0.3s ease;
            }
            
            .process-step:hover .step-icon {
                transform: scale(1.2) rotate(10deg);
            }
            
            .result-icon {
                transition: transform 0.3s ease;
            }
            
            .test-result:hover .result-icon {
                transform: scale(1.2);
            }
        `;
        document.head.appendChild(style);
    }

    // Efecto de partículas de integración (opcional)
    function createIntegrationParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'integration-particles';
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
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: var(--accent-primary);
                border-radius: 50%;
                opacity: 0.4;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: integration-particle ${4 + Math.random() * 6}s infinite linear;
            `;
            
            particleContainer.appendChild(particle);
        }
        
        // Agregar animación CSS
        if (!document.querySelector('#integration-particle-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'integration-particle-styles';
            styleSheet.textContent = `
                @keyframes integration-particle {
                    0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
                    10% { opacity: 0.4; }
                    90% { opacity: 0.4; }
                    100% { transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }

    // Activar partículas de integración solo en desktop
    if (window.innerWidth > 768) {
        createIntegrationParticles();
    }

    console.log('Semana 08 - Aplicación inicializada correctamente');
});
