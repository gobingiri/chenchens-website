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
      btn.textContent = 'Opening Email...';
      
      const name = $('#catName').value;
      const email = $('#catEmail').value;
      const subject = $('#catSubject').value;
      const message = $('#catMessage').value;
      
      const targetEmail = (typeof COUNTRY_CONFIG !== 'undefined' && COUNTRY_CONFIG.country === 'ca') 
        ? 'chenchensthewell@gmail.com' 
        : 'chenchenshotchicken@gmail.com';

      const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message)}`;
      window.location.href = mailtoLink;

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

  /* ── Dynamic Instagram Feed ────────────────────────────────────────────── */
  function loadInstagramFeed() {
    if (typeof COUNTRY_CONFIG === 'undefined' || !COUNTRY_CONFIG.social || !COUNTRY_CONFIG.social.instagramFeedUrl) return;

    const grid = $('#instagramFeedGrid');
    if (!grid) return;

    fetch(COUNTRY_CONFIG.social.instagramFeedUrl)
      .then(res => res.json())
      .then(data => {
        // Support multiple feed formats (Behold.so, NoCodeAPI, standard Graph API payload)
        const posts = Array.isArray(data) ? data : (data.data || []);
        if (!posts.length) return;

        // Display the first 8 posts
        const items = posts.slice(0, 8);
        let html = '';

        items.forEach(post => {
          const imgUrl = post.mediaUrl || post.media_url || '';
          const link = post.permalink || '';
          const caption = post.caption || "Chen Chen's Nashville Hot Chicken Instagram post";

          if (imgUrl) {
            html += `
              <a href="${link}" target="_blank" rel="noopener" aria-label="View post on Instagram">
                <img src="${imgUrl}" alt="${caption.replace(/"/g, '&quot;')}" width="400" height="400" loading="lazy">
              </a>
            `;
          }
        });

        if (html) {
          grid.innerHTML = html;
        }
      })
      .catch(err => {
        // Fallback silently to our high-quality optimized local images if fetch fails or is rate-limited
        console.warn('Instagram feed load failed. Falling back to local grid.', err);
      });
  }

  loadInstagramFeed();

})();
