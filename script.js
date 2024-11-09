let randomDate = null; // Store the generated random date

function setDateRange(range) {
  const [start, end] = range.split('-').map(year => new Date(year, 0, 1));
  startDate = start;
  endDate = new Date(end.getFullYear(), 11, 31);
  document.getElementById('result').innerText = ""; // Reset result when range changes
}

function showTab(tabName) {
  const tabContents = document.getElementsByClassName('tab-content');
  const tabButtons = document.getElementsByClassName('tab-button');

  // Hide all tab contents and remove 'active' class from buttons
  Array.from(tabContents).forEach(tab => tab.classList.remove('active'));
  Array.from(tabButtons).forEach(button => button.classList.remove('active'));

  // Show selected tab content and add 'active' class to the button
  document.getElementById(tabName).classList.add('active');
  event.target.classList.add('active');
}

function generateRandomDate() {
  const selectedRange = document.querySelector('input[name="date-range"]:checked');

  // Check if a date range is selected
  if (!selectedRange) {
    alert("Please select a date range before generating a random date.");
    return; // Exit the function if no range is selected
  }

  // Generate a random date within the selected range
  randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

  // Format date as "8 January 2021" without the day of the week
  const day = randomDate.getDate();
  const month = randomDate.toLocaleDateString('en-US', { month: 'long' });
  const year = randomDate.getFullYear();
  const formattedDate = `${month} ${day},${year}`;

  // Display the random date
  document.getElementById('result').innerHTML = `${formattedDate}`;
}

function revealDayOfWeek() {
  if (!randomDate) {
    document.getElementById('result').innerText = "Please generate a date first.";
    return;
  }
 // document.getElementById('result').innerHTML = "";
  // Get the day of the week
  const dayOfWeek = randomDate.toLocaleDateString('en-US', { weekday: 'long' });

  // Display the day of the week in a large, flashing style
  document.getElementById('result').innerHTML += `<div class="day-flash">${dayOfWeek}</div>`;
}

function displayYearlyCalendar() {
  if (!randomDate) {
    document.getElementById('result').innerText = "Please generate a date first.";
    return;
  }

  const year = randomDate.getFullYear();
  const calendarContainer = document.getElementById('calendar');
  calendarContainer.innerHTML = `<h2>${year} Calendar</h2>`;
  
  // Clear previous calendar content
  calendarContainer.innerHTML = "";

  // Loop through each month to generate the calendar
  for (let month = 0; month < 12; month++) {
    const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long' });
    const monthDiv = document.createElement('div');
    monthDiv.className = "month";

    // Display month name
    monthDiv.innerHTML = `<h3>${monthName}  ${year}</h3>`;

    // Create a grid for the days of the week
    const daysGrid = document.createElement('div');
    daysGrid.className = "days-grid";

    // Add day names (Sun, Mon, etc.)
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayNames.forEach(day => {
      const dayName = document.createElement('div');
      dayName.className = "day-name";
      dayName.innerText = day;
      daysGrid.appendChild(dayName);
    });

    // Add days for the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Fill in blank spaces for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = "day empty";
      daysGrid.appendChild(emptyCell);
    }

    // Fill in actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement('div');
      dayCell.className = "day";
      dayCell.innerText = day;
      daysGrid.appendChild(dayCell);
    }

    monthDiv.appendChild(daysGrid);
    calendarContainer.appendChild(monthDiv);
  }
}
function resetDisplay() {
  // Clear the random date display
  document.getElementById('result').innerHTML = "";

  // Clear the yearly calendar display
  document.getElementById('calendar').innerHTML = "";

  // Reset the stored random date variable
  randomDate = null;
}

function revealSelectedDayOfWeek() {
  const dateInput = document.getElementById('manualDate').value;
  if (!dateInput) {
    document.getElementById('manualResult').innerText = "Please select a date.";
    return;
  }

  const selectedDate = new Date(dateInput);
  const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
  document.getElementById('manualResult').innerHTML = `Selected Day: <span class="day-flash">${dayOfWeek}</span>`;
}

document.addEventListener("DOMContentLoaded", () => {
  populateMonths();
  populateYears();
});

function populateMonths() {
  const monthSelect = document.getElementById("month");
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  monthNames.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index + 1;
    option.text = month;
    monthSelect.appendChild(option);
  });
}

function populateYears() {
  const yearSelect = document.getElementById("year");
  const currentYear = new Date().getFullYear();
  const startYear = 1600;
  const endYear = 2500;

  for (let year = startYear; year <= endYear; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    yearSelect.appendChild(option);
  }
}

function updateDays() {
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);
  const daySelect = document.getElementById("day");

  if (!month || !year) return;

  // Clear existing days
  daySelect.innerHTML = '<option value="" disabled selected>Day</option>';

  // Determine the number of days in the selected month and year
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const option = document.createElement("option");
    option.value = day;
    option.text = day;
    daySelect.appendChild(option);
  }
}

function revealSelectedDayOfWeek() {
  const month = parseInt(document.getElementById("month").value);
  const day = parseInt(document.getElementById("day").value);
  const year = parseInt(document.getElementById("year").value);

  if (!month || !day || !year) {
    document.getElementById("manualResult").innerText = "Please select a complete date.";
    return;
  }

  const selectedDate = new Date(year, month - 1, day);
  const dayOfWeek = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
  document.getElementById("manualResult").innerHTML = `Selected Day: <span class="day-flash">${dayOfWeek}</span>`;
}
