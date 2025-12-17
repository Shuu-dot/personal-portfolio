// ====== ANIMATIONS & PARTICLES ======

// Petal particles
for(let i=0;i<10;i++){
  const petal = document.createElement('div');
  petal.classList.add('petal');
  petal.style.top = Math.random()*100+'%';
  petal.style.left = Math.random()*100+'%';
  petal.style.animationDuration = (5+Math.random()*5)+'s';
  petal.style.width = petal.style.height = (10+Math.random()*15)+'px';
  petal.style.opacity = 0.3 + Math.random()*0.2;
  document.body.appendChild(petal);
}

// Scroll-triggered fade & lift
const faders = document.querySelectorAll('.fade-lift');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.2});
faders.forEach(fader => observer.observe(fader));

// Cursor ribbon trail
const ribbons = [];
for(let i=0; i<15; i++){
  const div = document.createElement('div');
  div.classList.add('cursor-ribbon');
  document.body.appendChild(div);
  ribbons.push(div);
}
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function animateRibbons(){
  let x = mouseX, y = mouseY;
  ribbons.forEach(r => {
    r.style.transform = `translate(${x-10}px,${y-10}px)`;
    x += 5; y += 5;
  });
  requestAnimationFrame(animateRibbons);
}
animateRibbons();

// ====== PARALLAX SCROLLING FOR SECTIONS ======

// Apply smooth parallax to sections for depth effect
const sections = document.querySelectorAll('.section');
function updateSectionParallax(){
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const offset = scrollPercent * 40 - 20; // -20px to +20px range
    section.style.transform = `translateY(${offset * 0.5}px)`;
  });
}

window.addEventListener('scroll', updateSectionParallax, {passive: true});
// Initial call
updateSectionParallax();

// ====== NAVIGATION & BUTTONS ======

// Mobile nav toggle
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
if(navToggle){
  navToggle.addEventListener('click', () => {
    if(nav) nav.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if(href && href !== '#' && href.startsWith('#')){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
      if(nav && nav.classList.contains('open')){
        nav.classList.remove('open');
        if(navToggle) navToggle.classList.remove('open');
      }
    }
  });
});

// ====== FORM HANDLER ======

// Contact form handler (simulated - replace with real API endpoint)
function handleContact(e){
  e.preventDefault();
  const form = e.target;
  const msg = (form.message && form.message.value) || '';
  if(!msg.trim()) return;
  alert('Thanks for reaching out! I\'ll get back to you soon.');
  form.reset();
}

// ====== THEME & READING MODE TOGGLES ======

// Reading mode toggle
const readingToggle = document.getElementById('readingToggle');
if(readingToggle){
  readingToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('reading-mode');
    const on = document.documentElement.classList.contains('reading-mode');
    localStorage.setItem('readingMode', on ? '1' : '0');
  });
}
// Restore reading mode preference
if(localStorage.getItem('readingMode') === '1'){
  document.documentElement.classList.add('reading-mode');
}

// Dark/Light theme toggle
const themeToggle = document.getElementById('themeToggle');
if(themeToggle){
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const dark = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', dark ? '1' : '0');
  });
}
// Restore theme preference
if(localStorage.getItem('darkMode') === '1'){
  document.documentElement.classList.add('dark');
}

// ====== PARTICLE EFFECTS TOGGLE ======

// Pink particles toggle
const pinkParticlesToggle = document.getElementById('pinkParticlesToggle');
let pinkParticlesEnabled = true;
if(pinkParticlesToggle){
  pinkParticlesToggle.addEventListener('click', () => {
    pinkParticlesEnabled = !pinkParticlesEnabled;
    // Show/hide all petal particles
    document.querySelectorAll('.petal').forEach(petal => {
      petal.style.display = pinkParticlesEnabled ? 'block' : 'none';
    });
  });
}

// ====== SHIMMER EFFECTS TOGGLE ======

// Falling stars toggle
const fallingStarsToggle = document.getElementById('fallingStarsToggle');
let fallingStarsEnabled = true;
if(fallingStarsToggle){
  fallingStarsToggle.addEventListener('click', () => {
    fallingStarsEnabled = !fallingStarsEnabled;
    if (!fallingStarsEnabled) {
      while (fallingStars.length) {
        fallingStars.pop().remove();
      }
    }
  });
}

// ====== SHOOTING STAR BACKGROUND ANIMATION ======
const shootingStarBg = document.querySelector('.shooting-star-bg');

// ====== FALLING STARS BACKGROUND ANIMATION ======
const FALLING_STAR_COUNT = 12;
const fallingStars = [];

function createFallingStar() {
  if (!fallingStarsEnabled) return;
  const star = document.createElement('div');
  star.className = 'falling-star';
  star.style.left = Math.random() * 100 + 'vw';
  star.style.top = '-40px';
  star.style.fontSize = (Math.random() * 1.2 + 1) + 'rem';
  star.style.opacity = Math.random() * 0.3 + 0.2;
  star.style.color = '#FFD700'; // yellow
  star.textContent = '★';
  document.body.appendChild(star);
  fallingStars.push(star);
  animateFallingStar(star);
}

function animateFallingStar(star) {
  const duration = Math.random() * 2 + 2.5;
  star.animate([
    { transform: 'translateY(0)', opacity: star.style.opacity },
    { transform: 'translateY(100vh)', opacity: 0.2 }
  ], {
    duration: duration * 1000,
    easing: 'ease-in',
    fill: 'forwards'
  });
  setTimeout(() => {
    star.remove();
    const idx = fallingStars.indexOf(star);
    if (idx > -1) fallingStars.splice(idx, 1);
  }, duration * 1000);
}

function fallingStarLoop() {
  if (fallingStarsEnabled) {
    // Create more stars per loop for higher density
    for (let i = 0; i < 3; i++) {
      createFallingStar();
    }
  }
  setTimeout(fallingStarLoop, Math.random() * 600 + 400);
}
fallingStarLoop();

// Toggle falling stars with shimmer button
if (shimmerToggle) {
  shimmerToggle.addEventListener('click', () => {
    fallingStarsEnabled = !fallingStarsEnabled;
    if (!fallingStarsEnabled) {
      while (fallingStars.length) {
        fallingStars.pop().remove();
      }
    }
  });
}
// ====== REVEAL ANIMATIONS ======

// IntersectionObserver for fade-lift and wipe animations
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      if(entry.target.classList.contains('wipe')) entry.target.classList.add('revealed');
    }
  });
}, {threshold: 0.18});
document.querySelectorAll('.fade-lift, .wipe').forEach(el => revealObserver.observe(el));

// ====== PASTEL PARTICLE CANVAS ======

// Soft pastel particle background with parallax & cursor shimmer
const canvas = document.createElement('canvas');
canvas.id = 'bgParticles';
canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-2;pointer-events:none;';
if(!particlesEnabled) canvas.style.display = 'none'; // Respect particle toggle preference
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let DPR = window.devicePixelRatio || 1;

function resizeCanvas(){
  canvas.width = innerWidth * DPR;
  canvas.height = innerHeight * DPR;
  ctx.scale(DPR, DPR);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create pastel particles with shimmer effect
const particles = [];
for(let i=0; i<48; i++){
  particles.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: 4 + Math.random() * 16,
    vx: (Math.random() - 0.5) * 0.08,
    vy: (Math.random() - 0.5) * 0.08,
    hue: 280 + Math.random() * 80,
    alpha: 0.04 + Math.random() * 0.12,
    shimmerPhase: Math.random() * Math.PI * 2,
    shimmerSpeed: 0.008 + Math.random() * 0.012,
    baseAlpha: 0.04 + Math.random() * 0.12
  });
}

let mouse = {x: innerWidth / 2, y: innerHeight / 2};
let scrollY_smooth = 0;
let scrollVelocity = 0;

document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Smooth scroll parallax with easing
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
  scrollVelocity = lastScrollY - scrollY_smooth;
}, {passive: true});

function animateScrollParallax(){
  // Ease toward actual scroll position for smooth curve effect
  scrollY_smooth += (lastScrollY - scrollY_smooth) * 0.12;
  requestAnimationFrame(animateScrollParallax);
}
animateScrollParallax();

function drawParticles(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  
  particles.forEach((p, i) => {
    // Smooth parallax from scroll with easing curve
    const scrollFactor = scrollY_smooth * (0.0005 + i * 0.00003);
    const depth = (i % 5) + 1; // 5 depth layers for parallax
    const parallaxOffset = scrollY_smooth * 0.0008 * depth;
    
    // Cursor attraction with smooth easing
    const dx = (mouse.x - p.x) * 0.0015;
    const dy = (mouse.y - p.y) * 0.0015;
    
    p.x += p.vx + dx;
    p.y += p.vy + dy + parallaxOffset * 0.5;
    
    // Floating animation with sine wave for smooth drift
    const floatOffset = Math.sin(Date.now() * 0.0003 + p.shimmerPhase) * 0.3;
    p.y += floatOffset * 0.02;
    
    // Wrap around edges
    if(p.x < -50) p.x = innerWidth + 50;
    if(p.x > innerWidth + 50) p.x = -50;
    if(p.y < -50) p.y = innerHeight + 50;
    if(p.y > innerHeight + 50) p.y = -50;
    
    // Shimmer effect - pulsing alpha for glow
    p.shimmerPhase += p.shimmerSpeed;
    const shimmer = Math.sin(p.shimmerPhase) * 0.5 + 0.5; // 0 to 1
    const shimmerAlpha = p.baseAlpha + (shimmer * 0.08);
    
    // Draw radial gradient particle with shimmer
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    grad.addColorStop(0, `hsla(${p.hue}, 65%, 80%, ${shimmerAlpha})`);
    grad.addColorStop(0.5, `hsla(${p.hue}, 60%, 75%, ${shimmerAlpha * 0.6})`);
    grad.addColorStop(1, `hsla(${p.hue}, 60%, 75%, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    
    // Add extra shimmer highlight for enhanced glow
    if(shimmer > 0.7){
      const highlightGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 0.6);
      highlightGrad.addColorStop(0, `hsla(0, 100%, 100%, ${shimmerAlpha * (shimmer - 0.7) * 2})`);
      highlightGrad.addColorStop(1, `hsla(0, 100%, 100%, 0)`);
      ctx.fillStyle = highlightGrad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  
  ctx.restore();
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ====== FOOTER & VISITOR COUNTER ======

// Set current year in footer
const yearEl = document.getElementById('year');
if(yearEl){
  yearEl.textContent = new Date().getFullYear();
}

// Last updated footer
const lastUpdatedEl = document.createElement('div');
lastUpdatedEl.className = 'last-updated muted';
lastUpdatedEl.style.cssText = 'font-size:0.85rem;margin-top:0.5rem;opacity:0.6;';
lastUpdatedEl.textContent = 'Last updated: ' + (document.lastModified || new Date().toLocaleString());
const footerInner = document.querySelector('.footer-inner');
if(footerInner){
  footerInner.appendChild(lastUpdatedEl);
}

// Live visitor counter (local placeholder using localStorage)
const visitorCounter = document.createElement('div');
visitorCounter.className = 'visitor-counter';
visitorCounter.innerHTML = '<span class="dot" aria-hidden="true">●</span> <span class="count">0</span>';
visitorCounter.title = 'Visitor counter (local placeholder)';
visitorCounter.style.cssText = 'position:fixed;right:14px;bottom:14px;background:rgba(255,255,255,0.9);padding:.4rem .6rem;border-radius:999px;box-shadow:0 6px 16px rgba(0,0,0,0.08);font-size:0.95rem;z-index:9999;color:#6b2741;font-weight:600;';
document.body.appendChild(visitorCounter);

let count = parseInt(localStorage.getItem('visitorCounter') || '0', 10);
count = isNaN(count) ? 1 : count + 1;
localStorage.setItem('visitorCounter', String(count));
visitorCounter.querySelector('.count').textContent = String(count);
