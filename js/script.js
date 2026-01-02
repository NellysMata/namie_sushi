document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    // Usamos IDs porque son más rápidos y específicos
    const mobileBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const icon = mobileBtn ? mobileBtn.querySelector('i') : null;

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            
            // Toggle clases
            navLinks.classList.toggle('active');
            
            // Accesibilidad: Actualizar estado
            mobileBtn.setAttribute('aria-expanded', !isExpanded);

            // Cambiar icono
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Cerrar menú al hacer clic en un enlace (Mejora UX móvil)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 50;
            
            // Ajuste visual para el tema oscuro de EneSushi
            if (scrolled) {
                navbar.style.background = 'rgba(5, 5, 5, 0.95)'; // Casi negro sólido
                navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
                navbar.style.padding = '10px 0'; // Reducir altura
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.7)'; // Transparente
                navbar.style.boxShadow = 'none';
                navbar.style.padding = '20px 0'; // Altura original
            }
        });
    }

    // 3. Smooth Scroll (Navegación suave)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Compensación para la barra de navegación fija (70px aprox)
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Scroll Animations (Intersection Observer)
    // Seleccionamos los elementos que queremos animar
    const animatedElements = document.querySelectorAll('.feature-card, .menu-item, .section-header');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.classList.add('reveal-hidden'); // Añadimos clase inicial
        observer.observe(el);
    });
});