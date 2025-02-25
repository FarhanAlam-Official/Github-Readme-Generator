/**
 * Main Script
 *
 * Handles common functionality across all pages including mobile menu,
 * navbar behavior, and hero section animations.
 *
 * @author Farhan Alam
 * @note Theme functionality moved to theme.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // Common elements across all pages
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');

  /**
   * Mobile Navigation Menu Toggle
   * Shows/hides the mobile navigation menu and changes the icon
   */
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.innerHTML = navLinks.classList.contains('active') ?
      '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
  });

  /**
   * Close mobile menu when clicking on a navigation link
   * Improves mobile user experience
   */
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuToggle.innerHTML = '<i class="ri-menu-line"></i>';
    });
  });

  /**
   * Sticky Navbar on Scroll
   * Makes the navbar stick to the top when scrolling down
   */
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  });

  /**
   * Hero Section Animations
   * Adds fade-in animations to the hero content and preview
   * with a slight delay between them for a better visual effect
   */
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
