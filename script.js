// ================================
// script.js — Ajmir Ahmed Portfolio
// Beginner-Friendly JS + Animations
// ================================


// --- 1. SMOOTH SCROLL FOR NAV LINKS ---
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// --- 2. HIGHLIGHT ACTIVE NAV LINK ON SCROLL ---
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 120;

  sections.forEach(function(section) {
    const sectionTop    = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(function(link) { link.style.color = ''; });
      const activeLink = document.querySelector('.nav-menu a[href="#' + sectionId + '"]');
      if (activeLink) activeLink.style.color = '#27ae60';
    }
  });
});


// --- 3. TYPING EFFECT FOR THE NAME ---
// Types out "Ajmir Ahmed" letter by letter on page load

const typedName = document.getElementById('typed-name');
const fullName  = 'Ajmir Ahmed';
let charIndex   = 0;

function typeLetter() {
  if (charIndex < fullName.length) {
    typedName.textContent += fullName.charAt(charIndex);
    charIndex++;
    setTimeout(typeLetter, 100); // 100ms between each letter
  }
}

// Start typing after a short delay (lets the page settle first)
setTimeout(typeLetter, 500);


// --- 4. GREETING BASED ON TIME OF DAY ---
const greetingEl = document.querySelector('.greeting');

if (greetingEl) {
  const hour = new Date().getHours();
  if (hour < 12) {
    greetingEl.textContent = '☀️ Good morning, I\'m';
  } else if (hour < 18) {
    greetingEl.textContent = '👋 Good afternoon, I\'m';
  } else {
    greetingEl.textContent = '🌙 Good evening, I\'m';
  }
}


// --- 5. SCROLL REVEAL FOR CARDS ---
// Cards slide up + fade in when they scroll into view

const revealCards = document.querySelectorAll('.scroll-reveal');

const cardObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // triggers the CSS transition
    }
  });
}, { threshold: 0.15 });

revealCards.forEach(function(card) {
  cardObserver.observe(card);
});


// --- 6. ANIMATE SECTION TITLE UNDERLINES ---
// The green underline under each section title grows when visible

const titles = document.querySelectorAll('.animate-title');

const titleObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('title-visible'); // triggers CSS width: 60px
    }
  });
}, { threshold: 0.5 });

titles.forEach(function(title) {
  titleObserver.observe(title);
});


// --- 7. ANIMATE SKILL PROGRESS BARS ---
// Progress bars fill up when the skills section scrolls into view

function animateSkillBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  progressBars.forEach(function(bar) {
    const targetWidth = bar.getAttribute('data-width');
    bar.style.width = targetWidth + '%';
  });
}

const skillsSection = document.querySelector('.skills-section');

const skillObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      animateSkillBars();
      skillObserver.disconnect(); // only run once
    }
  });
}, { threshold: 0.3 });

if (skillsSection) skillObserver.observe(skillsSection);


// --- 8. BADGE POP-IN ANIMATION ---
// Badges pop in one by one when the badges container is visible

const badgesContainer = document.querySelector('.badges');

if (badgesContainer) {
  // Hide badges initially
  badgesContainer.classList.add('badges-hidden');

  const badgeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Remove hidden, add animate to trigger pop-in keyframes
        badgesContainer.classList.remove('badges-hidden');
        badgesContainer.classList.add('badges-animate');
        badgeObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });

  badgeObserver.observe(badgesContainer);
}


// --- 9. CARD ICON BOUNCE ON HOVER (re-trigger) ---
// Re-applies the bounce animation each time you hover a card icon

document.querySelectorAll('.card').forEach(function(card) {
  card.addEventListener('mouseenter', function() {
    const icon = card.querySelector('.bounce-icon');
    if (icon) {
      // Remove and re-add animation to replay it
      icon.style.animation = 'none';
      setTimeout(function() {
        icon.style.animation = 'bounceIcon 0.6s ease';
      }, 10);
    }
  });
});


// --- Done! ---
console.log('✅ Portfolio loaded with animations! — Ajmir Ahmed');