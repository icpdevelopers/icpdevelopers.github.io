document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const seatInfo = document.getElementById('seat-info');
    const resultName = document.getElementById('result-name');
    const resultSeat = document.getElementById('result-seat');
    const resultBlock = document.getElementById('result-block');
    const resultFloor = document.getElementById('result-floor');
    const seatPlan = document.getElementById('seat-plan');
    
    let seatData = {};
    let flattenedSeats = [];
    let highlightedSeat = null;

    // Process the seat data into a flattened array for searching
    function processSeatData(data) {
        const seats = [];
        for (const classroom in data) {
            const classroomData = data[classroom];
            for (const seatId in classroomData.seats) {
                const seat = classroomData.seats[seatId];
                if (seat.student) {
                    seats.push({
                        name: seat.student,
                        seat: seatId,
                        block: classroom,
                        floor: '', // Not available in the data
                        x: seat.x,
                        y: seat.y,
                        classroom: classroom
                    });
                }
            }
        }
        return seats;
    }

    // Fetch seat data from the provided JSON
    async function fetchSeatData() {
        try {
            const response = await fetch('seat.json');
            const data = await response.json();
            seatData = data;
            flattenedSeats = processSeatData(data);
            renderSeatPlan();
        } catch (error) {
            console.error('Error fetching seat data:', error);
            alert('Failed to load seat data. Please try again later.');
        }
    }

    // Render the seat plan
    function renderSeatPlan() {
        seatPlan.innerHTML = '';
        
        // Create a container for each classroom
        for (const classroom in seatData) {
            const classroomData = seatData[classroom];
            const maxRow = classroomData.max_row;
            const maxCol = classroomData.max_col;
            
            // Create classroom header
            const header = document.createElement('h3');
            header.textContent = `${classroom} (Rows: ${maxRow}, Columns: ${maxCol})`;
            seatPlan.appendChild(header);
            
            // Create a grid container for this classroom
            const gridContainer = document.createElement('div');
            gridContainer.className = 'classroom-grid';
            gridContainer.style.gridTemplateColumns = `repeat(${maxCol}, 1fr)`;
            seatPlan.appendChild(gridContainer);
            
            // Initialize empty grid
            const grid = [];
            for (let i = 0; i < maxRow; i++) {
                grid[i] = Array(maxCol).fill(null);
            }
            
            // Populate grid with seats
            for (const seatId in classroomData.seats) {
                const seat = classroomData.seats[seatId];
                grid[seat.x][seat.y] = {
                    id: seatId,
                    student: seat.student,
                    x: seat.x,
                    y: seat.y
                };
            }
            
            // Render grid
            for (let row = 0; row < maxRow; row++) {
                for (let col = 0; col < maxCol; col++) {
                    const seat = grid[row][col];
                    const seatElement = document.createElement('div');
                    
                    if (seat) {
                        seatElement.className = 'seat' + (seat.student ? ' occupied' : ' empty');
                        seatElement.textContent = seat.student ? seat.id : '';
                        seatElement.dataset.seatId = seat.id;
                        seatElement.dataset.classroom = classroom;
                        
                        if (seat.student) {
                            seatElement.addEventListener('click', () => {
                                displaySeatInfo({
                                    name: seat.student,
                                    seat: seat.id,
                                    block: classroom,
                                    floor: '' // Not available in the data
                                });
                                highlightSeat(seat.id, classroom);
                            });
                        }
                    } else {
                        seatElement.className = 'seat empty-space';
                    }
                    
                    gridContainer.appendChild(seatElement);
                }
            }
        }
    }

    // Display seat information
    function displaySeatInfo(seat) {
        resultName.textContent = seat.name;
        resultSeat.textContent = seat.seat;
        resultBlock.textContent = seat.block;
        resultFloor.textContent = seat.floor || 'N/A';
        seatInfo.classList.remove('hidden');
    }

    // Highlight the selected seat
    function highlightSeat(seatId, classroom) {
        // Remove previous highlight
        if (highlightedSeat) {
            const [prevSeatId, prevClassroom] = highlightedSeat;
            const prevSeat = document.querySelector(`.seat[data-seat-id="${prevSeatId}"][data-classroom="${prevClassroom}"]`);
            if (prevSeat) {
                prevSeat.classList.remove('highlight');
                if (prevSeat.classList.contains('occupied')) {
                    prevSeat.classList.add('occupied');
                }
            }
        }
        
        // Add new highlight
        const seatElement = document.querySelector(`.seat[data-seat-id="${seatId}"][data-classroom="${classroom}"]`);
        if (seatElement) {
            seatElement.classList.add('highlight');
            seatElement.classList.remove('occupied');
            highlightedSeat = [seatId, classroom];
            
            // Scroll to the seat
            seatElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    // Search for a seat by name
    function searchSeat() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (!searchTerm) return;
        
        const foundSeat = flattenedSeats.find(seat => 
            seat.name.toLowerCase().includes(searchTerm)
        );
        
        if (foundSeat) {
            displaySeatInfo(foundSeat);
            highlightSeat(foundSeat.seat, foundSeat.classroom);
        } else {
            alert('No seat found with that name. Please try again.');
            seatInfo.classList.add('hidden');
        }
    }

    // Event listeners
    searchBtn.addEventListener('click', searchSeat);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchSeat();
        }
    });

    // Initialize
    fetchSeatData();
});