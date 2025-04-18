/**
 * GitHub Profile README Generator - Main Script
 *
 * This script handles the step-by-step wizard functionality, form validation,
 * markdown generation, and preview rendering for the README generator.
 *
 * @author Farhan Alam
 * @note Theme functionality moved to theme.js
 */

document.addEventListener('DOMContentLoaded', () => {
    // Common elements across all pages
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Generator page specific elements
    const form = document.getElementById('readmeForm');
    const previewContent = document.getElementById('previewContent');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    const copyMarkdownBtn = document.getElementById('copyMarkdownBtn');
    const downloadReadmeBtn = document.getElementById('downloadReadmeBtn');

    // Wizard steps management
    let currentStep = 1;
    const totalSteps = 6;
    const stepContents = document.querySelectorAll('[data-step-content]');
    const steps = document.querySelectorAll('.step');
    const progressBar = document.querySelector('.progress');

    /**
     * Initialize Marked.js with GitHub Flavored Markdown settings
     * This ensures the preview matches GitHub's rendering style
     */
    marked.use({
      breaks: true,
      gfm: true
    });

    // Show/hide support links based on checkbox selection
    const supportCheckboxes = document.querySelectorAll('input[name="support"]');
    const supportLinksDiv = document.querySelector('.support-links');

    supportCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const anyChecked = Array.from(supportCheckboxes).some(cb => cb.checked);
        supportLinksDiv.style.display = anyChecked ? 'block' : 'none';
      });
    });

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
     * Generates the complete README markdown based on form data
     * Includes all sections selected by the user with proper formatting
     *
     * @param {FormData} formData - The form data from the wizard
     * @returns {string} Complete markdown for the README
     */
    function generateMarkdown(formData) {
      const name = formData.get('name');
      const title = formData.get('title');
      const bio = formData.get('bio');
      const github = formData.get('github');
      const currentWork = formData.get('currentWork');
      const learning = formData.get('learning');
      const collaboration = formData.get('collaboration');
      const linkedin = formData.get('linkedin');
      const twitter = formData.get('twitter');
      const facebook = formData.get('facebook');
      const instagram = formData.get('instagram');
      const dev = formData.get('dev');
      const medium = formData.get('medium');
      const stackoverflow = formData.get('stackoverflow');
      const codepen = formData.get('codepen');
      const other = formData.get('other');
      const funFact = formData.get('funFact');
      const theme = formData.get('theme') || 'default';

      const selectedStats = Array.from(form.querySelectorAll('input[name="stats"]:checked'))
        .map(checkbox => checkbox.value);

      const statsOptions = Array.from(form.querySelectorAll('input[name="stats-options"]:checked'))
        .map(checkbox => checkbox.value);

      const extras = Array.from(form.querySelectorAll('input[name="extras"]:checked'))
        .map(checkbox => checkbox.value);

      const supportOptions = Array.from(form.querySelectorAll('input[name="support"]:checked'))
        .map(checkbox => checkbox.value);

      const buymeacoffeeUsername = formData.get('buymeacoffee-username');
      const kofiUsername = formData.get('kofi-username');
      const paypalUsername = formData.get('paypal-username');

      const githubUsername = github || '[your-github-username]';

      // Collect all selected skills
      const programmingLanguages = Array.from(form.querySelectorAll('input[name="languages"]:checked'))
        .map(checkbox => checkbox.value);

      const frontendSkills = Array.from(form.querySelectorAll('input[name="frontend"]:checked'))
        .map(checkbox => checkbox.value);

      const backendSkills = Array.from(form.querySelectorAll('input[name="backend"]:checked'))
        .map(checkbox => checkbox.value);

      const databaseSkills = Array.from(form.querySelectorAll('input[name="database"]:checked'))
        .map(checkbox => checkbox.value);

      const devopsSkills = Array.from(form.querySelectorAll('input[name="devops"]:checked'))
        .map(checkbox => checkbox.value);

      const mobileSkills = Array.from(form.querySelectorAll('input[name="mobile"]:checked'))
        .map(checkbox => checkbox.value);

      const otherSkills = other ? other.split(',').map(skill => skill.trim()) : [];

      let markdown = `<h1 align="center">Hi 👋, I'm ${name || '[Your Name]'}</h1>




  ${title ? `<h3 align="center">${title}</h3>\n\n\n\n\n` : ''}
  ${bio ? `<p align="center">${bio}</p>\n\n\n\n\n` : ''}

  ${extras.includes('visitors') ? `<p align="left"><img src="https://komarev.com/ghpvc/?username=${githubUsername}&label=Profile%20views&color=0e75b6&style=flat" alt="${githubUsername}" /></p>\n\n\n\n\n` : ''}

  ${currentWork ? `- 🔭 I'm currently working on **${currentWork}**\n\n\n` : ''}
  ${learning ? `- 🌱 I'm currently learning **${learning}**\n\n\n` : ''}
  ${collaboration ? `- 👯 I'm looking to collaborate on **${collaboration}**\n\n\n` : ''}
  ${funFact ? `- ⚡ Fun fact: **${funFact}**\n\n\n\n\n` : ''}

  <h3 align="left">Connect with me:</h3>\n\n\n\n\n\n\n\n\n\n
  <p align="left">\n${linkedin ? `<a href="https://linkedin.com/in/${linkedin}" target="blank"><img align="center" src="../images/icons/Social/linked-in-alt.svg" alt="${linkedin}" height="30" width="40" /></a>&nbsp;&nbsp;` : ''}${twitter ? `<a href="https://twitter.com/${twitter}" target="blank"><img align="center" src="../images/icons/Social/twitter.svg" alt="${twitter}" height="30" width="40" /></a>&nbsp;&nbsp;` : ''}${facebook ? `<a href="https://fb.com/${facebook}" target="blank"><img align="center" src="../images/icons/Social/facebook.svg" alt="${facebook}" height="30" width="40" /></a>&nbsp;&nbsp;` : ''}${instagram ? `<a href="https://instagram.com/${instagram}" target="blank"><img align="center" src="../images/icons/Social/instagram.svg" alt="${instagram}" height="30" width="40" /></a>&nbsp;&nbsp;` : ''}${dev ? `<a href="https://dev.to/${dev}" target="blank"><img align="center" src="../images/icons/Social/devto.svg" alt="${dev}" height="30" width="40" /></a>&nbsp;&nbsp;` : ''}${medium ? `<a href="https://medium.com/@${medium}" target="blank"><img align="center" src="../images/icons/Social/medium.svg" alt="${medium}" height="30" width="40" /></a>&nbsp;&nbsp;` : ''}${stackoverflow ? `<a href="https://stackoverflow.com/users/${stackoverflow}" target="blank"><img align="center" src="../images/icons/Social/stack-overflow.svg" alt="${stackoverflow}" height="30" width="40" /></a>&nbsp;&nbsp;` : ''}${codepen ? `<a href="https://codepen.io/${codepen}" target="blank"><img align="center" src="../images/icons/Social/codepen.svg" alt="${codepen}" height="30" width="40" /></a>` : ''}
  </p>\n\n\n\n\n\n\n\n\n\n\n\n`;

      // Add Skills Section with Categories
      if (programmingLanguages.length > 0 || frontendSkills.length > 0 || backendSkills.length > 0 ||
          databaseSkills.length > 0 || devopsSkills.length > 0 || mobileSkills.length > 0 || otherSkills.length > 0) {

        markdown += `<h3 align="left">Languages and Tools:</h3>\n\n\n\n\n\n\n\n\n\n`;

        // Programming Languages
        if (programmingLanguages.length > 0) {
          markdown += `<h4 align="left">Programming Languages</h4>\n\n\n<p align="left">\n${generateTechStackIcons(programmingLanguages)}\n</p>\n\n\n\n\n\n\n\n\n\n`;
        }

        // Frontend Development
        if (frontendSkills.length > 0) {
          markdown += `<h4 align="left">Frontend Development</h4>\n\n\n<p align="left">\n${generateTechStackIcons(frontendSkills)}\n</p>\n\n\n\n\n\n\n\n\n\n`;
        }

        // Backend Development
        if (backendSkills.length > 0) {
          markdown += `<h4 align="left">Backend Development</h4>\n\n\n<p align="left">\n${generateTechStackIcons(backendSkills)}\n</p>\n\n\n\n\n\n\n\n\n\n`;
        }

        // Database
        if (databaseSkills.length > 0) {
          markdown += `<h4 align="left">Database</h4>\n\n\n<p align="left">\n${generateTechStackIcons(databaseSkills)}\n</p>\n\n\n\n\n\n\n\n\n\n`;
        }

        // DevOps
        if (devopsSkills.length > 0) {
          markdown += `<h4 align="left">DevOps</h4>\n\n\n<p align="left">\n${generateTechStackIcons(devopsSkills)}\n</p>\n\n\n\n\n\n\n\n\n\n`;
        }

        // Mobile App Development
        if (mobileSkills.length > 0) {
          markdown += `<h4 align="left">Mobile App Development</h4>\n\n\n<p align="left">\n${generateTechStackIcons(mobileSkills)}\n</p>\n\n\n\n\n\n\n\n\n\n`;
        }

        // Other Skills
        if (otherSkills.length > 0) {
          markdown += `<h4 align="left">Other</h4>\n\n\n<p align="left">\n${generateTechStackIcons(otherSkills.map(skill => skill.toLowerCase()))}\n</p>\n\n\n\n\n\n\n\n\n\n`;
        }
      }

      // Build stats options string
      const statsOptionsStr = statsOptions.length > 0 ?
        `&${statsOptions.join('=true&')}=true` : '';

      // Add GitHub Stats Section Header
      if (selectedStats.length > 0) {
        markdown += `\n\n\n\n\n\n\n\n<h3 align="left">GitHub Stats:</h3>\n\n\n\n\n\n\n\n\n\n`;
      }

      // Add GitHub Stats
      if (selectedStats.includes('stats')) {
        markdown += `<p>\n<img align="center" src="https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&locale=en&theme=${theme}${statsOptionsStr}" alt="${githubUsername}" />\n</p>\n\n\n\n\n\n\n\n\n\n`;
      }

      // Add Most Used Languages
      if (selectedStats.includes('languages')) {
        markdown += `<p>\n<img align="center" src="https://github-readme-stats.vercel.app/api/top-langs?username=${githubUsername}&show_icons=true&locale=en&layout=compact&theme=${theme}" alt="${githubUsername}" />\n</p>\n\n\n\n\n\n\n\n\n\n`;
      }

      // Add GitHub Streak Stats
      if (selectedStats.includes('streak')) {
        markdown += `<p>\n<img align="center" src="https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=${theme}" alt="${githubUsername}" />\n</p>\n\n\n\n\n\n\n\n\n\n`;
      }

      // Add GitHub Trophies
      if (selectedStats.includes('trophies')) {
        markdown += `<p align="left">\n<a href="https://github.com/ryo-ma/github-profile-trophy"><img src="https://github-profile-trophy.vercel.app/?username=${githubUsername}&theme=${theme}" alt="${githubUsername}" /></a>\n</p>\n\n\n\n\n\n\n\n\n\n`;
      }

      // Add Spotify Now Playing
      if (extras.includes('spotify')) {
        markdown += `\n\n\n\n\n\n\n\n<h3 align="left">Currently Playing:</h3>\n\n\n\n\n\n\n\n\n\n<p align="center">\n<img src="https://spotify-github-profile.vercel.app/api/view?uid=${githubUsername}&cover_image=true&theme=default" alt="spotify"/>\n</p>\n\n\n\n\n\n\n\n\n\n`;
      }

      // Add GitHub Activity Graph
      if (extras.includes('activity_graph')) {
        markdown += `\n\n\n\n\n\n\n\n<h3 align="left">Activity Graph:</h3>\n\n\n\n\n\n\n\n\n\n<p>\n<img align="center" src="https://activity-graph.herokuapp.com/graph?username=${githubUsername}&theme=${theme}" alt="${githubUsername}" />\n</p>\n\n\n\n\n\n\n\n\n\n`;
      }

      // Add Latest Blog Posts
      if (extras.includes('blog_posts')) {
        markdown += `\n\n\n\n\n\n\n\n<h3 align="left">Latest Blog Posts:</h3>\n\n\n\n\n\n\n\n\n\n<!-- BLOG-POST-LIST:START -->\n<!-- BLOG-POST-LIST:END -->\n\n\n\n\n\n\n\n\n\n`;
      }

      // Add Support Links
      if (supportOptions.length > 0) {
        markdown += `\n\n\n\n\n\n\n\n<h3 align="left">Support:</h3>\n\n\n\n\n\n\n\n\n\n`;

        if (supportOptions.includes('buymeacoffee')) {
          markdown += `<p>\n<a href="https://www.buymeacoffee.com/${buymeacoffeeUsername || githubUsername}">\n<img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="${buymeacoffeeUsername || githubUsername}" />\n</a>\n</p>\n\n<br><br>\n\n\n\n\n\n\n\n`;
        }

        if (supportOptions.includes('kofi')) {
          markdown += `<p>\n<a href="https://ko-fi.com/${kofiUsername || githubUsername}">\n<img align="left" src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="50" width="210" alt="${kofiUsername || githubUsername}" />\n</a>\n</p>\n\n<br><br>\n\n\n\n\n\n\n\n`;
        }

        if (supportOptions.includes('paypal')) {
          markdown += `<p>\n<a href="https://paypal.me/${paypalUsername || githubUsername}">\n<img align="left" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" height="50" width="210" alt="${paypalUsername || githubUsername}" />\n</a>\n</p>\n\n<br><br>\n\n\n\n\n\n\n\n`;
        }
      }

      // Apply styling improvements
      markdown = markdown.replace(
        /<h4 align="left">(.*?)<\/h4>/g,
        '<h4 align="left" style="margin-top: 20px; margin-bottom: 5px;">$1</h4>'
      );

      markdown = markdown.replace(
        /<p align="left">/g,
        '<p align="left" style="margin-bottom: 20px;">'
      );

      markdown = markdown.replace(
        /<h3 align="left">(.*?)<\/h3>/g,
        '<hr style="width: 80%; margin: 30px auto;">\n<h3 align="left" style="margin-bottom: 10px;">$1</h3>'
      );

      // Fix the first h3 to not have an hr before it
      const firstH3Index = markdown.indexOf('<hr style="width: 80%; margin: 30px auto;">\n<h3');
      if (firstH3Index !== -1) {
        markdown = markdown.substring(0, firstH3Index) +
                  '<h3 align="left" style="margin-bottom: 10px;">' +
                  markdown.substring(firstH3Index + '<hr style="width: 80%; margin: 30px auto;">\n<h3 align="left" style="margin-bottom: 10px;">'.length);
      }

      return markdown;
    }

    function generateTechStackIcons(technologies) {
      const techIcons = {
        // Programming Languages
        javascript: '../images/icons/ProgrammingLanguages/javascript.svg',
        typescript: '../images/icons/ProgrammingLanguages/typescript.svg',
        python: '../images/icons/ProgrammingLanguages/python.svg',
        java: '../images/icons/ProgrammingLanguages/java.svg',
        c: '../images/icons/ProgrammingLanguages/c.svg',
        cpp: '../images/icons/ProgrammingLanguages/cpp.svg',
        csharp: '../images/icons/ProgrammingLanguages/csharp.svg',
        php: '../images/icons/ProgrammingLanguages/php.svg',
        ruby: '../images/icons/ProgrammingLanguages/ruby.svg',
        swift: '../images/icons/ProgrammingLanguages/swift.svg',
        go: '../images/icons/ProgrammingLanguages/go.svg',
        rust: '../images/icons/ProgrammingLanguages/rust.svg',

        // Frontend
        html5: '../images/icons/FrontendDevelopment/html.svg',
        css3: '../images/icons/FrontendDevelopment/css.svg',
        react: '../images/icons/FrontendDevelopment/reactjs.svg',
        angular: '../images/icons/FrontendDevelopment/angularjs.svg',
        vue: '../images/icons/FrontendDevelopment/vuejs.svg',
        bootstrap: '../images/icons/FrontendDevelopment/bootstrap.svg',
        tailwind: '../images/icons/FrontendDevelopment/tailwind.svg',
        sass: '../images/icons/FrontendDevelopment/sass.svg',

        // Backend
        nodejs: '../images/icons/BackendDevelopment/nodejs.svg',
        express: '../images/icons/BackendDevelopment/express.svg',
        django: '../images/icons/Framework/django.svg',
        spring: '../images/icons/BackendDevelopment/spring.svg',
        flask: '../images/icons/Framework/flask.svg',
        laravel: '../images/icons/Framework/laravel.svg',
        graphql: '../images/icons/BackendDevelopment/graphql.svg',

        // Database
        mongodb: '../images/icons/Database/mongodb.svg',
        mysql: '../images/icons/Database/mysql.svg',
        postgresql: '../images/icons/Database/postgresql.svg',
        redis: '../images/icons/Database/redis.svg',
        sqlite: '../images/icons/Database/sqlite.svg',
        oracle: '../images/icons/Database/oracle.svg',

        // DevOps
        aws: '../images/icons/Devops/aws.svg',
        docker: '../images/icons/Devops/docker.svg',
        kubernetes: '../images/icons/Devops/kubernetes.svg',
        gcp: '../images/icons/Devops/gcp.svg',
        azure: '../images/icons/Devops/azure.svg',
        jenkins: '../images/icons/Devops/jenkins.svg',
        git: '../images/icons/Other/git.svg',

        // Mobile
        android: '../images/icons/MobileAppDevelopment/android.svg',
        ios: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/apple/apple-original.svg',
        flutter: '../images/icons/MobileAppDevelopment/flutter.svg',
        reactnative: '../images/icons/MobileAppDevelopment/reactnative.svg',
        kotlin: '../images/icons/MobileAppDevelopment/kotlin.svg',
      };

      return technologies
        .map(tech => tech.trim().toLowerCase())
        .filter(tech => techIcons[tech])
        .map(tech =>
          `<a href="#" target="_blank" rel="noreferrer">
            <img src="${techIcons[tech]}" alt="${tech}" width="40" height="40"/>
          </a>`
        )
        .join(' ');
    }

    /**
     * Wizard Navigation System
     * Handles transitions between steps, updates progress bar,
     * and manages the active state of step indicators
     *
     * @param {number} step - The step number to navigate to
     */
    function goToStep(step) {
      if (step < 1 || step > totalSteps) return;

      // Hide all step contents
      stepContents.forEach(content => {
        content.style.display = 'none';
      });

      // Show current step content
      const currentContent = document.querySelector(`[data-step-content="${step}"]`);
      currentContent.style.display = 'block';

      // Update preview visibility based on current step
      if (step === 6) {
        // We're on the preview step, make sure preview is updated and visible
        updatePreview();
        document.body.classList.add('step-6');
      } else {
        // Not on preview step, remove the class
        document.body.classList.remove('step-6');
      }

      // Update steps UI
      steps.forEach((stepEl, index) => {
        const stepNum = index + 1;
        stepEl.classList.remove('active', 'completed');

        if (stepNum === step) {
          stepEl.classList.add('active');
        } else if (stepNum < step) {
          stepEl.classList.add('completed');
          // Replace number with check icon for completed steps
          const stepNumber = stepEl.querySelector('.step-number');
          if (stepNumber && !stepNumber.innerHTML.includes('ri-check-line')) {
            stepNumber.innerHTML = '<i class="ri-check-line"></i>';
          }
        } else {
          // Restore number for future steps
          const stepNumber = stepEl.querySelector('.step-number');
          if (stepNumber && stepNumber.innerHTML.includes('ri-check-line')) {
            stepNumber.innerHTML = stepNum;
          }
        }
      });

      // Update progress bar
      const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;
      progressBar.style.width = `${progressPercentage}%`;

      // Update navigation buttons
      prevBtn.disabled = step === 1;

      if (step === totalSteps) {
        nextBtn.textContent = 'Generate README';
        nextBtn.innerHTML = '<i class="ri-check-line"></i> Generate README';
      } else {
        nextBtn.textContent = 'Next';
        nextBtn.innerHTML = 'Next <i class="ri-arrow-right-line"></i>';
      }

      // Update current step tracker
      currentStep = step;

      // Scroll to top of the form
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    // Navigation event listeners
    prevBtn.addEventListener('click', () => {
      goToStep(currentStep - 1);
    });

    nextBtn.addEventListener('click', () => {
      if (currentStep === totalSteps) {
        // Show success modal on final step
        showSuccessModal();
      } else {
        goToStep(currentStep + 1);
      }
    });

    // Step indicator clicks
    steps.forEach((step, index) => {
      step.addEventListener('click', () => {
        goToStep(index + 1);
      });
    });

    // Success modal functions
    function showSuccessModal() {
      successModal.style.display = 'flex';
    }

    function hideSuccessModal() {
      successModal.style.display = 'none';
    }

    // Close modal when clicking X
    closeModal.addEventListener('click', hideSuccessModal);

    // Close modal when clicking outside
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        hideSuccessModal();
      }
    });

    /**
     * Updates the README preview with rendered markdown
     * Uses DOMPurify to sanitize HTML for security
     * Generates markdown from current form data and renders it
     */
    function updatePreview() {
      const formData = new FormData(form);
      const markdown = generateMarkdown(formData);
      const html = DOMPurify.sanitize(marked.parse(markdown));
      previewContent.innerHTML = html;

      // If we're on the preview step (step 6), make sure the preview is visible
      if (currentStep === 6) {
        document.body.classList.add('step-6');
      } else {
        document.body.classList.remove('step-6');
      }
    }

    /**
     * Gets the current markdown based on form data
     * Used for copying and downloading the README
     *
     * @returns {string} The generated markdown
     */
    function getMarkdown() {
      const formData = new FormData(form);
      return generateMarkdown(formData);
    }

    function copyMarkdown() {
      const markdown = getMarkdown();
      navigator.clipboard.writeText(markdown)
        .then(() => {
          showToast('Markdown copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }

    function downloadReadme() {
      const markdown = getMarkdown();
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'README.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('README.md downloaded successfully!');
    }

    function showToast(message) {
      // Create toast element
      const toast = document.createElement('div');
      toast.className = 'toast animate__animated animate__fadeInUp';
      toast.innerHTML = `<i class="ri-check-line"></i> ${message}`;
      document.body.appendChild(toast);

      // Remove toast after 3 seconds
      setTimeout(() => {
        toast.classList.remove('animate__fadeInUp');
        toast.classList.add('animate__fadeOutDown');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 500);
      }, 3000);
    }

    // Add event listeners
    form.addEventListener('input', updatePreview);
    form.addEventListener('change', updatePreview);
    copyMarkdownBtn.addEventListener('click', () => {
      copyMarkdown();
      hideSuccessModal();
    });

    // Handle window resize for mobile preview visibility
    window.addEventListener('resize', () => {
      if (currentStep === 6) {
        document.body.classList.add('step-6');
      } else {
        document.body.classList.remove('step-6');
      }
    });
    downloadReadmeBtn.addEventListener('click', () => {
      downloadReadme();
      hideSuccessModal();
    });

    // Add checked class to checkbox labels when checked
    const checkboxes = document.querySelectorAll('.checkbox-label input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      // Set initial state
      if (checkbox.checked) {
        checkbox.closest('.checkbox-label').classList.add('checked');
      }

      // Add event listener for changes
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          this.closest('.checkbox-label').classList.add('checked');
        } else {
          this.closest('.checkbox-label').classList.remove('checked');
        }
      });
    });

    // Initialize first step
    goToStep(1);
  });