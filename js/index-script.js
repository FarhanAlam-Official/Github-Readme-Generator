// Theme functionality moved to theme.js

document.addEventListener('DOMContentLoaded', () => {
  // Common elements across all pages
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.innerHTML = navLinks.classList.contains('active') ?
      '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
  });

  // Close mobile menu when clicking on a link
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuToggle.innerHTML = '<i class="ri-menu-line"></i>';
    });
  });

  // Add scroll event listener to make navbar sticky
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  });

  // Add animation to hero content
  const heroContent = document.querySelector('.hero-content');
  const heroPreview = document.querySelector('.hero-preview');
  
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('animate__fadeIn');
      heroContent.style.opacity = 1;
    }, 300);
  }
  
  if (heroPreview) {
    setTimeout(() => {
      heroPreview.classList.add('animate__fadeInRight');
      heroPreview.style.opacity = 1;
    }, 600);
  }
});
