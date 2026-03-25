document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    // Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // --- Sticky Header Effect ---
    const header = document.querySelector('header');
    const logoImg = document.querySelector('.logo img');
    const initialLogo = 'assets/images/logo-3.png';
    const scrolledLogo = 'assets/images/logo-3.png';

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (logoImg.getAttribute('src') !== scrolledLogo) {
                logoImg.src = scrolledLogo;
            }
        } else {
            header.classList.remove('scrolled');
            if (logoImg.getAttribute('src') !== initialLogo) {
                logoImg.src = initialLogo;
            }
        }
    });

    // --- Simple Form Submission Handling ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Gallery Lightbox / Popup Slider ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentIndex = 0;
    const galleryImages = [];

    // Collect all gallery image sources
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            galleryImages.push({ src: img.src, alt: img.alt });
            item.addEventListener('click', () => openLightbox(index));
        }
    });

    function openLightbox(index) {
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxImage() {
        lightboxImg.src = galleryImages[currentIndex].src;
        lightboxImg.alt = galleryImages[currentIndex].alt;
        lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }

    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);

    // Close on overlay background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
});
