// Apply theme immediately to prevent flash of wrong theme
(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-theme');
  }
})();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Theme.js loaded and running');

  // Get the theme toggle element
  const themeToggle = document.querySelector('.theme-toggle');
  console.log('Theme toggle element:', themeToggle);

  if (themeToggle) {
    // Add click event listener to the theme toggle
    themeToggle.addEventListener('click', function() {
      console.log('Theme toggle clicked');

      // Toggle the dark-theme class on the document element
      document.documentElement.classList.toggle('dark-theme');
      document.body.classList.toggle('dark-theme');

      // Save the theme preference to localStorage
      const isDarkTheme = document.documentElement.classList.contains('dark-theme');
      localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
      console.log('Theme set to:', isDarkTheme ? 'dark' : 'light');

      // Add animation to the toggle thumb
      const toggleThumb = themeToggle.querySelector('.toggle-thumb');
      if (toggleThumb) {
        toggleThumb.classList.add('animate__animated', 'animate__bounceIn');
        setTimeout(function() {
          toggleThumb.classList.remove('animate__animated', 'animate__bounceIn');
        }, 500);
      }
    });

    console.log('Theme toggle event listener added');
  } else {
    console.error('Theme toggle element not found');
  }
});
