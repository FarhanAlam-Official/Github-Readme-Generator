document.addEventListener('DOMContentLoaded', function() {
  const words = ['Impressive', 'Professional', 'Outstanding', 'Remarkable'];
  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.querySelector('.typing');

  // Find the longest word to use for height calculation
  const longestWord = words.reduce((a, b) => a.length > b.length ? a : b);

  // Create a visible text span and a hidden placeholder span
  const textSpan = document.createElement('span');
  textSpan.className = 'typing-text';

  const placeholderSpan = document.createElement('span');
  placeholderSpan.className = 'typing-placeholder';
  placeholderSpan.textContent = longestWord;
  placeholderSpan.setAttribute('aria-hidden', 'true');

  // Add both spans to the typing element
  typingElement.innerHTML = '';
  typingElement.appendChild(textSpan);
  typingElement.appendChild(placeholderSpan);

  // Set initial content
  textSpan.textContent = '\u00A0'; // Non-breaking space

  function type() {
    const currentWord = words[currentIndex];
    const typingSpeed = 80; // Consistent speed for all operations

    if (isDeleting) {
      // Deleting text
      textSpan.textContent = currentWord.substring(0, charIndex - 1) || '\u00A0';
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        // Move to next word after a delay
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % words.length;
          textSpan.textContent = '\u00A0';
          type();
        }, 500);
        return;
      }
    } else {
      // Typing text
      textSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        isDeleting = true;
        // Wait 2 seconds before starting to delete
        setTimeout(type, 2000);
        return;
      }
    }

    // Continue the typing effect
    setTimeout(type, typingSpeed);
  }

  // Start the typing effect
  setTimeout(type, 1000); // Initial delay
});
