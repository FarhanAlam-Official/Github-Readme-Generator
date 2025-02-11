document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.querySelector('.start-button');
  const rocketIcon = document.querySelector('.rocket-icon');

  if (startButton && rocketIcon) {
    startButton.addEventListener('click', function(e) {
      // Remove any existing animation
      rocketIcon.classList.remove('rocket-animated');

      // Force a reflow to restart the animation
      void rocketIcon.offsetWidth;

      // Add the animation class
      rocketIcon.classList.add('rocket-animated');

      // Don't immediately navigate to allow animation to play
      e.preventDefault();

      // Navigate after animation completes
      setTimeout(function() {
        window.location.href = startButton.getAttribute('href');
      }, 900); // Adjusted to match the new animation duration
    });
  }
});
