const QUOTES = [
    { text: "The clouds covered the sun for only five seconds, yet those five seconds stayed longer than the daylight.", author: "SkyVerse" },
    { text: "Every sunset brings the promise of a new dawn.", author: "Emerson" },
    { text: "The stars are not just in the sky, they are in your heart.", author: "Unknown" },
    { text: "In the sky, I see infinite possibilities.", author: "DaraKai" },
];

const WALLPAPERS = [
    { id: 1, title: "Celestial Dreams", category: "night", image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%230a0e27' width='400' height='400'/%3E%3C/svg%3E", caption: "A night sky full of wonder", date: "2024-01-15", type: "static", price: "₹50" },
    { id: 2, title: "Golden Sunset", category: "sunsets", image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23ff9500' width='400' height='400'/%3E%3C/svg%3E", caption: "The day ends with golden touch", date: "2024-01-14", type: "static", price: "₹50" },
    { id: 3, title: "Moonlight Glow", category: "moon", image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%231a1f3a' width='400' height='400'/%3E%3C/svg%3E", caption: "Gentle moonlight illuminates", date: "2024-01-13", type: "moving", price: "₹150" },
    { id: 4, title: "Rainy Clouds", category: "rain", image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%234a5568' width='400' height='400'/%3E%3C/svg%3E", caption: "The sky weeps with beauty", date: "2024-01-12", type: "static", price: "₹50" },
    { id: 5, title: "Star Field", category: "stars", image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23050814' width='400' height='400'/%3E%3C/svg%3E", caption: "Millions of stars", date: "2024-01-11", type: "moving", price: "₹150" },
    { id: 6, title: "Cloud Formation", category: "clouds", image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23b0c4de' width='400' height='400'/%3E%3C/svg%3E", caption: "Clouds paint the sky", date: "2024-01-10", type: "static", price: "₹50" },
];

const JOURNAL_ENTRIES = [
    { id: 1, image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ff6b6b' width='400' height='300'/%3E%3C/svg%3E", text: "Today's sunset reminded me that every ending is a new beginning.", date: "2024-01-15" },
    { id: 2, image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%234a90e2' width='400' height='300'/%3E%3C/svg%3E", text: "The night sky spoke to me in silence. Among infinite stars.", date: "2024-01-14" },
    { id: 3, image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23a8dadc' width='400' height='300'/%3E%3C/svg%3E", text: "Rain fell today, and with it came clarity and peace.", date: "2024-01-13" },
];

let state = {
    currentFilter: 'all',
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    darkMode: JSON.parse(localStorage.getItem('darkMode')) || true,
    creations: JSON.parse(localStorage.getItem('creations')) || [],
};

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    setupOpeningAnimation();
    setupNavigation();
    setupCanvases();
    setupWallpapers();
    setupJournal();
    setupQuotes();
    setupGallery();
    setupUniverse();
    setupDarkMode();
    setupAdminPanel();
    setupParticles();
}

function setupOpeningAnimation() {
    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = Array.from({length: 200}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: Math.random() * 0.02 + 0.01
    }));
    
    let shootingX = 0, shootingY = 0, shootingActive = false;
    
    function animate() {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffffff';
        stars.forEach(star => {
            star.opacity += star.twinkleSpeed;
            if (star.opacity > 1 || star.opacity < 0.3) star.twinkleSpeed *= -1;
            ctx.globalAlpha = star.opacity;
            ctx.beginPath();
            ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        });
        
        if (shootingActive) {
            const gradient = ctx.createLinearGradient(shootingX - 100, shootingY, shootingX, shootingY);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
            ctx.globalAlpha = 1;
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(shootingX - 100, shootingY);
            ctx.lineTo(shootingX, shootingY);
            ctx.stroke();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    setTimeout(() => {
        shootingActive = true;
        shootingX = 0;
        shootingY = canvas.height * 0.2;
        setInterval(() => {
            shootingX += 10;
            shootingY += 3;
            if (shootingX > canvas.width) shootingActive = false;
        }, 20);
    }, 1000);
}

function setupNavigation() {
    document.querySelector('.admin-link').addEventListener('click', (e) => {
        e.preventDefault();
        const admin = document.getElementById('admin');
        admin.style.display = admin.style.display === 'none' ? 'block' : 'none';
    });
}

function setupCanvases() {
    const canvas = document.getElementById('skyCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    function animate() {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#050814');
        gradient.addColorStop(0.5, '#1a1f3a');
        gradient.addColorStop(1, '#2d3561');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let i = 0; i < 200; i++) {
            const x = (Math.sin(i * 12.9898) * 43758.5453 % 1) * canvas.width;
            const y = (Math.sin(i * 78.233) * 43758.5453 % 1) * canvas.height;
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function setupWallpapers() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentFilter = btn.dataset.filter;
            renderWallpapers();
        });
    });
    renderWallpapers();
}

function renderWallpapers() {
    const gallery = document.getElementById('masonryGallery');
    gallery.innerHTML = '';
    const filtered = state.currentFilter === 'all' ? WALLPAPERS : WALLPAPERS.filter(w => w.category === state.currentFilter);
    filtered.forEach(wp => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${wp.image}" alt="${wp.title}"><div class="gallery-overlay"><div class="gallery-title">${wp.title}</div><div class="gallery-price">${wp.price}</div></div>`;
        item.addEventListener('click', () => openModal(wp));
        gallery.appendChild(item);
    });
}

function openModal(wp) {
    const modal = document.getElementById('wallpaperModal');
    document.getElementById('modalImage').src = wp.image;
    document.getElementById('modalTitle').textContent = wp.title;
    document.getElementById('modalCaption').textContent = wp.caption;
    document.getElementById('modalDate').textContent = `Date: ${wp.date}`;
    document.getElementById('modalPrice').textContent = `Price: ${wp.price}`;
    modal.style.display = 'flex';
    document.querySelector('.modal-close').onclick = () => modal.style.display = 'none';
}

function setupJournal() {
    const journal = document.getElementById('journalEntries');
    JOURNAL_ENTRIES.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'journal-card';
        card.innerHTML = `<img src="${entry.image}" alt="Journal" class="journal-image"><p class="journal-text">"${entry.text}"</p><p class="journal-date">${entry.date}</p>`;
        journal.appendChild(card);
    });
}

function setupQuotes() {
    document.getElementById('newQuoteBtn').addEventListener('click', showQuote);
    showQuote();
}

function showQuote() {
    const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    document.getElementById('quoteText').textContent = `"${quote.text}"`;
    document.getElementById('quoteAuthor').textContent = `— ${quote.author}`;
}

function setupGallery() {
    const grid = document.getElementById('featuredGrid');
    WALLPAPERS.forEach(wp => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${wp.image}" alt="${wp.title}"><div class="gallery-overlay"><div class="gallery-title">${wp.title}</div><div class="gallery-price">${wp.price}</div></div>`;
        item.addEventListener('click', () => openModal(wp));
        grid.appendChild(item);
    });
}

function setupUniverse() {
    const canvas = document.getElementById('universeCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let rotation = 0;
    function animate() {
        ctx.fillStyle = 'rgba(5, 8, 20, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let i = 0; i < 100; i++) {
            const x = (Math.sin(i * 12.9898 + rotation * 0.01) * 43758.5453 % 1) * canvas.width;
            const y = (Math.cos(i * 78.233 + rotation * 0.01) * 43758.5453 % 1) * canvas.height;
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
        }
        rotation += 1;
        requestAnimationFrame(animate);
    }
    animate();
}

function setupDarkMode() {
    const btn = document.getElementById('darkToggle');
    if (!state.darkMode) {
        document.body.classList.add('light-mode');
        btn.textContent = '☀️';
    }
    btn.addEventListener('click', () => {
        state.darkMode = !state.darkMode;
        document.body.classList.toggle('light-mode');
        btn.textContent = state.darkMode ? '🌙' : '☀️';
        localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    });
}

function setupAdminPanel() {
    const form = document.getElementById('uploadForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const creation = {
            id: Date.now(),
            title: document.getElementById('photoTitle').value,
            category: document.getElementById('photoCategory').value,
            type: document.getElementById('photoType').value,
            price: document.getElementById('photoType').value === 'static' ? '₹50' : '₹150',
        };
        state.creations.push(creation);
        localStorage.setItem('creations', JSON.stringify(state.creations));
        renderCreations();
        form.reset();
        alert('Photo uploaded successfully!');
    });
    renderCreations();
}

function renderCreations() {
    const list = document.getElementById('creationsList');
    list.innerHTML = state.creations.length === 0 ? '<p style="color: #e0e0e0;">No creations yet!</p>' : state.creations.map(c => `<div class="creation-card"><div class="creation-image" style="background: linear-gradient(135deg, #4a90e2, #357abd);">📷</div><div class="creation-info"><div class="creation-title">${c.title}</div><div class="creation-type">${c.type === 'static' ? 'Static' : 'Moving'}</div><div class="creation-price">${c.price}</div></div></div>`).join('');
}

function setupParticles() {
    const container = document.getElementById('particlesContainer');
    setInterval(() => {
        if (Math.random() > 0.7) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.width = Math.random() * 3 + 'px';
            p.style.height = p.style.width;
            p.style.background = 'rgba(255, 255, 255, ' + Math.random() * 0.5 + ')';
            p.style.borderRadius = '50%';
            p.style.animation = `float ${3 + Math.random() * 3}s ease-out forwards`;
            container.appendChild(p);
            setTimeout(() => p.remove(), 6000);
        }
    }, 300);
}

const style = document.createElement('style');
style.textContent = '@keyframes float { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-100px); } }';
document.head.appendChild(style);