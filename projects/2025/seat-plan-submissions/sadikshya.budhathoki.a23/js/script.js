const seatPlan = {
    "ALEX DEVKOTA": { venue: "LT02-Annapurna", desk: "A-D09" },
    "BISHWAS RANA MAGAR": { venue: "LT02-Annapurna", desk: "A-D08" },
    "ANUSKA BHATTARAI": { venue: "LT02-Annapurna", desk: "A-D07" },
    "SADIKSHYA BUDHATHOKI": { venue: "LT02-Tilicho", desk: "A-D08" },
    "MAMATA BHATTARAI" : { venue: "LT02-Bigben", desk: "A-D07" },
    "RAM BAHADUR": { venue: "LT02-RUPA", desk: "A-D07" },
};

function findSeatPlan() {
    const name = document.getElementById('studentName').value.toUpperCase();
    const resultDiv = document.getElementById('result');

    if (seatPlan[name]) {
        const { venue, desk } = seatPlan[name];
        resultDiv.innerHTML = `
            <p><strong>Student:</strong> ${name}</p>
            <p><strong>Exam Venue:</strong> ${venue}</p>
            <p><strong>Desk Number:</strong> ${desk}</p>
        `;
        resultDiv.style.display = "block";
    } else {
        resultDiv.innerHTML = '<p style="color:red;">No record found for this name.</p>';
        resultDiv.style.display = "block";
    }
}
