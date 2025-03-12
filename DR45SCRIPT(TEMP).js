// Initialize variables
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
        let dayNightStatus = dayNight;
        let approvalStatus = approved ? "Yes" : "No";
        addRow(timeString, dayNightStatus, approvalStatus);
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
            second++;
            count = 0;
        }

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        document.getElementById('hr').innerHTML = formatTime(hour);
        document.getElementById('min').innerHTML = formatTime(minute);
        document.getElementById('sec').innerHTML = formatTime(second);
        document.getElementById('count').innerHTML = formatTime(count);

        setTimeout(stopWatch, 10);
    }
}

// Function to add a new row to the table
function addRow(time, dayNight, approved) {
    let table = document.getElementById("Data").getElementsByTagName('tbody')[0];
    let row = table.insertRow();
    let timeCell = row.insertCell(0);
    let dayNightCell = row.insertCell(1);
    let approvedCell = row.insertCell(2);

    timeCell.innerHTML = time;
    dayNightCell.innerHTML = dayNight;
    approvedCell.innerHTML = approved;
}

// Function to handle approval action
function approve() {
    // Get the password and validate it (you can replace this with any password logic)
    let password = passwordField.value.trim();
    if (password === "your_password_here") {
        approved = true;
        alert("Approved!");
    } else {
        approved = false;
        alert("Incorrect password, approval failed.");
    }
}
