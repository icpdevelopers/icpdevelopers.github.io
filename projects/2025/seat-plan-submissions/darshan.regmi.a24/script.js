document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("seat-form");
  const userInput = document.getElementById("user-id");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const searchTerm = userInput.value.trim().toUpperCase();

    if (!searchTerm) return;

    fetch("seatPlan.json")
      .then(response => response.json())
      .then(data => {
        let found = false;
        let resultText = "";

        for (const room in data) {
          const roomData = data[room];

          for (const seatId in roomData.seats) {
            const seat = roomData.seats[seatId];
            
            if (seat.student.toUpperCase().includes(searchTerm)) {
              resultText += `
                🎓 ${seat.student}, your seat is ${seatId} in ${room}.<br/>
                🪑 Located at row ${seat.x + 1}, column ${seat.y + 1}.<br/><br/>
              `;
              found = true;
            }
          }
        }

        resultDiv.innerHTML = found
          ? `
            <h2>Seat Information</h2>
            ${resultText}
          `
          : `
            <h2>No Seat Found</h2>
            <p>No seat found for the entered name or ID.</p>
          `;

      })
      .catch(function(error) {
        console.error("Error:", error);
        resultDiv.innerHTML = `
          <h2>Error Loading Seat Data</h2>
          <p>There was an error loading the seat data.</p>
        `;
      });
  });
});