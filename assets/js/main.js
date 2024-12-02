document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const scrollIndicator = document.getElementById('scroll-progress');

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navigation and scroll visibility
    function handleNavVisibility() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(scrollTop / docHeight, 1);

        // Show nav after 1 second or on scroll
        if (scrollTop > 0 || scrollPercent > 0.1) {
            nav.classList.remove('bg-transparent');
            nav.classList.add('bg-gradient-to-br', 'from-blue-500', 'to-purple-600');
        } else {
            nav.classList.add('bg-transparent');
            nav.classList.remove('bg-gradient-to-br', 'from-blue-500', 'to-purple-600');
        }

        // Update scroll indicator
        scrollIndicator.style.transform = `scaleY(${scrollPercent})`;
    }

    // Initial timeout to show nav
    setTimeout(() => {
        nav.classList.remove('bg-transparent');
        nav.classList.add('bg-gradient-to-br', 'from-blue-500', 'to-purple-600');
    }, 1000);

    // Add scroll event listener
    window.addEventListener('scroll', handleNavVisibility);
});