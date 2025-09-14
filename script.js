document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('menu-open');
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            mobileMenu.classList.remove('menu-open'); // Close menu on click
            const targetId = this.getAttribute('href');
            // Use 'body' for a href="#" link to scroll to the top
            const targetElement = document.querySelector(targetId === '#' ? 'body' : targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Modal Logic ---
    const triggers = document.querySelectorAll('[data-modal-trigger]');
    const closeButtons = document.querySelectorAll('[data-modal-close]');
    const modals = document.querySelectorAll('.modal');

    const openModal = (modalId) => {
        const modal = document.getElementById(modalId + '-modal');
        if (modal) {
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.style.opacity = '1';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }, 10);
        }
    };

    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId + '-modal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto'; // Restore scrolling
            }, 300); // Match transition duration
        }
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-trigger');
            openModal(modalId);
            mobileMenu.classList.remove('menu-open');
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-close');
            closeModal(modalId);
        });
    });

    // Close modal by clicking on the overlay
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                const modalId = modal.id.replace('-modal', '');
                closeModal(modalId);
            }
        });
    });
    
    // Close modal with the Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            modals.forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                     const modalId = modal.id.replace('-modal', '');
                     closeModal(modalId);
                }
            });
        }
    });
});
