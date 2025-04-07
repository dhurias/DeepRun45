let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let insertBtn = document.getElementById('insert');
let passwordField = document.getElementById('password');
let timer = false;
let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
let approved = false;

let dayNight = "Day"; // Initially set to 'Day'

// Event listener for the start button
startBtn.addEventListener('click', function () {
    timer = true;
    stopWatch();
});

// Event listener for the stop button
stopBtn.addEventListener('click', function () {
    timer = false;
});

// Event listener for the insert button
insertBtn.addEventListener('click', function () {
    if (hour > 0 || minute > 0 || second > 0 || count > 0) {
        let timeString = `${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)}:${formatTime(count)}`;
        let currentDate = getCurrentDate();  // Get the current date
        let dayNightStatus = dayNight;
        let approvalStatus = approved ? "Yes" : "No";
        addRow(timeString, currentDate, dayNightStatus, approvalStatus);
    }
    resetStopwatch();
});

// Function to reset the stopwatch
function resetStopwatch() {
    timer = false;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('count').innerHTML = "00";
}

// Function to format time (e.g., 5 -> 05)
function formatTime(value) {
    return value < 10 ? "0" + value : value;
}

// Function to stop the stopwatch and update the display
function stopWatch() {
    if (timer) {
        count++;

        if (count == 100) {
            count = 0;
            second++;
        }

        if (second == 60) {
            second = 0;
            minute++;
        }

        if (minute == 60) {
            minute = 0;
            hour++;
        }

        document.getElementById('hr').innerHTML = formatTime(hour);
        document.getElementById('min').innerHTML = formatTime(minute);
        document.getElementById('sec').innerHTML = formatTime(second);
        document.getElementById('count').innerHTML = formatTime(count);

        setTimeout(stopWatch, 10);
    }
}

// Function to get the current date
function getCurrentDate() {
    let date = new Date();
    return date.toLocaleDateString();
}

// Function to add a new row to the table
function addRow(time, date, dayNightStatus, approvalStatus) {
    let table = document.getElementById("Data").getElementsByTagName('tbody')[0];
    let row = table.insertRow(table.rows.length);

    let timeCell = row.insertCell(0);
    let dateCell = row.insertCell(1);
    let dayNightCell = row.insertCell(2);
    let approvedCell = row.insertCell(3);

    timeCell.innerHTML = time;
    dateCell.innerHTML = date;
    dayNightCell.innerHTML = dayNightStatus;
    approvedCell.innerHTML = approvalStatus;
}

// Function to approve the entry
function approve() {
    if (passwordField.value === "1234") { // You can change this password to a dynamic value
        approved = true;
        alert("Approved!");
    } else {
        alert("Incorrect password");
    }
}

// Function to calculate the total hours
function calc() {
    let totalFullDayHours = 0;
    let totalFullNightHours = 0;
    let totalAllHours = 0;

    let table = document.getElementById("Data").getElementsByTagName('tbody')[0];
    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        let time = row.cells[0].innerHTML;
        let dayNight = row.cells[2].innerHTML;

        let hours = parseInt(time.split(":")[0]);
        let minutes = parseInt(time.split(":")[1]);
        let seconds = parseInt(time.split(":")[2]);

        let totalTimeInHours = hours + minutes / 60 + seconds / 3600;

        if (dayNight === "Day") {
            totalFullDayHours += totalTimeInHours;
        } else {
            totalFullNightHours += totalTimeInHours;
        }

        totalAllHours += totalTimeInHours;
    }

    document.getElementById("fullDayHours").innerHTML = totalFullDayHours.toFixed(2);
    document.getElementById("fullNightHours").innerHTML = totalFullNightHours.toFixed(2);
    document.getElementById("totalHours").innerHTML = totalAllHours.toFixed(2);
}
