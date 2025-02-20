// Simple theme toggle functionality

// Apply theme immediately to prevent flash of wrong theme
const savedTheme = localStorage.getItem('theme');

// If no theme is saved or it's dark, use dark theme (making dark the default)
if (savedTheme === null || savedTheme === 'dark') {
  document.documentElement.classList.add('dark-theme');
} else if (savedTheme === 'light') {
  document.documentElement.classList.remove('dark-theme');
}

// Function to update toggle appearance based on current theme
function updateToggleAppearance() {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;

  const isDarkTheme = document.documentElement.classList.contains('dark-theme');
  const toggleThumb = themeToggle.querySelector('.toggle-thumb');

  if (toggleThumb) {
    // Position the toggle thumb based on theme
    if (isDarkTheme) {
      toggleThumb.style.left = 'calc(100% - 18px)';
    } else {
      toggleThumb.style.left = '2px';
    }
  }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the theme toggle element
  const themeToggle = document.querySelector('.theme-toggle');

  // Set initial toggle state based on theme
  if (themeToggle) {
    // Update toggle appearance based on current theme
    updateToggleAppearance();

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

      // Update toggle appearance
      updateToggleAppearance();

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
