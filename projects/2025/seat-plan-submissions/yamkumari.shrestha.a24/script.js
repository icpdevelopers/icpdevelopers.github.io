// Search Functionality
function searchStudent() {
    const input = document.getElementById('studentSearch').value.toLowerCase();
    const rows = document.querySelectorAll('.student-row');
    let found = false;

    rows.forEach(row => {
        const name = row.getAttribute('data-name').toLowerCase();
        if (name.includes(input) && input !== '' && !found) {
            row.classList.remove('hidden');
            found = true;
        } else {
            row.classList.add('hidden');
        }
    });

    if (!found && input !== '') {
        alert('No student found with that name.');
    }
}

// Pagination and Show All Functionality
const studentsPerPage = 5;
let currentPage = 1;

function showAllStudents() {
    const table = document.getElementById('allStudentsTable');
    const pagination = document.getElementById('pagination');
    table.classList.remove('hidden');
    pagination.classList.remove('hidden');
    setupPagination();
    displayPage(currentPage);

    // Add event listener for arrow key navigation
    document.addEventListener('keydown', handleArrowKeys);
}

function setupPagination() {
    const rows = document.querySelectorAll('.all-student-row');
    const totalPages = Math.ceil(rows.length / studentsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.onclick = () => {
            currentPage = i;
            displayPage(currentPage);
        };
        if (i === currentPage) pageButton.classList.add('active');
        pagination.appendChild(pageButton);
    }
}

function displayPage(page) {
    const rows = document.querySelectorAll('.all-student-row');
    const start = (page - 1) * studentsPerPage;
    const end = start + studentsPerPage;

    rows.forEach((row, index) => {
        if (index >= start && index < end) {
            row.classList.remove('hidden');
        } else {
            row.classList.add('hidden');
        }
    });

    // Update active page button
    const buttons = document.querySelectorAll('.pagination button');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (parseInt(button.textContent) === page) {
            button.classList.add('active');
        }
    });
}

function handleArrowKeys(event) {
    const rows = document.querySelectorAll('.all-student-row');
    const totalPages = Math.ceil(rows.length / studentsPerPage);

    if (event.key === 'ArrowLeft' && currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
    } else if (event.key === 'ArrowRight' && currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
    }
}

// Initially hide all rows in search table
document.querySelectorAll('.student-row').forEach(row => {
    row.classList.add('hidden');
});
