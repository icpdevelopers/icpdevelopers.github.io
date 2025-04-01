// Function to close popup
function closepopup() {
    const popup = document.getElementById('pop-up');
    popup.style.display = 'none';
    // Set cookie to remember the user closed it
    document.cookie = "popupClosed=true; max-age=1200"; // 20 mins
}

// Function to show popup
function showPopup(content, link_url = null, link_text = null) {
    const popup = document.getElementById('pop-up');
    const contentElement = document.getElementById('popup-content');
    const linkElement = document.getElementById('popup-link');
    const linkText = document.getElementById('link_text');

    // Update content
    contentElement.innerHTML = content;
    if (link_url) {
        linkElement.href = link_url;
        linkText.textContent = link_text ? link_text : 'Learn more';
        linkElement.style.display = 'block';
    }
    else {
        linkElement.style.display = 'none';
    }

    // Only show if user hasn't closed it recently
    if (!document.cookie.includes('popupClosed=true')) {
        popup.style.display = 'block';
    }
}

// Fetch popup data when page loads
document.addEventListener('DOMContentLoaded', () => {
    fetch('/json/popup.json')
        .then(response => response.json())
        .then(data => {
            if (data.content) {
                showPopup(data.content, data.link_url, data.link_text);
            }
        })
        .catch(error => {
            console.error('Error loading popup content:', error);
        });
});
