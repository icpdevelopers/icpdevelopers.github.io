let seatingData = {};

async function loadSeatData() {
    let response = await fetch("data.json");
    seatingData = await response.json();
    renderSeats();
}

function renderSeats() {
    let seatMap = document.getElementById("seatMap");
    seatMap.innerHTML = "";
    
    for (let hall in seatingData) {
        let layout = seatingData[hall];
        let { max_row, max_col, seats } = layout;

        seatMap.style.gridTemplateColumns = `repeat(${max_col}, 50px)`;

        for (let row = 0; row < max_row; row++) {
            for (let col = 0; col < max_col; col++) {
                let seatKey = Object.keys(seats).find(key => seats[key].x === row && seats[key].y === col);
                let seatDiv = document.createElement("div");

                seatDiv.classList.add("seat");
                if (seatKey) {
                    seatDiv.textContent = seatKey;
                    if (seats[seatKey].student) {
                        seatDiv.classList.add("occupied");
                    }
                } else {
                    seatDiv.textContent = "X"; // Empty seat
                }

                seatMap.appendChild(seatDiv);
            }
        }
    }
}

function findSeat() {
    let query = document.getElementById("searchInput").value.trim().toLowerCase();
    let foundSeat = null;
    let foundHall = null;

    for (let hall in seatingData) {
        let seats = seatingData[hall].seats;

        for (let seatID in seats) {
            let { x, y, student } = seats[seatID];

            if (seatID.toLowerCase() === query || (student && student.toLowerCase() === query)) {
                foundSeat = { seatID, x, y, student, hall };
                foundHall = hall;
                break;
            }
        }

        if (foundSeat) break;
    }

    document.querySelectorAll(".seat").forEach(seat => seat.classList.remove("selected"));

    if (foundSeat) {
        let { seatID, x, y, student, hall } = foundSeat;
        let index = x * seatingData[hall].max_col + y;
        let seatElements = document.querySelectorAll(".seat");

        if (seatElements[index]) {
            seatElements[index].classList.add("selected");
        }

        document.getElementById("result").innerHTML = `
            <p><strong>Hall:</strong> ${hall}</p>
            <p><strong>Seat ID:</strong> ${seatID}</p>
            <p><strong>Row:</strong> ${x + 1}</p>
            <p><strong>Column:</strong> ${y + 1}</p>
            <p><strong>Student:</strong> ${student || "None"}</p>
        `;
    } else {
        document.getElementById("result").innerHTML = "<p>Seat not found.</p>";
    }
}

window.onload = loadSeatData;
