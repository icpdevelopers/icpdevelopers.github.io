// Remove the hardcoded projects array and replace with fetch
let projects = [];
let categories = [];
let selectedCategory = 'All';

const filterButtons = document.getElementById('portfolio-filter-buttons');
const projectsGrid = document.getElementById('portfolio-projects-grid');

// Fetch projects from JSON
fetch('json/projects.json')
  .then(response => response.json())
  .then(data => {
    // Transform the JSON data to match our expected format
    projects = Object.entries(data).flatMap(([year, yearProjects]) =>
      yearProjects.map(project => ({
        title: project.title,
        category: year,
        image: project.image,
        description: project.description,
        links: {
          live: project.live_link,
          github: project.source_code
        },
        tag: project.tag || ''
      }))
    );

    // Extract unique categories (years)
    categories = [...new Set(projects.map(p => p.category))].sort((a, b) => b - a);
    selectedCategory = categories[0] || 'All';

    // Create filter buttons
    categories.forEach(category => {
      const button = document.createElement('button');
      button.innerText = category;
      button.className = selectedCategory === category
        ? 'portfolio-bg-white portfolio-text-black filterBtn'
        : 'portfolio-text-white portfolio-text-white-80 filterBtn2';
      button.onclick = () => {
        selectedCategory = category;
        updateUI();
      };
      filterButtons.appendChild(button);
    });

    // Initial UI setup
    updateUI();
  })
  .catch(error => {
    console.error('Error loading projects:', error);
    projectsGrid.innerHTML = '<p class="portfolio-text-white">Failed to load projects. Please try again later.</p>';
  });

// Keep the rest of your existing code (updateUI function) exactly the same
function updateUI() {
  // Update button styles
  [...filterButtons.children].forEach(button => {
    button.className = button.innerText === selectedCategory
      ? 'portfolio-bg-white portfolio-text-black filterBtn'
      : 'portfolio-text-white portfolio-bg-black filterBtn';
  });

  // Filter and display projects
  const filteredProjects = projects.filter(project =>
    selectedCategory === 'All' || project.category === selectedCategory
  );

  projectsGrid.innerHTML = '';
  filteredProjects.forEach(project => {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'portfolio-group relative overflow-hidden';

    projectDiv.innerHTML = `
      <div class="portfolio-media-wrapper relative">
        <img src="${project.image}" alt="${project.title}" class="portfolio-image portfolio-aspect-3-2 portfolio-object-cover" />
        <div class="portfolio-overlay-blur"></div>
      </div>
      <div class="portfolio-overlay portfolio-absolute portfolio-inset-0 portfolio-bg-gradient-to-t"></div>
      <div class="portfolio-absolute portfolio-bottom-0 portfolio-p-4">
        <p class="portfolio-progress">${project.tag}</p>
        <h3 class="portfolio-text-xl portfolio-font-semibold portfolio-text-white">${project.title}</h3>
        <p class="portfolio-description">${project.description}</p>
        <div class="portfolio-links mt-4">
        ${project.links.live ? `
          <a href="${project.links.live}" target="_blank" class="portfolio-btn">
            <button class="button">
              <svg width="24px" height="24px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003">
<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <g opacity="0.5"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46689 4.39207C5.75949 4.68526 5.75902 5.16013 5.46583 5.45273C3.78722 7.128 2.75 9.44218 2.75 12C2.75 14.5878 3.81163 16.9262 5.52503 18.6059C5.82082 18.8959 5.82554 19.3707 5.53557 19.6665C5.24561 19.9623 4.77076 19.967 4.47497 19.677C2.48564 17.7269 1.25 15.0071 1.25 12C1.25 9.02783 2.45721 6.33616 4.40623 4.39102C4.69941 4.09842 5.17429 4.09889 5.46689 4.39207ZM18.6164 4.46446C18.9122 4.17449 19.387 4.17921 19.677 4.475C21.5771 6.41326 22.75 9.07043 22.75 12C22.75 14.9645 21.5491 17.6499 19.609 19.5938C19.3164 19.887 18.8415 19.8875 18.5484 19.5949C18.2552 19.3023 18.2547 18.8274 18.5473 18.5342C20.2182 16.86 21.25 14.5512 21.25 12C21.25 9.47873 20.2422 7.1943 18.6059 5.52507C18.3159 5.22928 18.3206 4.75443 18.6164 4.46446ZM8.30923 7.48757C8.59226 7.79001 8.57652 8.26462 8.27408 8.54765C7.32517 9.43564 6.75 10.6502 6.75 11.9822C6.75 13.3297 7.33869 14.5573 8.30756 15.4479C8.61251 15.7282 8.63248 16.2026 8.35216 16.5076C8.07185 16.8125 7.59739 16.8325 7.29244 16.5522C6.03967 15.4006 5.25 13.7824 5.25 11.9822C5.25 10.203 6.02148 8.60128 7.24916 7.45242C7.5516 7.16939 8.02621 7.18513 8.30923 7.48757ZM15.7429 7.52559C16.0292 7.22626 16.5039 7.21571 16.8033 7.50202C18.0005 8.64714 18.75 10.2286 18.75 11.9822C18.75 13.7568 17.9825 15.3548 16.7604 16.503C16.4586 16.7867 15.9839 16.7719 15.7003 16.47C15.4167 16.1681 15.4315 15.6935 15.7333 15.4099C16.6778 14.5225 17.25 13.3108 17.25 11.9822C17.25 10.6692 16.6911 9.47046 15.7664 8.58599C15.4671 8.29968 15.4566 7.82492 15.7429 7.52559Z" fill="#fafafa"/> </g> <path d="M13.6563 10.4511C14.5521 11.1088 15 11.4376 15 12C15 12.5624 14.5521 12.8912 13.6563 13.5489C13.4091 13.7304 13.1638 13.9014 12.9384 14.0438C12.7407 14.1688 12.5168 14.298 12.2849 14.4249C11.3913 14.914 10.9444 15.1586 10.5437 14.8878C10.1429 14.617 10.1065 14.0502 10.0337 12.9166C10.0131 12.596 10 12.2817 10 12C10 11.7183 10.0131 11.404 10.0337 11.0834C10.1065 9.94977 10.1429 9.38296 10.5437 9.1122C10.9444 8.84144 11.3913 9.08599 12.2849 9.57509C12.5168 9.70198 12.7407 9.83123 12.9384 9.95619C13.1638 10.0986 13.4091 10.2696 13.6563 10.4511Z" fill="#fafafa"/> </g>
              </svg>
            </button>
          </a>` : ''}
          ${project.links.github ? `
          <a href="${project.links.github}" target="_blank" class="portfolio-btn">
            <button class="button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z" fill="white"></path>
              </svg>
            </button>
          </a>
          ` : ''}
        </div>
      </div>
    `;

    projectsGrid.appendChild(projectDiv);
  });
}
