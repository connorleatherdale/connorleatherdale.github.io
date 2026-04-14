//script for the clock
const p = document.getElementById("time");

// just storing the months as an array, since its better than a billion if statements, literall thats all
const Months = ["null", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function time() {
    let startTime = Date.now();
    let time = Temporal.Now.plainDateTimeISO();
    //finding the time in the day
    let hour = time.hour;
    let minute = time.minute;
    let seconds = time.second;

    //finding the date
    let day = time.day;
    let month = time.month;
    let year = time.year;

    //random other things
    let monthText;
    let AmPm;

    // check to see if seconds is below 10, and if it is, add a 0 infront
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    //same thing as before, but for minutes
    if (minute < 10) {
        minute = "0" + minute;
    }

    //now lets work with the hours
    if (hour < 10) {
        hour = "0" + hour;
    }
    // if the time is past 12, subtract 12 from the current time
    if (hour > 12) {
        hour = hour - 12;
        AmPm = "PM"
    } else {
        AmPm = "AM"
    }


    //figuring out the month and all dat
    monthText = Months[month];

    // print everything to the output on the screen
    p.innerHTML = monthText + " " + day + ", " + year +  "<br>"
    + hour + ":" + minute + ":" + seconds + " " + AmPm;

    // just for seeing how long it takes to run the function
    let timeTaken = Date.now() - startTime;
    console.log(timeTaken + "MS");
}

time(); // have it "innitialize when the user loads"
setInterval(time, 1000); // make it so the function get called every second