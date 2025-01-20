const translations = { 
    en: {
        nav: {
            home: 'Home',
            about: 'About Me',
            contact: 'Contact'
        },
        projects: {
            title: 'Projects',
            viewCode: 'View Code',
            liveDemo: 'Live Demo',
            project1: {
                title: 'Flask Blog',
                desc: 'Blog created using Python (Flask), HTML, CSS and SQLite. Features login system, post creation/editing, comments and admin panel.'
            },
            project2: {
                title: 'JavaScript Game',
                desc: 'Simple platform game created with JavaScript and HTML Canvas. Features scoring system, sound effects, animations and responsive controls.'
            }
        },
        about: {
            title: 'About Me',
            greeting: 'Hi, I\'m szyma1',
            intro: "Hi! My name is szyma1 and I'm passionate about tech and programming. My mission is to combine creativity with technology to create solutions that catch attention and have a real impact on users."
        }
    },
    pl: {
        nav: {
            home: 'Strona Główna',
            about: 'O Mnie',
            contact: 'Kontakt'
        },
        projects: {
            title: 'Projekty',
            viewCode: 'Zobacz Kod',
            liveDemo: 'Demo',
            project1: {
                title: 'Blog Flask',
                desc: 'Blog stworzony przy użyciu Pythona (Flask), HTML, CSS i SQLite. Zawiera system logowania, dodawanie/edycję postów, komentarze i panel administratora. (planowane)'
            },
            project2: {
                title: 'Gra JavaScript',
                desc: 'Prosta gra platformowa stworzona w JavaScript i HTML Canvas. Posiada system punktacji, efekty dźwiękowe, animacje i responsywne sterowanie. (planowane)'
            }
        },
        about: {
            title: 'O Mnie',
            greeting: 'Cześć, jestem szyma1',
            intro: "Cześć! Nazywam się szyma1 i pasjonuję się technologią i programowaniem. Moją misją jest łączenie kreatywności z technologią, aby tworzyć rozwiązania, które przyciągają uwagę i mają realny wpływ na użytkowników."
        }
    }
};
 
let currentLang = localStorage.getItem('language') || 'en';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded');
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.querySelector('#darkMode');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    // Remove the code that creates and appends language switcher
    // since it's already in HTML

    // Language switcher functionality
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            document.querySelectorAll('.lang-btn').forEach(b => {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            currentLang = lang;
            localStorage.setItem('language', lang);
            updateLanguage();
        });
    });

    // Set initial active state
    const activeBtn = document.querySelector(`.lang-btn[data-lang="${currentLang}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Initial language setup
    updateLanguage();

    // Form validation
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            if (!email || !message) {
                alert(translations[currentLang].messages.formError);
                return;
            }
            
            // Add your form submission logic here
            console.log('Form submitted:', { email, message });
        });
    }
});

function updateLanguage() {
    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.dataset.lang;
        if (!key.includes('.')) {
            // Handle direct translations
            if (translations[currentLang][key]) {
                element.textContent = translations[currentLang][key];
            }
            return;
        }
        
        // Handle nested translations
        const path = key.split('.');
        let translation = translations[currentLang];
        path.forEach(p => {
            if (translation) translation = translation[p];
        });
        if (translation) {
            element.textContent = translation;
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Update page title
    const currentPage = location.pathname.split('/').pop().replace('.html', '') || 'home';
    const pageTitle = translations[currentLang].nav[currentPage] || translations[currentLang].nav.home;
    document.title = `${pageTitle} - szyma1`;
}
