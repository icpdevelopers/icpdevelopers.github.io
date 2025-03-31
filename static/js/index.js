        // Function to get the next occurrence of a recurring event
        function getNextRecurringEventDate(event) {
            if (event.repeat !== "weekly") return null;

            const now = new Date();
            const startDate = new Date(event.date);
            const eventTime = event.start.split(':').map(Number);

            // Set the initial event datetime
            startDate.setHours(eventTime[0], eventTime[1], eventTime[2]);

            // If the start date is in the future, return it
            if (startDate > now) return startDate;

            // Calculate next occurrence
            const dayOfWeek = event.weekdays;
            const currentDay = now.getDay();
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();
            const currentSeconds = now.getSeconds();

            let daysToAdd = (dayOfWeek - currentDay + 7) % 7;
            if (daysToAdd === 0) {
                // Same day, check if time has passed
                if (currentHours > eventTime[0] ||
                    (currentHours === eventTime[0] && currentMinutes > eventTime[1]) ||
                    (currentHours === eventTime[0] && currentMinutes === eventTime[1] && currentSeconds >= eventTime[2])) {
                    daysToAdd = 7; // Next week
                }
            }

            const nextDate = new Date(now);
            nextDate.setDate(now.getDate() + daysToAdd);
            nextDate.setHours(eventTime[0], eventTime[1], eventTime[2]);

            // Check if within the recurrence bounds
            const weekNumber = Math.floor((nextDate - startDate) / (7 * 24 * 60 * 60 * 1000)) + 1;
            if (event.end_at && weekNumber > event.end_at) return null; // Event series has ended

            return nextDate;
        }

        // Function to create countdown for the landing page (first event)
        function createLandingCountdown(event) {
            let targetDate;

            if (event.repeat === "none") {
                targetDate = new Date(`${event.date}T${event.start}`);
            } else if (event.repeat === "weekly") {
                targetDate = getNextRecurringEventDate(event);
                if (!targetDate) {
                    document.querySelector("#landingCountdown").style.display = "none";
                    document.querySelector("#saleActive").style.display = "none";
                    document.querySelector("#saleEnded").style.display = "block";
                    document.querySelector("#saleEnded").textContent = `${event.name} has ended`;
                    return;
                }
            }

            const timer = setInterval(() => {
                const now = new Date();
                const diff = targetDate - now;

                if (diff <= 0) {
                    clearInterval(timer);
                    document.querySelector("#landingCountdown").style.display = "none";
                    document.querySelector("#saleActive").style.display = "none";
                    document.querySelector("#saleEnded").style.display = "block";
                    document.querySelector("#saleEnded").textContent = `${event.name} has ended`;

                    if (event.repeat === "weekly") {
                        // For recurring events, check if there's another occurrence
                        const nextDate = getNextRecurringEventDate(event);
                        if (nextDate) {
                            // Restart the timer for the next occurrence
                            setTimeout(() => createLandingCountdown(event), 1000);
                        }
                    }
                    return;
                }

                // Calculate time components
                const seconds = Math.floor(diff / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);
                const displayHours = hours % 24;
                const displayMinutes = minutes % 60;
                const displaySeconds = seconds % 60;

                // Update the display
                document.getElementById("daysBox").innerHTML = days;
                document.getElementById("hoursBox").innerHTML = displayHours;
                document.getElementById("minsBox").innerHTML = displayMinutes;
                document.getElementById("secsBox").innerHTML = displaySeconds;

                // Update the sale message with event name
                document.querySelector("#saleHeading").textContent =
                    `${event.name}${event.description_top ? ' - ' + event.description_top : ''}`;

                document.querySelector("#saleActive").innerHTML =
                    `${event.description_bottom || "Hurry Ends Soon!"}`;

            }, 1000);
        }

        // Function to create countdown for other events
        function createOtherEventCountdown(event, container) {
            let targetDate;

            if (event.repeat === "none") {
                targetDate = new Date(`${event.date}T${event.start}`);
            } else if (event.repeat === "weekly") {
                targetDate = getNextRecurringEventDate(event);
                if (!targetDate) {
                    container.innerHTML = `
                        <h2>${event.name}</h2>
                        <p class="event-ended">Event series has ended</p>
                        ${event.description_bottom ? `<p>${event.description_bottom}</p>` : ''}
                    `;
                    return;
                }
            }

            const timer = setInterval(() => {
                const now = new Date();
                const diff = targetDate - now;

                if (diff <= 0) {
                    clearInterval(timer);
                    if (event.repeat === "none") {
                        container.innerHTML = `
                            <h2>${event.name}</h2>
                            <p class="event-ended">Event has ended</p>
                            ${event.description_bottom ? `<p>${event.description_bottom}</p>` : ''}
                        `;
                    } else {
                        // For recurring events, get the next occurrence
                        targetDate = getNextRecurringEventDate(event);
                        if (!targetDate) {
                            container.innerHTML = `
                                <h2>${event.name}</h2>
                                <p class="event-ended">Event series has ended</p>
                                ${event.description_bottom ? `<p>${event.description_bottom}</p>` : ''}
                            `;
                        } else {
                            // Restart the timer for the next occurrence
                            createOtherEventCountdown(event, container);
                        }
                    }
                    return;
                }

                // Calculate time components
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                // Format the event name (replace {i} with week number if needed)
                let eventName = event.name;
                if (event.repeat === "weekly" && event.name.includes("{i}")) {
                    var weekNumber = Math.floor((targetDate - new Date(event.date)) / (7 * 24 * 60 * 60 * 1000)) + 1;
                    weekNumber+=event.plusminus;
                    eventName = event.name.replace("{i}", weekNumber);
                }

                // Display the countdown
                container.innerHTML = `
                    <h2>${eventName}</h2>
                    ${event.description_top ? `<p>${event.description_top}</p>` : ''}
                    <div class="event-countdown">
                        <div>${days}<span>Days</span></div>
                        <div>${hours}<span>Hours</span></div>
                        <div>${minutes}<span>Minutes</span></div>
                        <div>${seconds}<span>Seconds</span></div>
                    </div>
                    ${event.description_bottom ? `<p>${event.description_bottom}</p>` : ''}
                `;
            }, 1000);
        }

        // Function to load and display the timeline
        function loadTimeline() {
            fetch('json/timeline.json')
                .then(response => response.json())
                .then(data => {
                    if (!data || !data.events || data.events.length === 0) {
                        document.getElementById('timelineSection').style.display = 'none';
                        return;
                    }
                    document.getElementById('timelineTitle').textContent = data.title || 'Timeline';
                    document.getElementById('timelineDescription').innerHTML = data.description || 'A timeline of events';

                    const timelineList = document.getElementById('timelineList');
                    timelineList.innerHTML = '';

                    data.events.forEach(event => {
                        const li = document.createElement('li');
                        li.className = 'event';
                        li.setAttribute('data-date', event.date_time_str || '');

                        const html = `
                            <h3>${event.name}</h3>
                            ${event.description ? `<p>${event.description}</p>` : ''}
                        `;

                        li.innerHTML = html;
                        timelineList.appendChild(li);
                    });
                })
                .catch(error => {
                    console.error('Error loading timeline:', error);
                    document.getElementById('timelineDescription').textContent = 'Failed to load timeline data';
                });
        }


        // Fetch events from JSON and initialize countdowns
        document.addEventListener('DOMContentLoaded', () => {
            fetch('json/timer.json')
                .then(response => response.json())
                .then(events => {
                    if (events.length === 0) return;

                    // if event0 is {}, hide landing section
                    if (Object.keys(events[0]).length === 0) {
                        document.getElementById('landingSection').style.display = 'none';
                    }else{
                        // First event gets the special landing page treatment
                        createLandingCountdown(events[0]);
                    }
                    // Other events get normal treatment
                    const otherEventsContainer = document.getElementById('otherEvents');
                    if(events.length<=1){
                        document.getElementById('otherEvents').style.display = "none";
                    }
                    for (let i = 1; i < events.length; i++) {
                        const eventContainer = document.createElement('div');
                        eventContainer.className = 'event-container';
                        otherEventsContainer.appendChild(eventContainer);
                        createOtherEventCountdown(events[i], eventContainer);
                    }
                })
                .catch(error => {
                    console.error('Error loading events:', error);
                    document.getElementById('landingSection').innerHTML =
                        '<h1>Error loading events</h1><p>Please try again later.</p>';
                });
            loadTimeline();
        });
