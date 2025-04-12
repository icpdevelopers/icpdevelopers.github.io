document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collecting the input data
    const username = document.getElementById('username').value;
    const londonMetId = document.getElementById('londonMetId').value;
    const year = document.getElementById('year').value;
    const semester = document.getElementById('semester').value;
    const stream = document.getElementById('stream').value;

    // Simulating data fetched from Excel (this should come from the backend in reality)
    const examData = getExamDetails(username, londonMetId, year, semester, stream);

    // Display the result
    if (examData) {
        document.getElementById('examVenue').textContent = `Exam Venue: ${examData.venue}`;
        document.getElementById('deskLocation').textContent = `Desk Location: ${examData.desk}`;
        document.getElementById('userName').textContent = `Username: ${examData.username}`;
        document.getElementById('result').classList.remove('hidden');
    } else {
        alert("No data found for this user.");
    }
});

function getExamDetails(username, londonMetId, year, semester, stream) {
    // This is just sample data, simulate Excel data here
    const mockData = [
        {
            username: 'Mishma Thapa Magar',
            londonMetId: '23048834',
            year: '2',
            semester: 'Spring',
            stream: 'Computer Science',
            venue: 'Tilicho',
            desk: 'D-809'
        },
        {
            username: 'Pameya Gurung',
            londonMetId: '23066789',
            year: '3',
            semester: 'Autumn',
            stream: 'BBA',
            venue: 'Rara',
            desk: 'D-298'
        }
    ];

    return mockData.find(data => 
        data.username === username && 
        data.londonMetId === londonMetId && 
        data.year === year && 
        data.semester === semester && 
        data.stream === stream
    );
}
