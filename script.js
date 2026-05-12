document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
                navLinks.style.position = 'fixed';
                navLinks.style.top = '90px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.height = 'calc(100vh - 90px)';
                navLinks.style.background = 'black';
                navLinks.style.flexDirection = 'column';
                navLinks.style.alignItems = 'center';
                navLinks.style.justifyContent = 'center';
                navLinks.style.zIndex = '999';
            } else {
                navLinks.style.display = '';
            }
        });
    }

    // Advanced Reveal on Scroll with Intersection Observer
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3D Tilt Effect for Team Cards
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('change', () => validateField(input));
        });

        contactForm.addEventListener('submit', (e) => {
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
            } else {
                showSubmitFeedback();
            }
        });
    }

    function validateField(field) {
        const formGroup = field.closest('.form-group');
        const value = field.value.trim();
        let isValid = true;

        formGroup.classList.remove('error', 'success');

        switch (field.name) {
            case 'nome':
                isValid = value.length >= 3;
                break;
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            case 'telefone':
                isValid = /^[\d\s\-\(\)]{10,}$/.test(value);
                break;
            case 'empresa':
                isValid = value.length >= 2;
                break;
            case 'servico':
                isValid = value !== '';
                break;
            case 'mensagem':
                isValid = value.length >= 10;
                break;
        }

        if (!isValid && value !== '') {
            formGroup.classList.add('error');
        } else if (isValid && value !== '') {
            formGroup.classList.add('success');
        }

        return isValid || value === '';
    }

    function showSubmitFeedback() {
        const form = document.getElementById('contact-form');
        const btn = form.querySelector('button');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-sync fa-spin"></i> Enviando...';

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Enviado com Sucesso!';
            btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';

            setTimeout(() => {
                window.location.href = 'obrigado.html';
            }, 2000);
        }, 1500);
    }
});
