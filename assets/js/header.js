document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

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
});
