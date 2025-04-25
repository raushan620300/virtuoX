'use strict';

// document.querySelector('#emailLink').addEventListener('click', (e) => {
//     e.preventDefault();
//     window.open('mailto: raushankrsinha2004@gmail.com', '_blank');
// });


//* Set up contact links
const contactLinks = [
    'mailto:raushankrsinha2004@gmail.com',
    'tel:+916203004345'
];
document.querySelectorAll('.contact-details .contact-item').forEach((link, idx) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if (contactLinks[idx]) {
            window.open(contactLinks[idx], '_blank');
        }
    }, false);
});


//* Social Links
const socialLinks = [
    'https://x.com/84Raushan',
    'https://www.linkedin.com/in/raushan-sinha-4b94452a1/',
    'https://www.facebook.com/rohan.rider.1806',
    'https://www.instagram.com/raushan_sinha02/?hl=en'
];
document.querySelectorAll('.social-links a').forEach((link, idx) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if (socialLinks[idx]) {
            window.open(socialLinks[idx], '_blank');
        }
    }, false);
});


//* Response Alert Message
const contactForm = document.querySelector('#contactForm');
const formResponse = document.querySelector('#formResponse');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const subject = document.querySelector('#subject').value.trim();
    const message = document.querySelector('#message').value.trim();

    // Validate form fields
    if (!name || !email || !subject || !message) {
        formResponse.textContent = 'Please fill up all form fields.';
        formResponse.className = 'form-response error';
        formResponse.style.display = 'block';
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formResponse.textContent = 'Please enter a valid email address.';
        formResponse.className = 'form-response error';
        formResponse.style.display = 'block';
        return;
    }

    //? Send Message / Response with an API
    try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        const result = await response.json();
        if (result.success) {
            formResponse.textContent = `Thank you for message! We'll get back to you soon:)`;
            formResponse.className = 'form-response success';
            formResponse.style.display = 'block';
            contactForm.reset();
        } else {
            throw new Error(result.message || 'Failed to send!');
        }
    } catch (error) {
        formResponse.textContent = `Failed to send the message! Please try again`;
        formResponse.className = 'form-response error';
        formResponse.style.display = 'block';
    }
    //? Hide the message after 5 second
    setTimeout(() => {
        formResponse.style.display = 'none';
    }, 5000);
});
