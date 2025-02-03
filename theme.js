// Theme toggle functionality - This runs immediately to prevent flash of wrong theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
}

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle elements
  const themeToggle = document.querySelector('.theme-toggle');
  
  // Toggle theme when clicking the theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      
      // Save theme preference
      if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
      
      // Add animation effect
      const toggleThumb = themeToggle.querySelector('.toggle-thumb');
      toggleThumb.classList.add('animate__animated', 'animate__bounceIn');
      setTimeout(() => {
        toggleThumb.classList.remove('animate__animated', 'animate__bounceIn');
      }, 500);
    });
  }
});
