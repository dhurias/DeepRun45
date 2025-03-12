// Stopwatch functionality
let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let insertBtn = document.getElementById('insert');

let hour = 0, minute = 0, second = 0, count = 0;
let timer = false;

startBtn.addEventListener('click', function () {
    timer = true;
    stopWatch();
});

stopBtn.addEventListener('click', function () {
    timer = false;
});

insertBtn.addEventListener('click', function () {
    insertStopwatch();
});

// Stopwatch function
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

        let hrString = hour < 10 ? "0" + hour : hour;
        let minString = minute < 10 ? "0" + minute : minute;
        let secString = second < 10 ? "0" + second : second;
        let countString = count < 10 ? "0" + count : count;

        document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;

        setTimeout(stopWatch, 10);
    }
}

// Function to insert stopwatch time into the table
function insertStopwatch() {
    let table = document.getElementById("Data");
    let newRow = table.insertRow(-1);

    let dateTime = new Date();

    // Format date
    let date = dateTime.toLocaleDateString(); 

    // Format time with AM/PM
    let timeNow = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    // Determine if it's day or night
    let hours = dateTime.getHours();
    let dayNight = (hours >= 6 && hours < 18) ? "Day" : "Night";

    // Insert values into the new row
    newRow.insertCell(0).innerHTML = date;
    newRow.insertCell(1).innerHTML = timeNow;
    newRow.insertCell(2).innerHTML = dayNight;
    newRow.insertCell(3).innerHTML = document.getElementById('hr').innerHTML;
    newRow.insertCell(4).innerHTML = document.getElementById('min').innerHTML;
    newRow.insertCell(5).innerHTML = document.getElementById('sec').innerHTML;
    newRow.insertCell(6).innerHTML = "Pending"; // Approval status placeholder

    // Reset stopwatch after inserting
    resetStopwatch();
}

// Reset function
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
