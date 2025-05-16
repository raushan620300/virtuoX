'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const burgerIcon = document.querySelector('.burger');
    const navbar = document.querySelector('.navbar');

    //* Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    burgerIcon.addEventListener('click', () => {
        burgerIcon.classList.toggle('toggle');
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, idx) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${idx / 5 + 0.2}s`;
            }
        });
    });


    //* Close mobile menu when clicking on links
    navLinks.forEach((link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burgerIcon.classList.remove('toggle');
                navLinks.forEach((link => {
                    link.style.animation = '';
                }));
            }
        });
    }));


    //* Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('nav-active') && !nav.contains(e.target) && !burgerIcon.contains(e.target)) {
            nav.classList.remove('nav-active');
            burgerIcon.classList.remove('toggle');
            navLinks.forEach((link => {
                link.style.animation = '';
            }));
        }
    }, false);


    //* Navigation links handling
    const navSectionLinks = {
        'Home': 'index.html',
        'About': 'about.html',
        'How it works': 'how-it-works.html',
        'Contact': 'contact.html'
    };
    document.querySelectorAll('.nav-links a').forEach((navLink => {
        navLink.addEventListener('click', (e) => {
            e.preventDefault();
            const linkIndex = navLink.textContent.trim();
            //? for mobile menu
            if (nav.classList.contains('nav-active')) {
                setTimeout(() => {
                    window.open(navSectionLinks[linkIndex], '_self');
                }, 300);
            } else {
                window.open(navSectionLinks[linkIndex], '_self');
            }
        });
    }));


    //* Function to Speak using Text-to-Speech
    const speakAutomate = (text) => {
        const textSpeak = new SpeechSynthesisUtterance(text);
        textSpeak.rate = 1;
        textSpeak.volume = 1;
        textSpeak.pitch = 1;
        window.speechSynthesis.speak(textSpeak);
    }

    //* Logo click event
    document.querySelector('.logo-text').addEventListener('click', () => {
        const userName = prompt(`Enter your name`);
        if (userName) {
            speakAutomate(`Hello ${userName}`);
        }
    });


    //* Robot image hover effect with rules
    document.querySelector('.svg-frame').addEventListener('click', () => {
        const botAlert = document.createElement('div');
        botAlert.className = 'botAlertBox';
        botAlert.textContent = 'Hello, This is VirtuoX. How can I assist you?';
        document.body.appendChild(botAlert);
        speakAutomate(botAlert.textContent);

        setTimeout(() => {
            botAlert.style.opacity = '1';
            botAlert.style.visibility = 'visible';
            botAlert.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);

        setTimeout(() => {
            document.body.removeChild(botAlert);
        }, 5000);
    });


    //* Speech Recognition Enable
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.lang = 'en-US';

    //? Speech Recognition Start
    document.querySelector('.start-btn').addEventListener('click', () => {
        recognition.start();
        speakAutomate("Voice recognition activated.");
    });
    //? Speech Recognition Stop
    document.querySelector('.stop-btn').addEventListener('click', () => {
        recognition.stop();
        speakAutomate("Voice recognition deactivated.");
    });
    //? Print Button
    document.querySelector('.print-btn').addEventListener('click', () => {
        window.print();
    });

    //? Website links object for speech commands
    const websiteLinks = {
        'youtube': {
            url: 'https://www.youtube.com/',
            message: 'Opening Youtube'
        },
        'google': {
            url: 'https://www.google.com/',
            message: 'Opening Google'
        },
        'instagram': {
            url: 'https://www.instagram.com/',
            message: 'Opening Instagram'
        },
        'linkedin': {
            url: 'https://www.linkedin.com/',
            message: 'Opening Linkedin'
        },
        'facebook': {
            url: 'https://www.facebook.com/',
            message: 'Opening Facebook'
        },
        'twitter': {
            url: 'https://twitter.com/',
            message: 'Opening Twitter'
        },
        'chatgpt': {
            url: 'https://chatgpt.com/',
            message: 'Opening ChatGPT'
        },
        'github': {
            url: 'https://github.com/raushan620300',
            message: 'Opening GitHub'
        },
        'telegram': {
            url: 'https://web.telegram.org/a/',
            message: 'Opening Telegram'
        }
    };

    recognition.addEventListener('result', (event) => {
        const transcript = Array.from(event.results).map((result => result[0].transcript)).join('').toLowerCase();
        for (const [site, details] of Object.entries(websiteLinks)) {
            if (transcript.includes(`${site}`)) {
                window.open(details.url, '_blank');
                speakAutomate(details.message);
                break;
            }
        }

        //? Adding extra commands for VirtuoX
        if (transcript.includes('what is your name') || transcript.includes('who are you')) {
            speakAutomate('I am VirtuoX, your virtual assistant. How can I help you today?');
        } else if (transcript.includes('thank you')) {
            speakAutomate("You're welcome! Is there anything else I can help you with?");
        } else if (transcript.includes('what you can do')) {
            speakAutomate('I can open any Link with your Speech command');
        } else if (transcript.includes('time')) {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            speakAutomate(`The current time is ${timeString}`);
        } else if (transcript.includes('date')) {
            const date = new Date();
            const currentDate = date.getDate();
            speakAutomate(`The current date is ${currentDate}`);
        }
    });


});
