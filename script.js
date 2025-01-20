const translations = {
    en: {
        nav: {
            home: 'Home',
            about: 'About Me',
            projects: 'Projects',
            contact: 'Contact',
            skills: 'Skills',
            main: 'Main'
        },
        portfolio: {
            title: 'Portfolio - szyma1',
            subtitle: 'My Portfolio'
        },
        welcomeText: 'Welcome to my portfolio website',
        skills: {
            title: 'My Skills',
            frontend: 'Frontend Development',
            backend: 'Backend Development',
            tools: 'Tools & Technologies'
        },
        projects: {
            title: 'Projects',
            viewProject: 'View Project',
            viewCode: 'View Code',
            liveDemo: 'Live Demo',
            project1: {
                title: 'Project 1',
                desc: 'Description of project 1'
            },
            project2: {
                title: 'Project 2',
                desc: 'Description of project 2'
            }
        },
        contact: {
            title: 'Contact',
            reachMe: 'You can reach me at:'
        },
        about: {
            title: 'About Me',
            greeting: 'Hi, I\'m szyma1',
            intro: "Hi! My name is szyma1 and I'm passionate about tech and programming. My mission is to combine creativity with technology to create solutions that catch attention and have a real impact on users.",
            skills: "I specialize in creating modern websites and web applications, and my projects are characterized by innovation, attention to detail, and functionality. My work is the result of continuous development, experimentation, and adaptation to changing trends, allowing me to create projects that meet market needs and client expectations.",
            experience: "I have collaborated with various industries and projects, and each of these experiences has allowed me to broaden my horizons and develop skills in areas that are close to my heart. I am always open to new challenges and opportunities that allow me to grow and create something unique.",
            outro: "I invite you to check out my projects and, if any of them interest you, get in touch with me. I'd be happy to discuss potential collaboration opportunities."
        }
    },
    pl: {
        nav: {
            home: 'Strona Główna',
            about: 'O Mnie',
            projects: 'Projekty',
            contact: 'Kontakt',
            skills: 'Umiejętności',
            main: 'Główna'
        },
        portfolio: {
            title: 'Portfolio - szyma1',
            subtitle: 'Moje Portfolio'
        },
        welcomeText: 'Witaj na mojej stronie portfolio',
        skills: {
            title: 'Moje Umiejętności',
            frontend: 'Frontend Development',
            backend: 'Backend Development',
            tools: 'Narzędzia i Technologie'
        },
        projects: {
            title: 'Projekty',
            viewProject: 'Zobacz Projekt',
            viewCode: 'Zobacz Kod',
            liveDemo: 'Demo',
            project1: {
                title: 'Projekt 1',
                desc: 'Opis projektu 1'
            },
            project2: {
                title: 'Projekt 2',
                desc: 'Opis projektu 2'
            }
        },
        contact: {
            title: 'Kontakt',
            reachMe: 'Możesz się ze mną skontaktować:'
        },
        about: {
            title: 'O Mnie',
            greeting: 'Cześć, jestem szyma1',
            intro: "Cześć! Nazywam się Szymon i jestem pasjonatem programowania i technologii. Moją misją jest łączenie kreatywności z technologią, by tworzyć rozwiązania, które przyciągają uwagę i mają realny wpływ na użytkowników.",
            skills: "Zajmuję się tworzeniem nowoczesnych stron internetowych i aplikacji webowych, a moje projekty charakteryzują się innowacyjnością, dbałością o szczegóły i funkcjonalnością. Moja praca jest efektem ciągłego rozwoju, eksperymentowania i dostosowywania się do zmieniających się trendów, co pozwala mi tworzyć projekty, które odpowiadają na potrzeby rynku i oczekiwania klientów.",
            experience: "Współpracowałem z różnymi branżami i projektami, a każde z tych doświadczeń pozwoliło mi poszerzyć horyzonty i rozwijać umiejętności w obszarach, które są mi bliskie. Jestem zawsze otwarty na nowe wyzwania i zlecenia, które pozwalają mi się rozwijać i tworzyć coś wyjątkowego.",
            outro: "Zapraszam do zapoznania się z moimi projektami i, jeśli któreś z nich Cię zainteresuje, skontaktowania się ze mną. Chętnie porozmawiam o możliwościach współpracy."
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
