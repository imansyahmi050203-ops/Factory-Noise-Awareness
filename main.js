// js/main.js

// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    }
});

// ============================================
// NAVIGATION
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// PARTICLES ANIMATION (Hero Section)
// ============================================
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particlesContainer.appendChild(particle);
}

// ============================================
// COUNTER ANIMATION (Stats)
// ============================================
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-count'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const revealElements = document.querySelectorAll('[data-aos]');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ============================================
// HIERARCHY PYRAMID INTERACTION
// ============================================
document.querySelectorAll('.pyramid-level').forEach(level => {
    level.addEventListener('click', () => {
        // Toggle active state
        level.classList.toggle('active');
    });
});

// ============================================
// CHECKLIST INTERACTION
// ============================================
const checklistItems = document.querySelectorAll('.checklist-item');
const progressRing = document.getElementById('progressRing');
const progressPercent = document.getElementById('progressPercent');

if (checklistItems.length > 0) {
    checklistItems.forEach(item => {
        item.addEventListener('click', () => {
            const isChecked = item.getAttribute('data-checked') === 'true';
            item.setAttribute('data-checked', !isChecked);
            updateProgress();
        });
    });
}

function updateProgress() {
    const total = checklistItems.length;
    const checked = document.querySelectorAll('.checklist-item[data-checked="true"]').length;
    const percent = Math.round((checked / total) * 100);
    
    if (progressPercent) {
        progressPercent.textContent = percent;
    }
    
    if (progressRing) {
        // Circumference = 2 * PI * r = 2 * 3.14159 * 45 ≈ 283
        const circumference = 283;
        const offset = circumference - (percent / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }
}

// ============================================
// NOISE EXPOSURE CALCULATOR
// ============================================
let entryCount = 1;

function addEntry() {
    entryCount++;
    const entriesContainer = document.getElementById('exposureEntries');
    
    const newEntry = document.createElement('div');
    newEntry.className = 'exposure-entry';
    newEntry.setAttribute('data-entry', entryCount);
    newEntry.innerHTML = `
        <div class="entry-header">
            <span class="entry-number">Activity ${entryCount}</span>
            <button class="remove-entry" onclick="removeEntry(this)" aria-label="Remove entry">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="entry-fields">
            <div class="field-group">
                <label>Noise Level (dB)</label>
                <input type="number" class="noise-level" min="70" max="140" value="85" placeholder="85">
            </div>
            <div class="field-group">
                <label>Duration (hours)</label>
                <input type="number" class="duration" min="0.25" max="12" step="0.25" value="2" placeholder="2">
            </div>
        </div>
    `;
    
    entriesContainer.appendChild(newEntry);
}

function removeEntry(button) {
    const entry = button.closest('.exposure-entry');
    const entries = document.querySelectorAll('.exposure-entry');
    
    if (entries.length > 1) {
        entry.remove();
    }
}

function calculateDose() {
    const entries = document.querySelectorAll('.exposure-entry');
    let totalDose = 0;
    
    entries.forEach(entry => {
        const dB = parseFloat(entry.querySelector('.noise-level').value) || 0;
        const hours = parseFloat(entry.querySelector('.duration').value) || 0;
        
        if (dB >= 85 && hours > 0) {
            // OSHA formula: Allowed time = 8 / (2^((dB-90)/5))
            // Simplified: For every 5 dB above 90, time halves
            const allowedHours = 8 / Math.pow(2, (dB - 90) / 5);
            const dose = (hours / allowedHours) * 100;
            totalDose += dose;
        }
    });
    
    // Update display
    const doseFill = document.getElementById('doseFill');
    const doseValue = document.getElementById('doseValue');
    const resultMessage = document.getElementById('resultMessage');
    
    const displayDose = Math.min(totalDose, 200);
    
    if (doseFill) {
        doseFill.style.width = Math.min(displayDose, 100) + '%';
    }
    
    if (doseValue) {
        doseValue.textContent = Math.round(totalDose) + '%';
    }
    
    if (resultMessage) {
        resultMessage.className = 'result-message';
        
        if (totalDose <= 50) {
            resultMessage.classList.add('safe');
            resultMessage.innerHTML = '<p><strong>✓ Safe Exposure</strong><br>Your daily noise dose is within safe limits. Continue using hearing protection in noisy areas.</p>';
        } else if (totalDose <= 100) {
            resultMessage.classList.add('warning');
            resultMessage.innerHTML = '<p><strong>⚠ Approaching Limit</strong><br>You are approaching the maximum daily exposure. Consider reducing time in noisy areas or using better protection.</p>';
        } else {
            resultMessage.classList.add('danger');
            resultMessage.innerHTML = '<p><strong>✗ Overexposure</strong><br>You have exceeded the safe daily noise dose. This puts you at high risk for hearing damage. Immediate action required!</p>';
        }
    }
    
    // Save to Firebase (anonymized)
    if (typeof FirebaseDB !== 'undefined') {
        FirebaseDB.saveQuizResult({
            type: 'calculator',
            dosePercent: Math.round(totalDose),
            timestamp: new Date().toISOString()
        }).catch(err => console.log('Firebase save skipped'));
    }
}

// ============================================
// SOUND BUTTONS (Decibel Section)
// ============================================
document.querySelectorAll('.sound-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const sound = btn.getAttribute('data-sound');
        const dB = btn.getAttribute('data-db');
        
        // Visual feedback
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 100);
        
        // In a real implementation, you would play actual sound files here
        // For demo purposes, we'll just show a notification
        showNotification(`Playing ${sound} sound at safe demonstration level (original: ${dB} dB)`);
    });
});

// ============================================
// NOTIFICATION HELPER
// ============================================
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(74, 144, 217, 0.95);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
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

console.log('Main.js loaded successfully');
