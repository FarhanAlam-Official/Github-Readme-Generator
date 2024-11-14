document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('readmeForm');
    const previewContent = document.getElementById('previewContent');
    const downloadBtn = document.getElementById('downloadBtn');
  
    // Initialize marked with GitHub flavor
    marked.use({
      breaks: true,
      gfm: true
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
      const languages = formData.get('languages');
      const tools = formData.get('tools');
      const funFact = formData.get('funFact');
      const theme = formData.get('theme') || 'default';
      
      const selectedStats = Array.from(form.querySelectorAll('input[name="stats"]:checked'))
        .map(checkbox => checkbox.value);
      
      const extras = Array.from(form.querySelectorAll('input[name="extras"]:checked'))
        .map(checkbox => checkbox.value);
  
      const githubUsername = github || '[your-github-username]';
  
      let markdown = `<h1 align="center">Hi 👋, I'm ${name || '[Your Name]'}</h1>
  ${title ? `<h3 align="center">${title}</h3>\n` : ''}
  ${bio ? `<h3 align="center">${bio}</h3>\n` : ''}
  
  ${extras.includes('visitors') ? `<p align="left"><img src="https://komarev.com/ghpvc/?username=${githubUsername}&label=Profile%20views&color=0e75b6&style=flat" alt="${githubUsername}" /></p>\n` : ''}
  
  ${currentWork ? `- 🔭 I'm currently working on **${currentWork}**\n` : ''}
  ${learning ? `- 🌱 I'm currently learning **${learning}**\n` : ''}
  ${collaboration ? `- 👯 I'm looking to collaborate on **${collaboration}**\n` : ''}
  ${funFact ? `- ⚡ Fun fact **${funFact}**\n` : ''}
  
  <h3 align="left">Connect with me:</h3>
  <p align="left">
  ${linkedin ? `<a href="https://linkedin.com/in/${linkedin}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="${linkedin}" height="30" width="40" /></a>` : ''}
  ${twitter ? `<a href="https://twitter.com/${twitter}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="${twitter}" height="30" width="40" /></a>` : ''}
  ${facebook ? `<a href="https://fb.com/${facebook}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/facebook.svg" alt="${facebook}" height="30" width="40" /></a>` : ''}
  ${instagram ? `<a href="https://instagram.com/${instagram}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="${instagram}" height="30" width="40" /></a>` : ''}
  </p>
  
  ${(languages || tools) ? `<h3 align="left">Languages and Tools:</h3>
  <p align="left">
  ${generateTechStackIcons([
    ...(languages ? languages.split(',') : []),
    ...(tools ? tools.split(',') : [])
  ])}
  </p>\n` : ''}`;
  
      if (selectedStats.includes('stats')) {
        markdown += `\n<p>&nbsp;<img align="center" src="https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&locale=en&theme=${theme}" alt="${githubUsername}" /></p>`;
      }
      
      if (selectedStats.includes('languages')) {
        markdown += `\n<p><img align="left" src="https://github-readme-stats.vercel.app/api/top-langs?username=${githubUsername}&show_icons=true&locale=en&layout=compact&theme=${theme}" alt="${githubUsername}" /></p>`;
      }
      
      if (selectedStats.includes('streak')) {
        markdown += `\n<p><img align="center" src="https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=${theme}" alt="${githubUsername}" /></p>`;
      }
  
      if (extras.includes('spotify')) {
        markdown += `\n<p align="center">
          <img src="https://spotify-github-profile.vercel.app/api/view?uid=${githubUsername}&cover_image=true&theme=default" alt="spotify"/>
        </p>`;
      }
  
      return markdown;
    }
  
    function generateTechStackIcons(technologies) {
      const techIcons = {
        javascript: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
        typescript: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
        python: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
        java: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
        react: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
        nodejs: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg',
        mongodb: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg',
        mysql: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
        postgresql: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg',
        docker: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg',
        kubernetes: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg',
        aws: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
        git: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg',
        html5: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg',
        css3: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg',
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
  
    function updatePreview() {
      const formData = new FormData(form);
      const markdown = generateMarkdown(formData);
      const html = DOMPurify.sanitize(marked.parse(markdown));
      previewContent.innerHTML = html;
    }
  
    function downloadReadme() {
      const formData = new FormData(form);
      const markdown = generateMarkdown(formData);
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'README.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  
    // Add event listeners
    form.addEventListener('input', updatePreview);
    form.addEventListener('change', updatePreview);
    downloadBtn.addEventListener('click', downloadReadme);
  
    // Initial preview
    updatePreview();
  });