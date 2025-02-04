// Apply theme immediately to prevent flash of wrong theme
(function() {
  const savedTheme = localStorage.getItem('theme');
  console.log('Initial theme check - saved theme:', savedTheme);

  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-theme');
    document.body.classList.add('dark-theme');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark-theme');
    document.body.classList.remove('dark-theme');
  } else {
    // If no theme is set, default to light and save the preference
    localStorage.setItem('theme', 'light');
  }
})();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Theme.js loaded and running');

  // Apply the saved theme again to ensure body is properly styled
  // (sometimes the body class isn't applied before DOMContentLoaded)
  const savedTheme = localStorage.getItem('theme');
  console.log('DOMContentLoaded theme check - saved theme:', savedTheme);

  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-theme');
    document.body.classList.add('dark-theme');
  } else {
    document.documentElement.classList.remove('dark-theme');
    document.body.classList.remove('dark-theme');
  }

  // Get the theme toggle element
  const themeToggle = document.querySelector('.theme-toggle');
  console.log('Theme toggle element:', themeToggle);

  if (themeToggle) {
    // Update toggle position based on current theme
    const toggleThumb = themeToggle.querySelector('.toggle-thumb');
    if (toggleThumb && savedTheme === 'dark') {
      toggleThumb.style.left = 'calc(100% - 18px)';
    }

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
