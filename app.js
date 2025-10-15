// App principal para la página de inicio
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.className = 'bi bi-x-lg';
            } else {
                icon.className = 'bi bi-list';
            }
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuToggle.querySelector('i').className = 'bi bi-list';
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                mobileMenuToggle.querySelector('i').className = 'bi bi-list';
            }
        });
    }

    // Toggle del tema
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.dataset.theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
        
        // Cambiar icono del botón
        const icon = themeToggle.querySelector('i');
        if (newTheme === 'light') {
            icon.className = 'bi bi-moon-stars-fill';
        } else {
            icon.className = 'bi bi-sun-fill';
        }
    });

    // Inicializar tema
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.dataset.theme = savedTheme;
        
        const icon = themeToggle.querySelector('i');
        if (savedTheme === 'light') {
            icon.className = 'bi bi-moon-stars-fill';
        } else {
            icon.className = 'bi bi-sun-fill';
        }
    }

    initTheme();

    // Animaciones de entrada para las tarjetas
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

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.stat-card, .team-member, .feature-card, .week-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto parallax suave para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.mouse-3d, .floating-elements .element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Contador animado para las estadísticas
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + (target === 68 ? '%' : target === 6 ? '+' : '%');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + (target === 68 ? '%' : target === 6 ? '+' : '%');
                }
            }, 30);
        });
    }

    // Activar contadores cuando sean visibles
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Efecto hover mejorado para las tarjetas
    const cards = document.querySelectorAll('.stat-card, .team-member, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animación secuencial para las cards de semanas
    function animateWeekCards() {
        const weekCards = document.querySelectorAll('.week-card');
        weekCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.animation = 'slideInFromBottom 0.6s ease forwards';
            }, index * 100);
        });
    }

    // Activar animación secuencial cuando las cards sean visibles
    const weekCardsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateWeekCards();
                weekCardsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const weekCardsSection = document.querySelector('.week-cards-grid');
    if (weekCardsSection) {
        weekCardsObserver.observe(weekCardsSection);
    }

    // Agregar estilos de animación para las cards
    if (!document.querySelector('#week-cards-animations')) {
        const style = document.createElement('style');
        style.id = 'week-cards-animations';
        style.textContent = `
            @keyframes slideInFromBottom {
                0% {
                    opacity: 0;
                    transform: translateY(30px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Efecto de partículas dinámicas mejorado
    function createDynamicParticles() {
        const particleContainer = document.querySelector('.particles-container');
        if (!particleContainer) return;

        // Agregar más partículas dinámicamente
        for (let i = 7; i <= 15; i++) {
            const particle = document.createElement('div');
            particle.className = `particle particle-${i}`;
            particle.style.cssText = `
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
                animation-duration: ${8 + Math.random() * 6}s;
            `;
            particleContainer.appendChild(particle);
        }

        // Efecto de mouse follower para las partículas
        document.addEventListener('mousemove', function(e) {
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.01;
                const x = (e.clientX * speed) / 200;
                const y = (e.clientY * speed) / 200;
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // Crear efecto de conexiones entre partículas
    function createParticleConnections() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function drawConnections() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const particles = document.querySelectorAll('.particle');
            const mouse = { x: 0, y: 0 };

            document.addEventListener('mousemove', (e) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            });

            particles.forEach((particle, i) => {
                const rect = particle.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;

                // Conectar partículas cercanas
                particles.forEach((otherParticle, j) => {
                    if (i !== j) {
                        const otherRect = otherParticle.getBoundingClientRect();
                        const otherX = otherRect.left + otherRect.width / 2;
                        const otherY = otherRect.top + otherRect.height / 2;
                        
                        const distance = Math.sqrt((x - otherX) ** 2 + (y - otherY) ** 2);
                        
                        if (distance < 150) {
                            const opacity = (150 - distance) / 150 * 0.2;
                            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.lineTo(otherX, otherY);
                            ctx.stroke();
                        }
                    }
                });

                // Conectar con el mouse
                const mouseDistance = Math.sqrt((x - mouse.x) ** 2 + (y - mouse.y) ** 2);
                if (mouseDistance < 200) {
                    const opacity = (200 - mouseDistance) / 200 * 0.3;
                    ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            });

            requestAnimationFrame(drawConnections);
        }

        window.addEventListener('resize', resizeCanvas);
        drawConnections();
    }

    // Activar efectos dinámicos solo en desktop
    if (window.innerWidth > 768) {
        createDynamicParticles();
        createParticleConnections();
    }

    // Agregar efecto de reveal al hacer scroll
    const revealElements = document.querySelectorAll('.hero-section, .stats-section, .team-section, .features-section, .week-cards-section');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(el);
    });

    // Agregar efecto de carga inicial
    setTimeout(() => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }
    }, 100);

    console.log('ErgoWave - Aplicación inicializada correctamente');
    console.log('Diseño inspirado en Bewe.io - Versión mejorada');
});
