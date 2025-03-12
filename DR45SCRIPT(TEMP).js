document.addEventListener("DOMContentLoaded", function () {
    let startBtn = document.getElementById('start');
    let stopBtn = document.getElementById('stop');
    let insertBtn = document.getElementById('insert');

    let hr = document.getElementById('hr');
    let min = document.getElementById('min');
    let sec = document.getElementById('sec');
    let count = document.getElementById('count');

    let table = document.getElementById("Data").getElementsByTagName('tbody')[0];

    let hour = 0, minute = 0, second = 0, milliseconds = 0;
    let timer = null;

    startBtn.addEventListener('click', function () {
        if (!timer) {
            timer = setInterval(stopWatch, 10);
        }
    });

    stopBtn.addEventListener('click', function () {
        clearInterval(timer);
        timer = null;
    });

    insertBtn.addEventListener('click', function () {
        insertStopwatch();
    });

    function stopWatch() {
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

        hr.textContent = formatTime(hour);
        min.textContent = formatTime(minute);
        sec.textContent = formatTime(second);
        count.textContent = formatTime(milliseconds);
    }

    function insertStopwatch() {
        let dateTime = new Date();

        let date = dateTime.toLocaleDateString('en-US'); // MM/DD/YYYY
        let timeNow = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

        let hours = dateTime.getHours();
        let dayNight = (hours >= 6 && hours < 18) ? "Day" : "Night";

        let newRow = table.insertRow();
        newRow.insertCell(0).textContent = date;
        newRow.insertCell(1).textContent = timeNow;
        newRow.insertCell(2).textContent = dayNight;
        newRow.insertCell(3).textContent = hr.textContent;
        newRow.insertCell(4).textContent = min.textContent;
        newRow.insertCell(5).textContent = sec.textContent;
        newRow.insertCell(6).textContent = "Pending"; // Approval status

        resetStopwatch();
    }

    function resetStopwatch() {
        clearInterval(timer);
        timer = null;
        hour = 0;
        minute = 0;
        second = 0;
        milliseconds = 0;
        hr.textContent = "00";
        min.textContent = "00";
        sec.textContent = "00";
        count.textContent = "00";
    }

    function formatTime(value) {
        return value.toString().padStart(2, "0");
    }
});
