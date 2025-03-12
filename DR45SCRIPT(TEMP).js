let hr = 0, min = 0, sec = 0, count = 0;
let timer = false;

document.getElementById("start").addEventListener("click", function() {
    timer = true;
    stopwatch();
});

document.getElementById("stop").addEventListener("click", function() {
    timer = false;
});

document.getElementById("insert").addEventListener("click", function() {
    insertData();
});

function stopwatch() {
    if (timer) {
        count++;
        if (count == 100) {
            sec++;
            count = 0;
        }
        if (sec == 60) {
            min++;
            sec = 0;
        }
        if (min == 60) {
            hr++;
            min = 0;
        }

        document.getElementById("hr").innerText = formatTime(hr);
        document.getElementById("min").innerText = formatTime(min);
        document.getElementById("sec").innerText = formatTime(sec);
        document.getElementById("count").innerText = formatTime(count);

        setTimeout(stopwatch, 10);
    }
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function insertData() {
    let table = document.getElementById("Data").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    let date = new Date();
    let dateString = date.toLocaleDateString();
    let timeString = date.toLocaleTimeString();
    let dayNight = date.getHours() < 12 ? "AM" : "PM";
    let status = timer ? "Running" : "Stopped";

    let rowData = [dateString, timeString, dayNight, hr, min, sec, status];

    rowData.forEach((data) => {
        let cell = newRow.insertCell();
        cell.textContent = data;
    });
}
