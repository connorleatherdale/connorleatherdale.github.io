//function to constantly update the time every second, going to use it at the header of my webpage

function updateTime(){
    var currentTime = new Date()
    var year = currentTime.getFullYear()
    var month = currentTime.getMonth()
    var day = currentTime.getDay()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()
    
    var actualDay = day + 1;

    if (minutes < 10){
        minutes = "0" + minutes
    }
    if (seconds < 10){
        seconds = "0" + seconds
    }
    var t_str = hours + ":" + minutes + ":";

    t_str += seconds;
    if(hours > 11){ //is it morning or afernoon
        t_str += "PM";
    } else {
        t_str += "AM";
    }
    

    // setup which month it is
    t_str += ", ";
    if (month == 0){
        t_str += "January"
    } else if (month == 1){
        t_str += "February";
    } else if (month == 2){
        t_str += "March";
    } else if (month == 3){
        t_str += "April";
    } else if (month == 4){
        t_str += "May";
    } else if (month == 5){
        t_str += "June";
    } else if (month == 6){
        t_str += "July";
    } else if (month == 7){
        t_str += "Augest";
    } else if (month == 8){
        t_str += "September";
    } else if (month == 9){
        t_str += "October";
    } else if (month == 10){
        t_str += "November";
    } else if (month == 11){
        t_str += "December";
    }

    // day and year
    t_str += ", " + actualDay + ", " + year;

    document.getElementById('time_span').innerHTML = t_str;
}
setInterval(updateTime, 100);