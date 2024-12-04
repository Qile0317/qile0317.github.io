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
            nav.classList.add('bg-indigo-600'); // Solid color instead of gradient
            nav.classList.remove('-translate-y-full');
            nav.classList.add('transition-all', 'transform', 'translate-y-0'); // Smooth transition
        }

        if (scrollTop === 0 && !scrollStarted) {
            nav.classList.add('invisible');
            nav.classList.remove('bg-indigo-600');
            nav.classList.add('transition-all', 'transform', '-translate-y-full'); // Slide up out of view
        }
    }

    // Show navbar after 1 second or on scroll
    setTimeout(() => {
        if (!scrollStarted) {
            nav.classList.remove('invisible');
            nav.classList.add('bg-indigo-600'); // Solid color
            nav.classList.remove('-translate-y-full');
            nav.classList.add('transition-all', 'transform', 'translate-y-0'); // Smooth transition
        }
    }, 1000);

    // Add scroll event listener to make navbar appear immediately on scroll
    window.addEventListener('scroll', handleNavVisibility);
});
