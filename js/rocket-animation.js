/**
 * Rocket Animation Script
 *
 * Handles the rocket launch animation when clicking the start button.
 * Delays navigation to allow the animation to complete before redirecting.
 *
 * @author Farhan Alam
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get the start button and rocket icon elements
  const startButton = document.querySelector('.start-button');
  const rocketIcon = document.querySelector('.rocket-icon');

  // Only set up the animation if both elements exist
  if (startButton && rocketIcon) {
    /**
     * Rocket Launch Animation Handler
     * Plays the rocket animation and then navigates to the target page
     */
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
