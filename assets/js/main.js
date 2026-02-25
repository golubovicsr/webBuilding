// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ===== NAVIGACIJA =====
const navMenu = document.getElementById('navMenu');
const hamburger = document.querySelector('.hamburger');
const navbar = document.getElementById('navbar');

// Dinamički meni
const menuItems = [
    { href: 'index.html', text: 'Početna' },
    { href: '#usluge', text: 'Usluge' },
    { href: '#oNama', text: 'O nama' },
    { href: '#kontakt', text: 'Kontakt' },
    { href: 'autor.html', text: 'Autor' },
    { href: 'sajt.zip', text: 'Preuzmi projekat' }
];

if (navMenu) {
    menuItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.text;
        li.appendChild(a);
        navMenu.appendChild(li);
    });
}

// Hamburger meni
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Scroll efekat za navigaciju
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== BACK TO TOP =====
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== SERVISI =====
const services = [
    {
        id: 1,
        name: 'Informativni sajt',
        category: 'osnovni',
        price: 499,
        description: 'Idealan za male biznise. Profesionalni sajt sa do 5 stranica.',
        features: ['Responsive dizajn', 'Kontakt forma', 'SEO optimizacija'],
        image: 'assets/images/servis1.jpg'
    },
    {
        id: 2,
        name: 'Business sajt',
        category: 'business',
        price: 999,
        description: 'Za ozbiljnije prezentacije. Do 10 stranica i blog.',
        features: ['Blog sekcija', 'Newsletter', 'Galerija slika'],
        image: 'assets/images/servis2.jpg'
    },
    {
        id: 3,
        name: 'Online prodavnica',
        category: 'ecommerce',
        price: 1999,
        description: 'Kompletno rešenje za prodaju na internetu.',
        features: ['Do 100 proizvoda', 'Plaćanje karticama', 'Admin panel'],
        image: 'assets/images/servis3.jpg'
    },
    {
        id: 4,
        name: 'Custom aplikacija',
        category: 'napredno',
        price: 2999,
        description: 'Potpuno prilagođeno rešenje.',
        features: ['Baza podataka', 'Korisnički nalozi', 'API integracije'],
        image: 'assets/images/servis4.jpg'
    },
    {
        id: 5,
        name: 'SEO optimizacija',
        category: 'usluge',
        price: 299,
        description: 'Poboljšajte vidljivost na pretraživačima.',
        features: ['Keyword analiza', 'Optimizacija', 'Mesečni izveštaji'],
        image: 'assets/images/servis1.jpg'
    },
    {
        id: 6,
        name: 'Redizajn sajta',
        category: 'usluge',
        price: 799,
        description: 'Osvežite izgled i funkcionalnosti.',
        features: ['Novi dizajn', 'Modernizacija', 'Migracija'],
        image: 'assets/images/servis2.jpg'
    }
];

const servicesGrid = document.getElementById('servicesGrid');
const filterSelect = document.getElementById('filterKategorija');
const loadMoreBtn = document.getElementById('loadMoreBtn');

if (servicesGrid) {
    // Popunjavanje filtera
    const categories = [...new Set(services.map(s => s.category))];
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        
        let catName = {
            'osnovni': 'Osnovni paketi',
            'business': 'Business paketi',
            'ecommerce': 'Online prodavnice',
            'napredno': 'Napredna rešenja',
            'usluge': 'Ostale usluge'
        }[cat] || cat;
        
        option.textContent = catName;
        filterSelect.appendChild(option);
    });
    
    // State
    let currentIndex = 0;
    let filteredServices = [...services];
    const itemsPerPage = 3;
    
    function displayServices(reset = false) {
        if (reset) {
            servicesGrid.innerHTML = '';
            currentIndex = 0;
        }
        
        const nextItems = filteredServices.slice(currentIndex, currentIndex + itemsPerPage);
        
        nextItems.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card';
            
            const featuresList = service.features.map(f => 
                `<li><i class="fas fa-check-circle"></i> ${f}</li>`
            ).join('');
            
            card.innerHTML = `
                <div class="service-img" style="background-image: url('${service.image}')"></div>
                <div class="service-content">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <div class="service-price">Od €${service.price}</div>
                    <ul class="service-features">${featuresList}</ul>
                    <a href="#kontakt" class="btn btn-small btn-primary">Zatraži ponudu</a>
                </div>
            `;
            
            servicesGrid.appendChild(card);
        });
        
        currentIndex += itemsPerPage;
        
        if (loadMoreBtn) {
            if (currentIndex >= filteredServices.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        }
    }
    
    // Inicijalni prikaz
    displayServices();
    
    // Load more
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            displayServices();
        });
    }
    
    // Filter
    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            const selected = filterSelect.value;
            
            if (selected) {
                filteredServices = services.filter(s => s.category === selected);
            } else {
                filteredServices = [...services];
            }
            
            displayServices(true);
        });
    }
}

// ===== O NAMA SEKCIJE =====
const aboutContainer = document.getElementById('aboutContainer');

const aboutSections = [
    {
        title: 'Naša misija',
        text: 'WebBuilding je osnovan sa ciljem da pomognemo malim i srednjim preduzećima da ostvare svoj digitalni potencijal. Verujemo da svaki biznis zaslužuje kvalitetno web prisustvo.',
        image: 'assets/images/about1.jpg',
        style: 'style1'
    },
    {
        title: 'Naš pristup',
        text: 'Svaki projekat počinjemo analizom vaših potreba i ciljeva. Kreiramo rešenja koja nisu samo lepa, već i funkcionalna i optimizovana.',
        image: 'assets/images/about2.jpg',
        style: 'style2'
    },
    {
        title: 'Zašto mi?',
        text: 'Kombinujemo moderni dizajn sa čistim kodom. Svaki sajt je responzivan, brz i prilagođen za SEO. Pružamo podršku i nakon završetka.',
        image: 'assets/images/about3.jpg',
        style: 'style1'
    }
];

if (aboutContainer) {
    aboutSections.forEach((section, index) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = `about-item ${section.style}`;
        
        let content = '';
        if (index % 2 === 0) {
            content = `
                <div class="about-img" style="background-image: url('${section.image}')"></div>
                <div class="about-text">
                    <h3>${section.title}</h3>
                    <p>${section.text}</p>
                </div>
            `;
        } else {
            content = `
                <div class="about-text">
                    <h3>${section.title}</h3>
                    <p>${section.text}</p>
                </div>
                <div class="about-img" style="background-image: url('${section.image}')"></div>
            `;
        }
        
        sectionDiv.innerHTML = content;
        aboutContainer.appendChild(sectionDiv);
    });
}

// ===== TAJMER =====
const timerNaslov = document.getElementById('timerNaslov');
const timerDisplay = document.getElementById('timer');

if (timerDisplay) {
    // Postavi datum za 15 dana od danas
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 15);
    endDate.setHours(23, 59, 59, 999);
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;
        
        if (distance < 0) {
            timerDisplay.innerHTML = 'Ponuda je istekla';
            timerNaslov.innerHTML = 'Nažalost, popust je istekao';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        timerDisplay.innerHTML = `
            <div class="timer-item">
                <div class="timer-number">${days}</div>
                <div class="timer-label">dana</div>
            </div>
            <div class="timer-item">
                <div class="timer-number">${hours}</div>
                <div class="timer-label">sati</div>
            </div>
            <div class="timer-item">
                <div class="timer-number">${minutes}</div>
                <div class="timer-label">minuta</div>
            </div>
            <div class="timer-item">
                <div class="timer-number">${seconds}</div>
                <div class="timer-label">sekundi</div>
            </div>
        `;
        
        timerNaslov.innerHTML = 'Specijalna ponuda traje još:';
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// ===== FORMA VALIDACIJA =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const radioInputs = document.querySelectorAll('input[name="projekat"]');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const radioError = document.getElementById('radioError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');
    
    // Regex
    const nameRegex = /^[A-Za-zČčĆćŠšĐđŽž\s]{3,50}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[+]?[\d\s-]{8,20}$/;
    const messageRegex = /^[\s\S]{10,500}$/;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Reset
        [nameError, emailError, phoneError, radioError, messageError].forEach(el => {
            if (el) el.textContent = '';
        });
        if (formSuccess) formSuccess.textContent = '';
        
        // Ime
        if (!nameRegex.test(nameInput.value.trim())) {
            nameError.textContent = 'Ime mora imati 3-50 karaktera (samo slova)';
            isValid = false;
        }
        
        // Email
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Unesite validnu email adresu';
            isValid = false;
        }
        
        // Telefon (opciono)
        if (phoneInput.value.trim() !== '' && !phoneRegex.test(phoneInput.value.trim())) {
            phoneError.textContent = 'Telefon nije validan';
            isValid = false;
        }
        
        // Radio
        let radioSelected = false;
        radioInputs.forEach(radio => {
            if (radio.checked) radioSelected = true;
        });
        
        if (!radioSelected) {
            radioError.textContent = 'Izaberite vrstu projekta';
            isValid = false;
        }
        
        // Poruka
        if (!messageRegex.test(messageInput.value.trim())) {
            messageError.textContent = 'Poruka mora imati najmanje 10 karaktera';
            isValid = false;
        }
        
        if (isValid) {
            formSuccess.textContent = 'Poruka je uspešno poslata! Javićemo vam se.';
            contactForm.reset();
            
            // Console log za proveru
            console.log('Forma validna! Podaci:');
            console.log('Ime:', nameInput.value);
            console.log('Email:', emailInput.value);
        }
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

});
