document.addEventListener('DOMContentLoaded', () => {
    const testimonials = document.querySelectorAll('.testimonial');

    testimonials.forEach(testimonial => {
        testimonial.addEventListener('click', () => {
            testimonial.classList.toggle('active');
        });
    });
});
