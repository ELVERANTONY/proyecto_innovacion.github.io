// JavaScript específico para la página de Semana 04
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

    // Aplicar animaciones a los pasos y tarjetas
    const animatedElements = document.querySelectorAll('.step-item, .evidence-item, .spec-card, .lesson-card');
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

    // Efecto de zoom en las imágenes de pasos
    const stepImages = document.querySelectorAll('.step-image img');
    stepImages.forEach(img => {
        img.addEventListener('click', function() {
            // Crear modal para ver imagen en grande
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
            
            // Cerrar modal al hacer clic
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
            
            // Si contiene números, animar el conteo
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

    // Efecto parallax para las imágenes de evidencia
    const evidenceItems = document.querySelectorAll('.evidence-item');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        evidenceItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const speed = 0.1 + (index * 0.05);
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const img = item.querySelector('img');
                if (img) {
                    img.style.transform = `translateY(${scrolled * speed}px)`;
                }
            }
        });
    });

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

    // Interactividad para las lecciones aprendidas
    const lessonCards = document.querySelectorAll('.lesson-card');
    lessonCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.borderColor = 'var(--accent-primary)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.borderColor = 'var(--border)';
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

    console.log('Semana 04 - Aplicación inicializada correctamente');
});
