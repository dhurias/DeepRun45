document.addEventListener("DOMContentLoaded", function () {
    let startBtn = document.getElementById('start');
    let stopBtn = document.getElementById('stop');
    let insertBtn = document.getElementById('insert');

    let hr = document.getElementById('hr');
    let min = document.getElementById('min');
    let sec = document.getElementById('sec');
    let count = document.getElementById('count');

    let table = document.getElementById("Data");

    let hour = 0, minute = 0, second = 0, milliseconds = 0;
    let timer = false;

    startBtn.addEventListener('click', function () {
        if (!timer) {
            timer = true;
            stopWatch();
        }
    });

    stopBtn.addEventListener('click', function () {
        timer = false;
    });

    insertBtn.addEventListener('click', function () {
        insertStopwatch();
    });

    function stopWatch() {
        if (timer) {
            milliseconds++;
            if (milliseconds == 100) {
                second++;
                milliseconds = 0;
            }
            if (second == 60) {
                minute++;
                second = 0;
            }
            if (minute == 60) {
                hour++;
                minute = 0;
            }

            hr.innerHTML = formatTime(hour);
            min.innerHTML = formatTime(minute);
            sec.innerHTML = formatTime(second);
            count.innerHTML = formatTime(milliseconds);

            setTimeout(stopWatch, 10);
        }
    }

    function insertStopwatch() {
        let dateTime = new Date();

        // Format date
        let date = dateTime.toLocaleDateString('en-US');

        // Format time with AM/PM
        let timeNow = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

        // Determine if it's day or night
        let hours = dateTime.getHours();
        let dayNight = (hours >= 6 && hours < 18) ? "Day" : "Night";

        let newRow = table.insertRow(-1);
        newRow.insertCell(0).innerHTML = date;
        newRow.insertCell(1).innerHTML = timeNow;
        newRow.insertCell(2).innerHTML = dayNight;
        newRow.insertCell(3).innerHTML = hr.innerHTML;
        newRow.insertCell(4).innerHTML = min.innerHTML;
        newRow.insertCell(5).innerHTML = sec.innerHTML;
        newRow.insertCell(6).innerHTML = "Pending"; // Approval status

        resetStopwatch();
    }

    function resetStopwatch() {
        timer = false;
        hour = 0;
        minute = 0;
        second = 0;
        milliseconds = 0;
        hr.innerHTML = "00";
        min.innerHTML = "00";
        sec.innerHTML = "00";
        count.innerHTML = "00";
    }

    function formatTime(value) {
        return value < 10 ? "0" + value : value;
    }
});
