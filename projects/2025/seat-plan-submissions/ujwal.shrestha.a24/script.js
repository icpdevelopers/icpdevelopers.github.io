const seatPlans = {
    "24044447": { hall: "Annapurna", seat: "A-D01", block: "Nepal", time: "3:15pm to 5:15pm"},
    "24044448": { hall: "Macchapuchre", seat: "M-D19", block: "Nepal", time: "2:15pm to 3:15pm"},
    "24044449": { hall: "Kingston", seat: "K-D03", block: "UK", time: "3:15pm to 5:15pm"},
  };
  
  function findSeat() {
    const metId = document.getElementById("metId").value.toUpperCase();
    const result = document.getElementById("result");
  
    if (seatPlans[metId]) {
      const { hall, seat, block, time } = seatPlans[metId];
      result.innerHTML = `
        <strong>Hall:</strong> ${hall} <br>
        <strong>Seat Number:</strong> ${seat} <br>
        <strong>Block:</strong> ${block} <br>
        <strong>Time:</strong> ${time}
      `;
    } else {
      result.innerHTML = `<span style="color: red;">No seat plan found for this London Met ID.</span>`;
    }
  }

  