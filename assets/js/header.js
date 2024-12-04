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

    let scrollStarted = false; // Flag to check if the scroll has started

    // Function to handle navbar appearance and position on scroll
    function handleNavVisibility() {
        const scrollTop = window.scrollY;

        // Show navbar after 1 second or on scroll
        if (!scrollStarted && scrollTop > 0) {
            scrollStarted = true; // Set the flag when scrolling starts
            nav.classList.remove('invisible');
            nav.classList.add('bg-gradient-to-br', 'from-indigo-600', 'via-purple-500', 'to-pink-500');
            nav.classList.add('transition-transform', 'transform', 'translate-y-0');
        }

        if (scrollTop === 0 && !scrollStarted) {
            nav.classList.add('invisible');
            nav.classList.remove('bg-gradient-to-br', 'from-indigo-600', 'via-purple-500', 'to-pink-500');
            nav.classList.add('transition-transform', 'transform', 'translate-y-[-100%]');
        }
    }

    // Show navbar after 1 second or on scroll
    setTimeout(() => {
        if (!scrollStarted) {
            nav.classList.remove('invisible');
            nav.classList.add('bg-gradient-to-br', 'from-indigo-600', 'via-purple-500', 'to-pink-500');
            nav.classList.add('transition-transform', 'transform', 'translate-y-0');
        }
    }, 1000);

    // Add scroll event listener to make navbar appear immediately on scroll
    window.addEventListener('scroll', handleNavVisibility);
});
