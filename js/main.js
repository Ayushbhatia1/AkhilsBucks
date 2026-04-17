// ===== THEME TOGGLE =====
(function () {
  var KEY = 'akhilsbucks-theme';

  function getPreferred() {
    return localStorage.getItem(KEY) || 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
  }

  applyTheme(getPreferred());

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.theme-toggle, .mob-theme-link').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var current = document.documentElement.getAttribute('data-theme') || 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });
  });
})();

// ===== COUNTDOWN TIMER =====
(function () {
  const TARGET = new Date('2026-08-12T00:00:00+12:00'); // NZST

  function updateCountdown() {
    const now = new Date();
    const diff = TARGET - now;

    const el = {
      days: document.getElementById('cd-days'),
      hours: document.getElementById('cd-hours'),
      minutes: document.getElementById('cd-minutes'),
      seconds: document.getElementById('cd-seconds'),
    };

    if (!el.days) return;

    if (diff <= 0) {
      el.days.textContent = '0';
      el.hours.textContent = '0';
      el.minutes.textContent = '0';
      el.seconds.textContent = '0';

      const container = document.querySelector('.countdown');
      if (container && !document.getElementById('cd-live')) {
        const badge = document.createElement('div');
        badge.id = 'cd-live';
        badge.className = 'hero-eyebrow';
        badge.style.marginTop = '1rem';
        badge.textContent = "IT'S GO TIME";
        container.after(badge);
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    el.days.textContent = days;
    el.hours.textContent = hours;
    el.minutes.textContent = minutes;
    el.seconds.textContent = seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

// ===== MOBILE NAV =====
(function () {
  var hamburger = document.getElementById('mob-hamburger');
  var overlay = document.getElementById('mob-overlay');
  var closeBtn = document.getElementById('mob-close');

  if (!hamburger || !overlay) return;

  function openMenu() {
    overlay.classList.add('open');
    hamburger.style.display = 'none';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('open');
    hamburger.style.display = '';
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeMenu();
  });

  // Mark active link
  var page = window.location.pathname.split('/').pop() || 'index.html';
  overlay.querySelectorAll('a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('mob-active');
  });
})();

// ===== ACTIVE NAV LINK (desktop) =====
(function () {
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ===== FLIGHTS PRICE TOGGLE =====
(function () {
  const buttons = document.querySelectorAll('.price-toggle-btn');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      if (btn.dataset.mode === 'points') {
        document.body.classList.add('show-points');
      } else {
        document.body.classList.remove('show-points');
      }
    });
  });
})();

// ===== HERO SNOWFALL =====
(function () {
  var container = document.getElementById('hero-snow-container');
  if (!container) return;
  for (var i = 0; i < 35; i++) {
    var flake = document.createElement('div');
    flake.className = 'hs-flake';
    flake.style.left = Math.random() * 100 + '%';
    var size = 1.5 + Math.random() * 3;
    flake.style.width = size + 'px';
    flake.style.height = size + 'px';
    flake.style.animationDuration = (4 + Math.random() * 6) + 's';
    flake.style.animationDelay = (Math.random() * 8) + 's';
    flake.style.opacity = (0.2 + Math.random() * 0.5).toString();
    container.appendChild(flake);
  }
})();

// ===== SCROLL FADE-IN (Intersection Observer) =====
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.observe').forEach((el) => observer.observe(el));
})();

// ===== SNOWBOARDING INFO MODAL =====
(function () {
  var openBtn = document.getElementById('snow-modal-open');
  var modal = document.getElementById('snow-modal');
  var closeBtn = document.getElementById('snow-modal-close');

  if (!openBtn || !modal) return;

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // Tabs
  var tabs = modal.querySelectorAll('.modal-tab');
  var panels = modal.querySelectorAll('.modal-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      var target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
})();

// ===== ACCOMMODATION LIGHTBOX =====
(function () {
  var lightbox = document.getElementById('accom-lightbox');
  if (!lightbox) return;

  var lbImg = document.getElementById('lb-img');
  var lbCounter = document.getElementById('lb-counter');
  var images = [
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/aac422fe-46ba-4184-8717-20b4ebd2f6ad.jpeg?im_w=1440',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/4a48d77a-7aa4-4cda-8f7e-ccb5977412a2.jpeg?im_w=1440',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/6bd6cd64-b028-4ce5-a6be-1705043a32b9.jpeg?im_w=1440',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/abda1943-92a1-4118-8ecb-a83732412bd5.jpeg?im_w=1440',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/3c04e82a-b995-4f2e-8586-1053b4ab8e54.jpeg?im_w=1440',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/86ede21d-b858-4a15-90c3-501427304532.jpeg?im_w=1440',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/d95ebdc4-62d4-43ec-b078-dd1763322f0c.jpeg?im_w=1200',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/fb688e41-5ea3-4e16-bf24-e9a082f212ad.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/b209e33d-4bfc-47ff-97ca-eddc763feb57.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/c3e1e4b5-5882-49e5-8606-612c3dfcc84d.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/3011df27-e80a-4482-baaf-b70e1885ce4e.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/70af1338-9815-4241-9114-5a52f42a0308.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/6565acb0-10b0-44f3-85cd-4c2218c8a7fd.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/c54d9f81-9919-46bf-b131-d94f86463d06.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/fcbf6269-9dc1-4867-b9fe-69bb3ce11c64.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570395564141763491/original/63f7c52c-5b59-43fd-b227-4e9b1dc12731.jpeg?im_w=720'
  ];
  var current = 0;

  function show(i) {
    current = (i + images.length) % images.length;
    lbImg.src = images[current];
    lbCounter.textContent = (current + 1) + ' / ' + images.length;
  }

  function open(i) {
    show(i);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-lb]').forEach(function (el) {
    el.addEventListener('click', function () { open(parseInt(el.dataset.lb)); });
  });

  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', function () { show(current - 1); });
  document.getElementById('lb-next').addEventListener('click', function () { show(current + 1); });

  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();
