document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('searchInput');
  const resultDiv = document.getElementById('result');

  fetch('students.json')
    .then(response => response.json())
    .then(data => {
      console.log("Loaded data:", data);

      input.addEventListener('input', function () {
        const query = input.value.trim().toUpperCase();
        console.log("Search Query:", query);

        if (query === '') {
          resultDiv.innerHTML = '';
          return;
        }

        let foundSeat = null;
        let className = '';

        // Looping  through each class in the data
        for (const [classKey, seatingPlan] of Object.entries(data)) {
          const seat = Object.values(seatingPlan.seats).find(seat => {
            const studentName = seat.student ? seat.student.trim().toUpperCase() : "";
            console.log("Checking seat in class", classKey, ":", studentName);
            return studentName.includes(query); // Partial match
          });

          if (seat) {
            foundSeat = seat;
            className = classKey;
            break; // Stop once we find a match
          }
        }

        if (foundSeat) {
          console.log("Found seat:", foundSeat);
          resultDiv.innerHTML = `
            <p><strong>Name:</strong> ${foundSeat.student}</p>
            <p><strong>Class:</strong> ${className}</p>
            <p><strong>Seat:</strong> ${Object.keys(data[className].seats)
              .find(key => data[className].seats[key].x === foundSeat.x && data[className].seats[key].y === foundSeat.y)}</p>
          `;
        } else {
          console.log("Student not found for name:", query);
          resultDiv.innerHTML = `<p>No student found for name: <strong>${query}</strong></p>`;
        }
      });
    })
    .catch(err => {
      console.error("Failed to load student data:", err);
      resultDiv.innerHTML = "<p style='color:red;'>Failed to load student list.</p>";
    });
});
