/**
 * Nuoi Toi - Main JavaScript
 * Handles animations, interactions, and UI functionality
 */

(function() {
  'use strict';

  // ===================================
  // DOM Elements
  // ===================================
  const elements = {
    header: document.querySelector('.header'),
    navToggle: document.querySelector('.nav__toggle'),
    navMenu: document.querySelector('.nav__menu'),
    navLinks: document.querySelectorAll('.nav__link'),
    stats: document.querySelectorAll('.stat__value[data-count]'),
    fadeElements: document.querySelectorAll('.about__card, .comparison__row, .breakdown-item, .donate__card'),
    copyables: document.querySelectorAll('.copyable'),
  };

  // ===================================
  // Header Scroll Effect
  // ===================================
  function initHeaderScroll() {
    let lastScroll = 0;

    function handleScroll() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        elements.header.classList.add('scrolled');
      } else {
        elements.header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', throttle(handleScroll, 100));
  }

  // ===================================
  // Mobile Navigation
  // ===================================
  function initMobileNav() {
    if (!elements.navToggle || !elements.navMenu) return;

    elements.navToggle.addEventListener('click', () => {
      elements.navMenu.classList.toggle('active');
      const icon = elements.navToggle.querySelector('i');
      icon.classList.toggle('ri-menu-line');
      icon.classList.toggle('ri-close-line');
    });

    // Close menu on link click
    elements.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        elements.navMenu.classList.remove('active');
        const icon = elements.navToggle.querySelector('i');
        icon.classList.add('ri-menu-line');
        icon.classList.remove('ri-close-line');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav') && elements.navMenu.classList.contains('active')) {
        elements.navMenu.classList.remove('active');
        const icon = elements.navToggle.querySelector('i');
        icon.classList.add('ri-menu-line');
        icon.classList.remove('ri-close-line');
      }
    });
  }

  // ===================================
  // Smooth Scroll
  // ===================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ===================================
  // Counter Animation
  // ===================================
  function initCounters() {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.stats.forEach(stat => counterObserver.observe(stat));
  }

  function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function updateCounter() {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // ===================================
  // Fade In Animation
  // ===================================
  function initFadeAnimations() {
    elements.fadeElements.forEach(el => el.classList.add('fade-in'));

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px'
    });

    elements.fadeElements.forEach((el, index) => {
      // Giảm delay giữa các elements (0.05s thay vì 0.1s)
      el.style.transitionDelay = `${index * 0.05}s`;
      fadeObserver.observe(el);
    });
  }

  // ===================================
  // Copy to Clipboard
  // ===================================
  function initCopyToClipboard() {
    elements.copyables.forEach(el => {
      el.addEventListener('click', async () => {
        const text = el.dataset.copy;
        try {
          await navigator.clipboard.writeText(text);
          showToast('Đã sao chép!');
        } catch (err) {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showToast('Đã sao chép!');
        }
      });
    });
  }

  // ===================================
  // Toast Notification
  // ===================================
  function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Hide toast after delay
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // ===================================
  // Coffee Tier Selection
  // ===================================
  function initCoffeeTiers() {
    const tiers = document.querySelectorAll('.coffee-tier');
    const coffeeLink = document.querySelector('.btn--coffee');

    tiers.forEach(tier => {
      tier.addEventListener('click', () => {
        // Remove active from all
        tiers.forEach(t => t.style.borderColor = '');
        // Add active to clicked
        tier.style.borderColor = 'var(--color-primary)';

        // Update link with amount
        const amount = tier.dataset.amount;
        if (coffeeLink) {
          const baseUrl = coffeeLink.href.split('?')[0];
          coffeeLink.href = `${baseUrl}?amount=${amount}`;
        }
      });
    });
  }

  // ===================================
  // Progress Ring Animation
  // ===================================
  function initProgressRing() {
    const ring = document.querySelector('.progress-ring__fill');
    if (!ring) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate from 283 (0%) to target value
          ring.style.transition = 'stroke-dashoffset 1.5s ease-out';
          // Current value is 70 (75%)
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(ring);
  }

  // ===================================
  // Update Last Update Time
  // ===================================
  function initUpdateTime() {
    const timeEl = document.querySelector('.transparency__update time');
    if (!timeEl) return;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0);

    // Format date as YYYY-MM-DD for datetime attribute
    const formatDateISO = (date) => {
      return date.toISOString().split('T')[0];
    };

    // Format date as DD/MM/YYYY for display
    const formatDateDisplay = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    if (now >= today) {
      timeEl.setAttribute('datetime', formatDateISO(today));
      timeEl.textContent = `${formatDateDisplay(today)}, 06:00 AM`;
    } else {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      timeEl.setAttribute('datetime', formatDateISO(yesterday));
      timeEl.textContent = `${formatDateDisplay(yesterday)}, 06:00 AM`;
    }
  }

  // ===================================
  // Utility Functions
  // ===================================
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // ===================================
  // Donut Chart Hover Effects
  // ===================================
  function initDonutHover() {
    const segments = document.querySelectorAll('.donut-segment');
    const breakdownItems = document.querySelectorAll('.breakdown-item');

    breakdownItems.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        segments.forEach((seg, i) => {
          if (i === index) {
            seg.style.strokeWidth = '35';
            seg.style.filter = 'brightness(1.1)';
          } else {
            seg.style.opacity = '0.5';
          }
        });
      });

      item.addEventListener('mouseleave', () => {
        segments.forEach(seg => {
          seg.style.strokeWidth = '30';
          seg.style.filter = '';
          seg.style.opacity = '1';
        });
      });
    });
  }

  // ===================================
  // Initialize All
  // ===================================
  function init() {
    initHeaderScroll();
    initMobileNav();
    initSmoothScroll();
    initCounters();
    initFadeAnimations();
    initCopyToClipboard();
    initCoffeeTiers();
    initProgressRing();
    initUpdateTime();
    initDonutHover();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
