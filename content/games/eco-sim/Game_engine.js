// game engine file, everything will be in here for the most part
/*
    
*/


//header part where all the variables shall live
//time-related variables
let Day = 1;
let Month = 0;
let MonthName = "January";
let Year = 0; //this can be changed to whatever year
let paused = 0; // 0 (false) = paused, and 1 (true) is unpaused

let timeConstant = 500; //for the tick function to be called X ammount of time (some constant * multiplier) in this case, this is the constant
let timeMultiplier = 1; //multiplier mentioned in previous comment (base is 1, which will be divided by multiples of 5 (.5,.25, etc) to create a 5x,10x and 15x time speed mutliplier)
let tickTime = timeConstant * timeMultiplier;
let timerID;
import * as month from "./dates.js"; // import the data related to the dates that i made








// time system

/*
    this function should be called every X amount of time (some constant * multiplier)
    every tick should move time forward by 1 day
    check how many days are in the specific month, and if its over, move to the next month
*/
function calculateDate() {
    Day++;
    if (Day > month.data[Month].days) { // if the Day value is greater than the number of days in the month
        Day = 1;
        Month++;
    }
    if (Month > 11) {
        Month = 0;
        Year++
    }

    
    MonthName = month.data[Month].name; // set the month name to whatever lines up in our dates.js array
    document.getElementById("date").innerHTML = MonthName + ", " + Day + ", " + Year;
}

// working on starting and pausing ticks
function startTick() {
    timerID = setInterval(tick, tickTime);
}
function stopTick() {
    clearInterval(timerID);
}






//then add a listener to see if the user presses a button
document.addEventListener("keydown", function(event) {
    //see if the user hits the space button (which is just " " which i find funny) and then essentially just do a toggle
    if (event.key === " ") {
        //simple true or false checker to pause and start the time
        if (paused == 0) {
            paused = 1;
            startTick();
            console.log("time paused")
        } else if (paused == 1) {
            
            paused = 0;
            stopTick();
            console.log("time was unpaused")
        }
        console.log("the space button was pressed");
    }




    //see if they hit 1,2, or 3 for the speed settings
    const time = document.getElementById("timeMultiplier");
    if (event.key === "1") {
        timeMultiplier = 1;
        time.innerHTML = "1x";
    }
    if (event.key === "2") {
        timeMultiplier = 0.5;
        time.innerHTML = "2x";
    }
    if (event.key === "3") {
        timeMultiplier = 0.25;
        time.innerHTML = "3x";
    }
    //update the tick time
    tickTime = timeConstant * timeMultiplier;
    if (paused == 1) { // stop and start the ticks to update the tick rate when the game is unpaused (jank af)
        if (event.key != " ") {
            stopTick();
            startTick();
        }   
    }
        
    

    console.log(event.key);
    console.log(tickTime);
    
})





//tick related nonesense
function tick() {
    calculateDate(); //check the date (should advance by 1 day each tick)
    
    
}




