document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const isLandingPage = window.location.pathname === '/' || window.location.pathname === '/index.html';

    if (isLandingPage) {
        // Dynamic navbar behavior on landing page (hide initially, show on scroll)
        let scrollStarted = false;

        function handleNavVisibility() {
            const scrollTop = window.scrollY;

            if (scrollTop > 0) {
                scrollStarted = true;
                nav.classList.remove('invisible', 'bg-transparent', '-translate-y-full');
                nav.classList.add('bg-indigo-600', 'translate-y-0');
            } else {
                nav.classList.remove('bg-indigo-600', 'translate-y-0');
                nav.classList.add('invisible', 'bg-transparent', '-translate-y-full');
            }
        }

        // Initially show navbar after 1 second
        setTimeout(() => {
            if (!scrollStarted) {
                nav.classList.remove('invisible', 'bg-transparent', '-translate-y-full');
                nav.classList.add('bg-indigo-600', 'translate-y-0');
            }
        }, 1000);

        window.addEventListener('scroll', handleNavVisibility);
    } else {
        // Ensure navbar is always visible on non-landing pages
        nav.classList.remove('invisible', 'bg-transparent', '-translate-y-full');
        nav.classList.add('bg-indigo-600', 'translate-y-0');
    }

    // Smooth scrolling for navigation links on all pages
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});