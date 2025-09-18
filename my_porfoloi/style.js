// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const scrollProgress = document.querySelector(".progress-bar");
  const backToTop = document.getElementById("backToTop");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update scroll progress
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  scrollProgress.style.width = `${(scrolled / scrollable) * 100}%`;

  // Show/hide back to top button
  if (scrolled > 500) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});

// Back to top button
document.getElementById("backToTop").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("active");

  // Toggle menu icon
  const icon = mobileMenuBtn.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.className = "fas fa-times wow-icon";
  } else {
    icon.className = "fas fa-bars wow-icon";
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
    mobileMenuBtn.querySelector("i").className = "fas fa-bars wow-icon";
  });
});

// Custom cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", function (e) {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  setTimeout(function () {
    cursorFollower.style.left = e.clientX + "px";
    cursorFollower.style.top = e.clientY + "px";
  }, 100);
});

// Cursor hover effect
document
  .querySelectorAll(
    "a, button, .btn, .project-card, .skill-card, .social-link, .social-media-link, .download-btn"
  )
  .forEach((item) => {
    item.addEventListener("mouseenter", function () {
      cursor.classList.add("hover");
    });

    item.addEventListener("mouseleave", function () {
      cursor.classList.remove("hover");
    });
  });

// Typed text effect
const typedText = document.getElementById("typedText");
const phrases = [
  "Développement Frontend",
  "Développement Backend",
  "Applications Web",
  "React & Laravel",
  "JavaScript & PHP",
  "Bases de données",
  "Expériences utilisateur",
  "Graphic Designer"
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const currentPhrase = phrases[currentPhraseIndex];

  if (isDeleting) {
    typedText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
    currentCharIndex--;
    typingSpeed = 50;
  } else {
    typedText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
    currentCharIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && currentCharIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 1500; // Pause at the end
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    typingSpeed = 500; // Pause before typing next phrase
  }

  setTimeout(typeText, typingSpeed);
}

// Project filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove active class from all buttons
    filterBtns.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    this.classList.add("active");

    const filter = this.getAttribute("data-filter");

    projectCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block";
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.5,
        });
      } else {
        gsap.to(card, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          onComplete: () => {
            card.style.display = "none";
          },
        });
      }
    });
  });
});

// Dark/Light mode toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const lightIcon = document.querySelector(".light-icon");
const darkIcon = document.querySelector(".dark-icon");

// Check for saved user preference or use dark mode as default
const currentTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", currentTheme);
updateIcons(currentTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcons(newTheme);

  // Animate the toggle switch
  gsap.to(".theme-toggle", {
    backgroundColor: newTheme === "light" ? "var(--accent)" : "var(--primary)",
    duration: 0.3,
  });
});

function updateIcons(theme) {
  if (theme === "light") {
    lightIcon.style.display = "block";
    darkIcon.style.display = "none";
  } else {
    lightIcon.style.display = "none";
    darkIcon.style.display = "block";
  }
}

// Animate skill progress bars
function animateSkills() {
  document.querySelectorAll(".skill-progress").forEach((progress) => {
    const value = progress.getAttribute("data-progress") + "%";
    gsap.to(progress, {
      width: value,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: progress,
        start: "top 80%",
      },
    });
  });

  // Animate about section skill bars
  document.querySelectorAll(".skill-level").forEach((bar) => {
    const width = bar.getAttribute("data-width");
    gsap.to(bar, {
      width: width,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: bar,
        start: "top 80%",
      },
    });
  });
}

// Header animations
function animateHeader() {
  gsap.to(".profile-text h1", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.5,
  });

  gsap.to(".profile-text h2", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.7,
  });

  gsap.to(".profile-image", {
    opacity: 1,
    scale: 1,
    duration: 1,
    delay: 0.3,
    ease: "back.out(1.7)",
  });

  gsap.to(".typed-text", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.9,
  });

  gsap.to(".header-content p", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 1.1,
  });

  gsap.to(".btn-container", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 1.4,
  });
}

// Section title animations
function animateSectionTitles() {
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
      },
    });
  });

  gsap.utils.toArray(".section-subtitle").forEach((subtitle) => {
    gsap.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: subtitle,
        start: "top 80%",
      },
    });
  });
}

// Card animations
function animateCards() {
  gsap.utils.toArray(".skill-card").forEach((card, index) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
      },
    });
  });

  gsap.utils.toArray(".project-card").forEach((card, index) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
      },
    });
  });
}

// Contact section animations
function animateContact() {
  gsap.to(".contact-info", {
    opacity: 1,
    x: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".contact-info",
      start: "top 80%",
    },
  });

  gsap.to(".contact-form", {
    opacity: 1,
    x: 0,
    duration: 1,
    delay: 0.3,
    scrollTrigger: {
      trigger: ".contact-form",
      start: "top 80%",
    },
  });

  gsap.to(".cv-download", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.6,
    scrollTrigger: {
      trigger: ".cv-download",
      start: "top 80%",
    },
  });

  gsap.utils.toArray(".social-media-link").forEach((link, index) => {
    gsap.to(link, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.8 + index * 0.1,
      scrollTrigger: {
        trigger: ".social-media-links",
        start: "top 80%",
      },
    });
  });
}

// Initialize 3D background
function initBackground() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvas-container").appendChild(renderer.domElement);

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1500;

  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x5e17eb,
    transparent: true,
    opacity: 0.8,
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    renderer.render(scene, camera);
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}

// Wow animation for icons
function animateWowIcons() {
  const wowIcons = document.querySelectorAll(".wow-icon");

  wowIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      gsap.to(icon, {
        scale: 1.2,
        rotate: 10,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      });
    });
  });
}

// Initialize animations when the page is loaded
window.addEventListener("load", function () {
  // Initialize ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Initialize all animations
  animateHeader();
  animateSectionTitles();
  animateSkills();
  animateCards();
  animateContact();
  animateWowIcons();

  // Initialize 3D background
  initBackground();

  // Start typing effect
  setTimeout(typeText, 1000);

  // Set initial theme toggle position
  const currentTheme = body.getAttribute("data-theme");
  updateIcons(currentTheme);
  gsap.set(".theme-toggle", {
    backgroundColor:
      currentTheme === "light" ? "var(--accent)" : "var(--primary)",
  });
});

// Form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // Add form submission logic here
  alert("Message envoyé! Merci pour votre contact.");
  this.reset();
});
document.addEventListener("DOMContentLoaded", function () {
  // Animation des barres de compétences
  gsap.utils.toArray(".skill-progress").forEach((progress) => {
    const width = progress.getAttribute("data-width") + "%";
    gsap.to(progress, {
      width: width,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: progress,
        start: "top 80%",
      },
    });
  });
});
document.getElementById("themeToggle").addEventListener("click", function () {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Animation du bouton
  gsap.to(this, {
    backgroundColor:
      newTheme === "light"
        ? "rgba(255, 204, 0, 0.2)"
        : "rgba(94, 23, 235, 0.2)",
    duration: 0.3,
  });
});

// Script pour le menu mobile
document.getElementById("mobileMenuBtn").addEventListener("click", function () {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");

  // Changer l'icône
  const icon = this.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});
// Fonction pour initialiser le thème
function initTheme() {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme") || "light";

  // Appliquer le thème sauvegardé
  body.setAttribute("data-theme", savedTheme);

  // Mettre à jour l'état du toggle
  updateThemeToggle(savedTheme);

  // Animation initiale
  gsap.set(".theme-toggle-slider", {
    x: savedTheme === "dark" ? "100%" : "0%",
    backgroundColor: savedTheme === "dark" ? "#5E17EB" : "#FFD700",
  });
}

// Fonction pour mettre à jour l'apparence du toggle
function updateThemeToggle(theme) {
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");
  const slider = document.querySelector(".theme-toggle-slider");

  if (theme === "dark") {
    gsap.to(slider, {
      x: "100%",
      backgroundColor: "#5E17EB",
      duration: 0.3,
    });
    sunIcon.style.opacity = "0";
    moonIcon.style.opacity = "1";
  } else {
    gsap.to(slider, {
      x: "0%",
      backgroundColor: "#FFD700",
      duration: 0.3,
    });
    sunIcon.style.opacity = "1";
    moonIcon.style.opacity = "0";
  }
}

// Gestionnaire d'événement pour le changement de thème
document.getElementById("themeToggle").addEventListener("click", function () {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  // Sauvegarder et appliquer le nouveau thème
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Animer la transition
  updateThemeToggle(newTheme);

  // Émettre un événement personnalisé
  document.dispatchEvent(new CustomEvent("themeChanged", { detail: newTheme }));
});

// Gestionnaire du menu mobile
document.getElementById("mobileMenuBtn").addEventListener("click", function () {
  const navLinks = document.querySelector(".nav-links");
  const icon = this.querySelector("i");

  // Basculer la classe active
  navLinks.classList.toggle("active");

  // Changer l'icône avec animation
  if (navLinks.classList.contains("active")) {
    gsap.to(icon, {
      rotation: 90,
      duration: 0.3,
      onComplete: () => {
        icon.classList.replace("fa-bars", "fa-times");
        gsap.to(icon, { rotation: 0, duration: 0.3 });
      },
    });
  } else {
    gsap.to(icon, {
      rotation: 90,
      duration: 0.3,
      onComplete: () => {
        icon.classList.replace("fa-times", "fa-bars");
        gsap.to(icon, { rotation: 0, duration: 0.3 });
      },
    });
  }
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    const navLinks = document.querySelector(".nav-links");
    const menuBtn = document.getElementById("mobileMenuBtn");
    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      icon.classList.replace("fa-times", "fa-bars");
    }
  });
});

// Initialiser le thème au chargement
document.addEventListener("DOMContentLoaded", initTheme);

// Gestion responsive - exemple d'écouteur de redimensionnement
window.addEventListener("resize", function () {
  const navLinks = document.querySelector(".nav-links");
  const menuBtn = document.getElementById("mobileMenuBtn");

  if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    menuBtn.querySelector("i").classList.replace("fa-times", "fa-bars");
  }
});
