document.addEventListener('DOMContentLoaded', function() {
    
    // --- Dados das Farmácias (com link do WhatsApp atualizado) ---
    const newWhatsAppLink = 'https://wa.me/5579981282209?text=Olá%20Drogamed!%20Vim%20pelo%20site%20e%20gostaria%20de:%20%0A%0A🔹%20Informações%20sobre%20serviços%20farmacêuticos%0A🔹%20Valor%20do%20delivery%20para%20meu%20endereço%0A🔹%20Tirar%20dúvidas%20sobre%20medicamentos%0A%0AMeu%20endereço%20é:%20';

    const pharmacies = {
        'farmacia-centro': {
            name: 'Farmácia Drogamed - Parque Shopping',
            address: 'Av. João Rodrigues, 42 - Industrial, Aracaju - SE, 49065-450',
            hours: 'Segunda a Sábado: 8h às 20h',
            phone: '(79)9 8128-2209',
            whatsapp: newWhatsAppLink,
            mapId: 'farmacia-centro-map'
        },
        'farmacia-industrial': {
            name: 'Farmácia Drogamed - Av. Desembargador',
            address: 'Av. Desembargador Antônio Assis Xavier, 55 - Industrial, Aracaju/SE',
            hours: 'Segunda a Sábado: 8h às 20h',
            phone: '(79)9 8128-2209',
            whatsapp: newWhatsAppLink,
            mapId: 'farmacia-industrial-map'
        }
    };

    // --- Seletor de Farmácias ---
    const pharmacyButtons = document.querySelectorAll('.pharmacy-btn');
    if (pharmacyButtons.length > 0) {
        pharmacyButtons.forEach(button => {
            button.addEventListener('click', function() {
                pharmacyButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const pharmacyId = this.getAttribute('data-pharmacy');
                const pharmacy = pharmacies[pharmacyId];
                
                document.querySelector('.pharmacy-name').textContent = pharmacy.name;
                document.querySelector('.pharmacy-address').textContent = pharmacy.address;
                document.querySelector('.pharmacy-hours').textContent = pharmacy.hours;
                document.querySelector('.pharmacy-phone').textContent = pharmacy.phone;
                
                const whatsappBtn = document.querySelector('.contact-info .btn-whatsapp');
                if (whatsappBtn) {
                    whatsappBtn.href = pharmacy.whatsapp;
                }

                document.querySelectorAll('.pharmacy-map').forEach(map => map.classList.remove('active'));
                document.getElementById(pharmacy.mapId).classList.add('active');
            });
        });
    }

    // --- Menu Mobile ---
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Adiciona/remove classe no body para bloquear a rolagem
            document.body.classList.toggle('mobile-menu-open'); 
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    // --- Efeito de Scroll no Header ---
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // --- Slider de Serviços ---
    const slides = document.querySelectorAll('.service-slide');
    if (slides.length > 0) {
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        function showSlide(index) {
            currentSlide = (index + totalSlides) % totalSlides;
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function startSlider() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopSlider() {
            clearInterval(slideInterval);
        }

        nextBtn.addEventListener('click', () => {
            stopSlider();
            nextSlide();
            startSlider();
        });

        prevBtn.addEventListener('click', () => {
            stopSlider();
            showSlide(currentSlide - 1);
            startSlider();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlider();
                showSlide(index);
                startSlider();
            });
        });
        
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseenter', stopSlider);
        sliderContainer.addEventListener('mouseleave', startSlider);
        
        showSlide(0);
        startSlider();
    }
    
    // --- Rolagem Suave e Fechar Menu Mobile ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const isMobileMenuLink = this.closest('.main-nav');

            if (mainNav.classList.contains('active') && isMobileMenuLink) {
                e.preventDefault();
                mainNav.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            } else if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }


            const targetId = this.getAttribute('href');
            if(targetId.startsWith('#') && targetId.length > 1) {
                if(!isMobileMenuLink) e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                     setTimeout(() => {
                        const headerOffset = document.querySelector('header').offsetHeight;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                     }, isMobileMenuLink ? 150 : 0);
                }
            } else if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
});