document.addEventListener("DOMContentLoaded", () => {
  // Register
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value;

      if (name && email && password) {
        const user = { name, email, password };
        localStorage.setItem("user", JSON.stringify(user));
        document.getElementById("registerMsg").innerHTML =
          "<p style='color:green;'>✅ Registration successful. You can now <a href='login.html'>login</a>.</p>";
        registerForm.reset();
      }
    });
  }

  // Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
      } else {
        document.getElementById("loginMsg").innerHTML = "<p style='color:red;'>❌ Invalid credentials.</p>";
      }
    });
  }

  // Seat Plan
  const nameInput = document.getElementById("nameInput");
  const resultBox = document.getElementById("result");

  if (nameInput && resultBox) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "login.html";
      return;
    }

    nameInput.addEventListener("input", () => {
      const name = normalizeName(nameInput.value);
      if (name.length > 1) {
        resultBox.innerHTML = "🔍 Searching...";
        fetchSeatPlan(name);
      } else {
        resultBox.innerHTML = "";
      }
    });
  }

  async function fetchSeatPlan(name) {
    const url = "https://gist.githubusercontent.com/icpdevelopers/7066f64d103d65839a2a348c96bd2d3c/raw/ef5d5a13f52bebe89b29e62039ec8fa582a3e8aa/seat_plan.json";

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to load seat data.");

      const data = await response.json();
      let found = false;

      for (const hall in data) {
        const seats = data[hall].seats;
        for (const seatCode in seats) {
          const seat = seats[seatCode];
          const student = normalizeName(seat.student);

          if (student === name) {
            resultBox.innerHTML = `
              <h3>Your Seat Found:</h3>
              <p><strong>Student:</strong> ${seat.student}</p>
              <p><strong>Class:</strong> ${hall}</p>
              <p><strong>Seat Code:</strong> ${seatCode}</p>
              <p><strong>Coordinates:</strong> Row ${seat.x + 1}, Column ${seat.y + 1}</p>
            `;
            found = true;
            break;
          }
        }
        if (found) break;
      }

      if (!found) {
        resultBox.innerHTML = `<p>❌ No seat found for "<strong>${name}</strong>".</p>`;
      }

    } catch (err) {
      resultBox.innerHTML = `<p>Error: ${err.message}</p>`;
    }
  }

  function normalizeName(name) {
    return name.trim().toUpperCase().replace(/\s+/g, " ");
  }
});
