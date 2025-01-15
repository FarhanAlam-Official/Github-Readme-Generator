document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const form = document.getElementById('readmeForm');
    const previewContent = document.getElementById('previewContent');
    const downloadBtn = document.getElementById('downloadBtn');
    const startBtn = document.getElementById('startBtn');
    const mainContainer = document.getElementById('mainContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const copyBtn = document.getElementById('copyBtn');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    const copyMarkdownBtn = document.getElementById('copyMarkdownBtn');
    const downloadReadmeBtn = document.getElementById('downloadReadmeBtn');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Wizard steps management
    let currentStep = 1;
    const totalSteps = 6;
    const stepContents = document.querySelectorAll('[data-step-content]');
    const steps = document.querySelectorAll('.step');
    const progressBar = document.querySelector('.progress');

    // Initialize marked with GitHub flavor
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

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuToggle.innerHTML = navLinks.classList.contains('active') ?
        '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
    });

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.innerHTML = '<i class="ri-menu-line"></i>';
      });
    });

    // Start button click handler
    startBtn.addEventListener('click', () => {
      window.scrollTo(0, 0);
      mainContainer.style.display = 'block';
      startBtn.parentElement.parentElement.style.display = 'none';
      document.querySelector('.navbar').classList.add('sticky');
      updatePreview(); // Initialize preview
    });

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

${title ? `<h3 align="center">${title}</h3>\n\n` : ''}
${bio ? `<p align="center">${bio}</p>\n\n` : ''}

${extras.includes('visitors') ? `<p align="left"><img src="https://komarev.com/ghpvc/?username=${githubUsername}&label=Profile%20views&color=0e75b6&style=flat" alt="${githubUsername}" /></p>\n\n` : ''}

${currentWork ? `- 🔭 I'm currently working on **${currentWork}**\n` : ''}
${learning ? `- 🌱 I'm currently learning **${learning}**\n` : ''}
${collaboration ? `- 👯 I'm looking to collaborate on **${collaboration}**\n` : ''}
${funFact ? `- ⚡ Fun fact: **${funFact}**\n` : ''}

<h3 align="left">Connect with me:</h3>

<p align="left">
${linkedin ? `<a href="https://linkedin.com/in/${linkedin}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="${linkedin}" height="30" width="40" /></a>` : ''}
${twitter ? `<a href="https://twitter.com/${twitter}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="${twitter}" height="30" width="40" /></a>` : ''}
${facebook ? `<a href="https://fb.com/${facebook}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/facebook.svg" alt="${facebook}" height="30" width="40" /></a>` : ''}
${instagram ? `<a href="https://instagram.com/${instagram}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="${instagram}" height="30" width="40" /></a>` : ''}
${dev ? `<a href="https://dev.to/${dev}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/devto.svg" alt="${dev}" height="30" width="40" /></a>` : ''}
${medium ? `<a href="https://medium.com/@${medium}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/medium.svg" alt="${medium}" height="30" width="40" /></a>` : ''}
${stackoverflow ? `<a href="https://stackoverflow.com/users/${stackoverflow}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/stack-overflow.svg" alt="${stackoverflow}" height="30" width="40" /></a>` : ''}
${codepen ? `<a href="https://codepen.io/${codepen}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/codepen.svg" alt="${codepen}" height="30" width="40" /></a>` : ''}
</p>\n\n`;

      // Add Skills Section with Categories
      if (programmingLanguages.length > 0 || frontendSkills.length > 0 || backendSkills.length > 0 ||
          databaseSkills.length > 0 || devopsSkills.length > 0 || mobileSkills.length > 0 || otherSkills.length > 0) {

        markdown += `<h3 align="left">Languages and Tools:</h3>\n\n`;

        // Programming Languages
        if (programmingLanguages.length > 0) {
          markdown += `<h4 align="left">Programming Languages</h4>\n<p align="left">\n${generateTechStackIcons(programmingLanguages)}\n</p>\n\n`;
        }

        // Frontend Development
        if (frontendSkills.length > 0) {
          markdown += `<h4 align="left">Frontend Development</h4>\n<p align="left">\n${generateTechStackIcons(frontendSkills)}\n</p>\n\n`;
        }

        // Backend Development
        if (backendSkills.length > 0) {
          markdown += `<h4 align="left">Backend Development</h4>\n<p align="left">\n${generateTechStackIcons(backendSkills)}\n</p>\n\n`;
        }

        // Database
        if (databaseSkills.length > 0) {
          markdown += `<h4 align="left">Database</h4>\n<p align="left">\n${generateTechStackIcons(databaseSkills)}\n</p>\n\n`;
        }

        // DevOps
        if (devopsSkills.length > 0) {
          markdown += `<h4 align="left">DevOps</h4>\n<p align="left">\n${generateTechStackIcons(devopsSkills)}\n</p>\n\n`;
        }

        // Mobile App Development
        if (mobileSkills.length > 0) {
          markdown += `<h4 align="left">Mobile App Development</h4>\n<p align="left">\n${generateTechStackIcons(mobileSkills)}\n</p>\n\n`;
        }

        // Other Skills
        if (otherSkills.length > 0) {
          markdown += `<h4 align="left">Other</h4>\n<p align="left">\n${generateTechStackIcons(otherSkills.map(skill => skill.toLowerCase()))}\n</p>\n\n`;
        }
      }

      // Build stats options string
      const statsOptionsStr = statsOptions.length > 0 ?
        `&${statsOptions.join('=true&')}=true` : '';

      // Add GitHub Stats
      if (selectedStats.includes('stats')) {
        markdown += `\n<p>&nbsp;<img align="center" src="https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&locale=en&theme=${theme}${statsOptionsStr}" alt="${githubUsername}" /></p>\n`;
      }

      // Add Most Used Languages
      if (selectedStats.includes('languages')) {
        markdown += `\n<p><img align="left" src="https://github-readme-stats.vercel.app/api/top-langs?username=${githubUsername}&show_icons=true&locale=en&layout=compact&theme=${theme}" alt="${githubUsername}" /></p>\n\n`;
      }

      // Add GitHub Streak Stats
      if (selectedStats.includes('streak')) {
        markdown += `\n<p><img align="center" src="https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=${theme}" alt="${githubUsername}" /></p>\n\n`;
      }

      // Add GitHub Trophies
      if (selectedStats.includes('trophies')) {
        markdown += `\n<p align="left"> <a href="https://github.com/ryo-ma/github-profile-trophy"><img src="https://github-profile-trophy.vercel.app/?username=${githubUsername}&theme=${theme}" alt="${githubUsername}" /></a> </p>\n\n`;
      }

      // Add Spotify Now Playing
      if (extras.includes('spotify')) {
        markdown += `\n<p align="center">
  <img src="https://spotify-github-profile.vercel.app/api/view?uid=${githubUsername}&cover_image=true&theme=default" alt="spotify"/>
</p>\n\n`;
      }

      // Add GitHub Activity Graph
      if (extras.includes('activity_graph')) {
        markdown += `\n<p><img align="center" src="https://activity-graph.herokuapp.com/graph?username=${githubUsername}&theme=${theme}" alt="${githubUsername}" /></p>\n\n`;
      }

      // Add Latest Blog Posts
      if (extras.includes('blog_posts')) {
        markdown += `\n### Blogs posts\n\n
<!-- BLOG-POST-LIST:START -->
<!-- BLOG-POST-LIST:END -->\n\n`;
      }

      // Add Support Links
      if (supportOptions.length > 0) {
        markdown += `\n\n<h3 align="left">Support:</h3>\n`;

        if (supportOptions.includes('buymeacoffee')) {
          markdown += `<p><a href="https://www.buymeacoffee.com/${buymeacoffeeUsername || githubUsername}"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="${buymeacoffeeUsername || githubUsername}" /></a></p><br><br>\n`;
        }

        if (supportOptions.includes('kofi')) {
          markdown += `<p><a href="https://ko-fi.com/${kofiUsername || githubUsername}"> <img align="left" src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="50" width="210" alt="${kofiUsername || githubUsername}" /></a></p><br><br>\n`;
        }

        if (supportOptions.includes('paypal')) {
          markdown += `<p><a href="https://paypal.me/${paypalUsername || githubUsername}"> <img align="left" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" height="50" width="210" alt="${paypalUsername || githubUsername}" /></a></p><br><br>\n`;
        }
      }

      return markdown;
    }

    function generateTechStackIcons(technologies) {
      const techIcons = {
        // Programming Languages
        javascript: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
        typescript: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
        python: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
        java: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
        c: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg',
        cpp: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg',
        csharp: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg',
        php: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg',
        ruby: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg',
        swift: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg',
        go: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg',
        rust: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-plain.svg',

        // Frontend
        html5: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg',
        css3: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg',
        react: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg',
        angular: 'https://angular.io/assets/images/logos/angular/angular.svg',
        vue: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg',
        bootstrap: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg',
        tailwind: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
        sass: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg',

        // Backend
        nodejs: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg',
        express: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg',
        django: 'https://cdn.worldvectorlogo.com/logos/django.svg',
        spring: 'https://www.vectorlogo.zone/logos/springio/springio-icon.svg',
        flask: 'https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg',
        laravel: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-plain-wordmark.svg',
        graphql: 'https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg',

        // Database
        mongodb: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg',
        mysql: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
        postgresql: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg',
        redis: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg',
        sqlite: 'https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg',
        oracle: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/oracle/oracle-original.svg',

        // DevOps
        aws: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
        docker: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg',
        kubernetes: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg',
        gcp: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg',
        azure: 'https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg',
        jenkins: 'https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg',
        git: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg',

        // Mobile
        android: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/android/android-original-wordmark.svg',
        ios: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/apple/apple-original.svg',
        flutter: 'https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg',
        reactnative: 'https://reactnative.dev/img/header_logo.svg',
        kotlin: 'https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg',
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

    // Navigation functions
    function goToStep(step) {
      if (step < 1 || step > totalSteps) return;

      // Hide all step contents
      stepContents.forEach(content => {
        content.style.display = 'none';
      });

      // Show current step content
      const currentContent = document.querySelector(`[data-step-content="${step}"]`);
      currentContent.style.display = 'block';

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
        top: mainContainer.offsetTop - 20,
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

    // Preview and download functions
    function updatePreview() {
      const formData = new FormData(form);
      const markdown = generateMarkdown(formData);
      const html = DOMPurify.sanitize(marked.parse(markdown));
      previewContent.innerHTML = html;
    }

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
    downloadBtn.addEventListener('click', downloadReadme);
    copyBtn.addEventListener('click', copyMarkdown);
    copyMarkdownBtn.addEventListener('click', () => {
      copyMarkdown();
      hideSuccessModal();
    });
    downloadReadmeBtn.addEventListener('click', () => {
      downloadReadme();
      hideSuccessModal();
    });

    // Initialize first step
    goToStep(1);
  });