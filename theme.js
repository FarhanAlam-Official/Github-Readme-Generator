// Simple theme toggle functionality

// Apply theme immediately to prevent flash of wrong theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark-theme');
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the theme toggle element
  const themeToggle = document.querySelector('.theme-toggle');

  if (themeToggle) {
    // Add click event listener to the theme toggle
    themeToggle.addEventListener('click', function() {
      // Toggle the dark-theme class
      document.documentElement.classList.toggle('dark-theme');

      // Save the theme preference to localStorage
      if (document.documentElement.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }

      // Add animation to the toggle thumb
      const toggleThumb = themeToggle.querySelector('.toggle-thumb');
      if (toggleThumb) {
        toggleThumb.classList.add('animate__animated', 'animate__bounceIn');
        setTimeout(function() {
          toggleThumb.classList.remove('animate__animated', 'animate__bounceIn');
        }, 500);
      }
    });
  }
});
