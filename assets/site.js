/**
 * Chen Chen's Nashville Hot Chicken — Shared Site JavaScript
 * ===========================================================
 * Handles: header scroll, mobile nav, heat thermometer, scroll
 * reveal animations, store open/closed status, newsletter form.
 *
 * Expects COUNTRY_CONFIG to be defined before this script loads.
 */

(function () {
  'use strict';

  /* ── Utilities ─────────────────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Header Scroll Behavior ────────────────────────────────────────────── */
  const header = $('#siteHeader');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── Mobile Nav Toggle ─────────────────────────────────────────────────── */
  const navToggle = $('#navToggle');
  const siteNav = $('#siteNav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      siteNav.classList.toggle('open');
      document.body.style.overflow = siteNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    $$('.site-nav__link', siteNav).forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        siteNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (siteNav.classList.contains('open') &&
          !siteNav.contains(e.target) &&
          !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        siteNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── The Burn Scale (4 real heat levels) ─────────────────────────────────── */
  const HEAT_LEVELS = {
    1: {
      name: 'Southern',
      desc: 'Crispy, juicy, golden-fried chicken with zero spice — all crunch, no kick. Classic Southern herbs, buttermilk brine, and a beautiful golden crust. The foundation.',
      color: '#F5A623',
      rgb: '245, 166, 35'
    },
    2: {
      name: 'Mild',
      desc: 'An approachable warmth featuring our signature cayenne blend. Enough spice to highlight the classic Nashville heat while keeping the Szechuan flavor profile front and center.',
      color: '#FF8C42',
      rgb: '255, 140, 66'
    },
    3: {
      name: 'Medium',
      desc: 'Our signature balance. Traditional Nashville cayenne heat paired with a custom blend of Szechuan peppercorns, creating a layered, tingling warmth that builds gradually.',
      color: '#D42B2B',
      rgb: '212, 43, 43'
    },
    4: {
      name: 'Poultrygeist',
      desc: 'Our maximum heat level. Infused with Ghost pepper, Carolina Reaper, and pure Szechuan chili extract. Crafted for extreme heat enthusiasts while maintaining our signature flavor balance.',
      color: '#4A0E0E',
      rgb: '74, 14, 14'
    }
  };

  const heatCards = $$('.heat__card');
  const heatDesc = $('#heatDesc');
  const heatBarFill = $('#heatTrackFill');

  if (heatCards.length && heatDesc) {
    function setHeatLevel(level) {
      const data = HEAT_LEVELS[level];
      if (!data) return;

      // Update active card
      heatCards.forEach(c => {
        c.classList.remove('active');
        if (c.dataset.level === String(level)) c.classList.add('active');
      });

      // Update description
      heatDesc.textContent = data.desc;

      // Update CSS custom properties for ambient glow
      document.documentElement.style.setProperty('--heat-color', data.color);
      document.documentElement.style.setProperty('--heat-color-rgb', data.rgb);
      document.documentElement.style.setProperty('--heat-glow', `rgba(${data.rgb}, 0.2)`);

      // Update bar fill width
      if (heatBarFill) {
        const pct = ((level - 1) / (Object.keys(HEAT_LEVELS).length - 1)) * 100;
        heatBarFill.style.width = pct + '%';
      }
    }

    // Click handlers
    heatCards.forEach(card => {
      card.addEventListener('click', () => {
        setHeatLevel(parseInt(card.dataset.level, 10));
      });

      // Keyboard: Enter or Space
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setHeatLevel(parseInt(card.dataset.level, 10));
        }
      });
    });

    // Arrow key navigation within the cards container
    const cardsContainer = $('.heat__cards');
    if (cardsContainer) {
      cardsContainer.addEventListener('keydown', (e) => {
        const activeCard = cardsContainer.querySelector('.heat__card.active');
        if (!activeCard) return;
        const currentLevel = parseInt(activeCard.dataset.level, 10);
        const maxLevel = Object.keys(HEAT_LEVELS).length;

        if ((e.key === 'ArrowRight' || e.key === 'ArrowUp') && currentLevel < maxLevel) {
          e.preventDefault();
          const next = cardsContainer.querySelector(`[data-level="${currentLevel + 1}"]`);
          if (next) { next.focus(); setHeatLevel(currentLevel + 1); }
        } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowDown') && currentLevel > 1) {
          e.preventDefault();
          const prev = cardsContainer.querySelector(`[data-level="${currentLevel - 1}"]`);
          if (prev) { prev.focus(); setHeatLevel(currentLevel - 1); }
        }
      });
    }

    // Set initial level
    setHeatLevel(1);
  }

  /* ── Scroll Reveal Animations ──────────────────────────────────────────── */
  if (!prefersReducedMotion() && window.innerWidth > 768) {
    const revealEls = $$('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(el => observer.observe(el));
    } else {
      // Fallback: show everything
      revealEls.forEach(el => el.classList.add('visible'));
    }
  } else {
    // Reduced motion or mobile: no animation, just show immediately
    $$('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ── Store Open/Closed Status ──────────────────────────────────────────── */
  function updateStoreStatus() {
    if (typeof COUNTRY_CONFIG === 'undefined') return;
    const location = COUNTRY_CONFIG.locations && COUNTRY_CONFIG.locations[0];
    if (!location) return;

    const statusEl = $('#storeStatus');
    if (!statusEl) return;

    // If opening soon, show that instead
    if (COUNTRY_CONFIG.openingSoon) {
      statusEl.className = 'location__status location__status--soon';
      statusEl.innerHTML = '<span class="location__status-dot"></span> Opening Soon';
      return;
    }

    try {
      const tz = location.timezone || 'America/Toronto';
      const now = new Date();
      const options = { timeZone: tz, hour12: false, weekday: 'short', hour: '2-digit', minute: '2-digit' };
      const timeStr = now.toLocaleString('en-US', options);
      const match = timeStr.match(/^([A-Za-z]+),?\s+(\d{2}):(\d{2})$/);
      if (!match) return;

      const day = match[1];
      const totalMins = parseInt(match[2], 10) * 60 + parseInt(match[3], 10);

      // Find matching hours
      const dayMap = {
        'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0,
        'Fri': 1, 'Sat': 1,
        'Sun': 2
      };
      const idx = dayMap[day];
      if (idx === undefined) return;

      const h = location.hours[idx];
      if (!h) return;

      const [openH, openM] = h.open.split(':').map(Number);
      const [closeH, closeM] = h.close.split(':').map(Number);
      const openMins = openH * 60 + openM;
      const closeMins = closeH * 60 + closeM;

      const isOpen = totalMins >= openMins && totalMins < closeMins;

      if (isOpen) {
        const closeFormatted = closeH > 12 ? (closeH - 12) + ' PM' : closeH + ' AM';
        statusEl.className = 'location__status location__status--open';
        statusEl.innerHTML = `<span class="location__status-dot"></span> Open Now — Closes at ${closeFormatted}`;
      } else {
        statusEl.className = 'location__status location__status--closed';
        statusEl.innerHTML = '<span class="location__status-dot"></span> Closed — Opens at 11 AM';
      }
    } catch (e) {
      // Silently fail
    }
  }

  updateStoreStatus();
  setInterval(updateStoreStatus, 60000);

  /* ── Newsletter Form ───────────────────────────────────────────────────── */
  const nlForm = $('#newsletterForm');
  const nlSuccess = $('#newsletterSuccess');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = nlForm.querySelector('button[type="submit"]');
      const email = nlForm.querySelector('input[type="email"]');
      const originalText = btn.textContent;

      btn.textContent = 'Joining…';
      btn.disabled = true;

      // TODO: Replace with actual newsletter provider integration
      // e.g. Mailchimp, ConvertKit, SendGrid, etc.
      // Example:
      // fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: email.value })
      // }).then(...)

      setTimeout(() => {
        nlForm.style.display = 'none';
        if (nlSuccess) nlSuccess.style.display = 'block';
        try { localStorage.setItem('cc_newsletter', email.value); } catch (err) {}
      }, 800);
    });

    // Restore state
    try {
      if (localStorage.getItem('cc_newsletter')) {
        nlForm.style.display = 'none';
        if (nlSuccess) {
          nlSuccess.style.display = 'block';
          nlSuccess.textContent = 'You\'re on the list! We\'ll keep you posted.';
        }
      }
    } catch (e) {}
  }

  /* ── Opening Soon Banner — measure, scroll & dismiss ─────────────────────── */
  const openingBanner = $('#openingBanner');
  const bannerClose = $('#bannerClose');
  const headerEl = $('#siteHeader');

  // Hide banner if openingSoon config is false
  if (typeof COUNTRY_CONFIG !== 'undefined' && !COUNTRY_CONFIG.openingSoon) {
    if (openingBanner) {
      openingBanner.style.display = 'none';
    }
    document.body.classList.remove('has-banner');
  }

  let adjustTicking = false;
  function adjustHeaderPosition() {
    if (!headerEl) return;
    if (openingBanner && document.body.classList.contains('has-banner')) {
      const h = openingBanner.offsetHeight;
      document.documentElement.style.setProperty('--banner-h', h + 'px');
      
      const scrollY = window.scrollY;
      const topVal = Math.max(0, h - scrollY);
      headerEl.style.top = topVal + 'px';
    } else {
      document.documentElement.style.setProperty('--banner-h', '0px');
      headerEl.style.top = '0';
    }
  }

  function onScrollOrResize() {
    if (!adjustTicking) {
      window.requestAnimationFrame(() => {
        adjustHeaderPosition();
        adjustTicking = false;
      });
      adjustTicking = true;
    }
  }

  // Initial run
  adjustHeaderPosition();

  window.addEventListener('resize', onScrollOrResize);
  window.addEventListener('scroll', onScrollOrResize, { passive: true });

  if (bannerClose) {
    bannerClose.addEventListener('click', () => {
      if (openingBanner) {
        openingBanner.style.display = 'none';
        document.body.classList.remove('has-banner');
        adjustHeaderPosition();
      }
    });
  }

  /* ── Catering Form Inquiry ──────────────────────────────────────────────── */
  const cateringForm = $('#cateringForm');
  const cateringSuccess = $('#cateringSuccess');

  if (cateringForm) {
    cateringForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = cateringForm.querySelector('button[type="submit"]');
      btn.textContent = 'Submitting…';
      btn.disabled = true;

      // Simulate API submission
      setTimeout(() => {
        cateringForm.style.display = 'none';
        if (cateringSuccess) {
          cateringSuccess.style.display = 'block';
          cateringSuccess.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
        }
      }, 1000);
    });
  }

  /* ── Smooth Scroll for Anchor Links ────────────────────────────────────── */
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId === '#top') return;
      const target = $(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      }
    });
  });

})();
