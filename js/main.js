// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Funcionalidad de cambio de tema (claro/oscuro)
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const themeText = themeToggle ? themeToggle.childNodes[1] : null;
    
    // Verificar si hay una preferencia guardada
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Aplicar tema al cargar la página
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        if (themeText) {
            themeText.textContent = ' Modo Claro';
        }
    }
    
    // Manejar el cambio de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                themeText.textContent = ' Modo Oscuro';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                themeText.textContent = ' Modo Claro';
            }
        });
    }

    // Manejar el formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se podría implementar la lógica para enviar el formulario por AJAX
            // Por ahora, solo mostraremos un mensaje de éxito
            alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
            contactForm.reset();
        });
    }

    // Filtros de portafolio
    const portfolioFilters = document.querySelectorAll('[data-filter]');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioFilters.length > 0) {
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remover clase activa de todos los filtros
                portfolioFilters.forEach(f => f.classList.remove('active'));
                // Añadir clase activa al filtro seleccionado
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filtrar los elementos del portafolio
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Animación de scroll suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación para elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };

    // Ejecutar animación al cargar la página y al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});