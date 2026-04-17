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
    'img/accom/accom-1.jpeg', 'img/accom/accom-2.jpeg', 'img/accom/accom-3.jpeg',
    'img/accom/accom-4.jpeg', 'img/accom/accom-5.jpeg',
    'img/accom/bedroom-1.jpeg', 'img/accom/bedroom-2.jpeg', 'img/accom/bedroom-3.jpeg',
    'img/accom/bedroom-4.jpeg', 'img/accom/bedroom-5.jpeg', 'img/accom/bedroom-6.jpeg',
    'img/accom/bedroom-7.jpeg', 'img/accom/bedroom-8.jpeg'
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
