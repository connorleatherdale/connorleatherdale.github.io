/* 
    the front end for the incremental game

    Essentially, this file is going to be used if anything in the actual HTML DOM needs to be changed, and calls everything else
*/

//might use workers, so that some of the computation is on a different thread than the main thread, so performance is better








//declare global variables

let value = 0;
let valuePerTick = 1;//Number(localStorage.getItem("valuePerTick")); // how much is added to value each tick
let tickLength = 1000; // gonna be used to change the length of a tick
let valueMultiplyer = 1;//Number(localStorage.getItem("valueMultiplier"));

const output = document.getElementById("value"); // just the main value to be shown

// sets everything when the page loads
document.addEventListener("DOMContentLoaded", function () {
    output.innerHTML = value;
    setInterval(perTick, tickLength); // set the perTick function to be called every (tickLength) seconds

    
    

});

// every "tick" (based on the tickLength Variable)
function perTick() {
    let newValue = value + (valuePerTick*valueMultiplyer);
    value = newValue;
    output.innerHTML = value;
    console.log("new tick");
}
