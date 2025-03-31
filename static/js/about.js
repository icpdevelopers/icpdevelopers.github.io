fetch('json/members.json')
  .then(response => response.json())
  .then(data => {
    const teamContainer = document.getElementById('team-container');

    // Sort batches by year (newest first)
    const batches = Object.entries(data).sort((a, b) => b[0] - a[0]);

    batches.forEach(([year, batchData]) => {
      const featureBox = document.createElement('div');
      featureBox.className = 'feature-box';

      featureBox.innerHTML = `
        <div class="clearfix">
          <div class="feature-content">
            <h4>Batch of ${year}</h4>
            <p>${batchData.members.length} members</p>
            <p>${batchData.description}</p>
            <button class="view-members-btn" data-year="${year}">View Members</button>
            <button class="view-gallery-btn" data-year="${year}">View Gallery</button>
            </div>
        </div>
      `;

      teamContainer.appendChild(featureBox);
    });

    // Add event listeners for view buttons
    document.querySelectorAll('.view-members-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const year = this.getAttribute('data-year');
        showMembersModal(data[year], year);
      });
    });
    document.querySelectorAll('.view-gallery-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const year = this.getAttribute('data-year');
          fetchGallery(year);
        });
      });
  })
  .catch(error => {
    console.error('Error loading team data:', error);
    document.getElementById('team-container').innerHTML = `
      <div class="error-message">
        Failed to load team information. Please try again later.
      </div>
    `;
  });

// Function to fetch gallery data
function fetchGallery(year) {
    fetch('json/gallery.json')
      .then(response => response.json())
      .then(data => {
        if (data[year]) {
            console.log(data);
            console.log(data[year]);
          showGalleryModal(data[year], year);
        } else {
          alert(`No gallery found for ${year}`);
        }
      })
      .catch(error => {
        console.error('Error loading gallery:', error);
        alert('Failed to load gallery. Please try again later.');
      });
  }


  function showMembersModal(batchData, year) {
    const modal = document.createElement('div');
    modal.className = 'members-modal';

    let membersHTML = '';
    batchData.members.forEach(member => {
      membersHTML += `
        <div class="member-card">
          <img src="${member.image}" alt="${member.name}" class="member-image">
          <h3>${member.name}</h3>
           ${member.description ? `<p>${member.description}</p>` : ''}
          <div class="member-contact">
            ${member.contact ? `<a href="mailto:${member.contact}">${member.contact}</a>` : ''}
            ${member.social ? `<a target="_blank" href="${member.social}">Connect with them</a>` : ''}
          </div>
        </div>
      `;
    });

    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Batch ${year} Members</h2>
        <div class="members-grid">
          ${membersHTML}
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Close when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  // Function to show gallery in a modal
function showGalleryModal(galleryData, year) {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';

    let galleryHTML = '';
    galleryData.forEach((item, index) => {
      galleryHTML += `
        <div class="gallery-item">
          <img src="${item.image}" alt="Gallery image ${index + 1}" class="gallery-image">
          ${item.caption ? `<p class="gallery-caption">${item.caption}</p>` : ''}
        </div>
      `;
    });

    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Batch ${year} Gallery</h2>
        <div class="gallery-grid">
          ${galleryHTML}
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Close when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }
