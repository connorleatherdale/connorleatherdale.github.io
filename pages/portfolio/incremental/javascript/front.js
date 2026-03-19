/* 
    the front end for the incremental game

    Essentially, this file is going to be used if anything in the actual HTML DOM needs to be changed, and calls everything else
*/

//might use workers, so that some of the computation is on a different thread than the main thread, so performance is better



//declare global variables

let value = 0;
let valuePerTick = 1;//Number(localStorage.getItem("valuePerTick")); // how much is added to value each tick
let tickLength = 0.00001; // gonna be used to change the length of a tick
let valueMultiplyer = 1;//Number(localStorage.getItem("valueMultiplier"));

const output = document.getElementById("value"); // just the main value to be shown

// sets everything when the page loads
document.addEventListener("DOMContentLoaded", function () {
    value = Number(localStorage.getItem("value")); // set value to watever is in local storage on start up, have to include Number() since localStorage gets saved as a string
    output.innerHTML = value;
    // functions that should be called constantly
    setInterval(perTick, tickLength); // set the perTick function to be called every (tickLength) seconds
    setInterval(saveValue,1000); // periodically save value to local storage

    // functions that should only be called once, when DOM loads
    checkLocalStorage();
});

// functions


// this function will probably be put into a webworker, to run on a different thread
// every "tick" (based on the tickLength Variable)
function perTick() {
    let newValue = value + (valuePerTick*valueMultiplyer);
    value = newValue;
    output.innerHTML = value;
    console.log("new tick");
}
// save value, periodically stores whatever is in the valeu var in this file, and saves it to local storage
function saveValue() {
    localStorage.setItem("value", value);
    console.log("saved value");
}

// check function, essentially just checks if everything in localStorage is there, if not, create it.
function checkLocalStorage() { 
    // checking if our variables are in local storage or not
    if (localStorage.getItem("valuePerTick") === null) { // check if valuePerTick exists, if it doesn't, create it
        localStorage.setItem("valuePerTick", 1);
    }

    if (localStorage.getItem("updateRate") === null) { // check if update rate exists
        localStorage.setItem("tickLength", 1);
    }

    if (localStorage.getItem("valueMultiplier") === null) { // check if valueMultiplier exists
        localStorage.setItem("valueMultiplier", 1);
    }

    // set our local variables (in this js file) to be equal to what we have in localStorage
    valuePerTick = localStorage.getItem("valuePerTick");
    tickLength = localStorage.getItem("tickLength");
    valueMultiplyer = localStorage.getItem("valueMultiplier");
}  

