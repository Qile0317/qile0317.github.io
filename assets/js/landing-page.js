document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const headline = document.getElementById('headline');
    const subtext = document.getElementById('subtext');
    const scrollIndicator = document.getElementById('scroll-indicator');
    const scrollProgress = document.getElementById('scroll-progress');

    // Navigation and scroll visibility
    function handleNavVisibility() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(scrollTop / docHeight, 1);

        // Show nav after 1 second or on scroll
        if (scrollTop > 0 || scrollPercent > 0.1) {
            nav.classList.remove('bg-transparent');
            nav.classList.add('bg-gradient-to-br', 'from-blue-500', 'to-purple-600');
        }

        // Update scroll indicator
        scrollProgress.style.transform = `scaleY(${scrollPercent})`;

        // Animate headline and subtext
        if (scrollTop > 100) {
            headline.classList.remove('opacity-0', 'translate-y-12');
            headline.classList.add('opacity-100', 'translate-y-0');
            
            subtext.classList.remove('opacity-0', 'translate-y-12');
            subtext.classList.add('opacity-100', 'translate-y-0');
        }
    }

    // Initial timeout to show nav
    setTimeout(() => {
        nav.classList.remove('bg-transparent');
        nav.classList.add('bg-gradient-to-br', 'from-blue-500', 'to-purple-600');
    }, 1000);

    // Add scroll event listener
    window.addEventListener('scroll', handleNavVisibility);
});
