/* 
    the front end for the incremental game

    Essentially, this file is going to be used if anything in the actual HTML DOM needs to be changed, and calls everything else
*/



//might use workers, so that some of the computation is on a different thread than the main thread, so performance is better

// found an fps counter, might use this for debugging
var fps = document.getElementById("fps");
var startTime = Date.now();
var frame = 0;

function tick() {
  var time = Date.now();
  frame++;
  if (time - startTime > 1000) {
      fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
      startTime = time;
      frame = 0;
	}
  window.requestAnimationFrame(tick);
}
tick();


//declare global variables

let value = 0;
let valuePerTick = 1;//Number(localStorage.getItem("valuePerTick")); // how much is added to value each tick
let tickLength = 1000; // gonna be used to change the length of a tick
let valueMultiplyer = 1;//Number(localStorage.getItem("valueMultiplier"));

// checking upgrades

let upgrd1;
let upgrd2;

const output = document.getElementById("value"); // just the main value to be shown

// upgrade listeners
//upgrade1 listener
document.getElementById("upgrade1").addEventListener("click", upgrade1);
//next button listener
document.getElementById("upgradeMultiplier1").addEventListener("click",upgrade2);

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


// creating functions for calculating cost and whatnot
function cost(x) {
    return Math.round(Math.pow(x,2));
    // returns a rounded exponential function, basic one, f(1)=1, f(2)=4, f(3)=9...
}

// this function will probably be put into a webworker, to run on a different thread

// every "tick" (based on the tickLength Variable)
//IMPORTANT FUNCTION
function perTick() {
    upgradeCheck();
    let newValue = value + (valuePerTick*valueMultiplyer);
    value = newValue;
    output.innerHTML = value;
    console.log("new tick");
    checkLocalStorage();
    buttonCheck();

    //changing debug
    document.getElementById("VPT").innerHTML = "Value Per Tick: " + valuePerTick;
    document.getElementById("TL").innerHTML = "Tick Length (in ms): " + tickLength;
    document.getElementById("MP").innerHTML = "value multiplier: " + valueMultiplyer;
}

//dealing with the buttons, whether we should hide and disable, or show and enable
function buttonCheck() {
    //checking the first button
    if (localStorage.getItem("upgrade1") == "1") {
        console.log("button shouldn't be shown")
        document.getElementById("upgrade1").disabled = true;
        document.getElementById("upgrade1").style.opacity = 0;
    } else {
        console.log("button should be shown")
        document.getElementById("upgrade1").disabled = false;
        document.getElementById("upgrade1").style.opacity = 1;
    }
    //checking the next button, the upgrade multiplier one
    if (localStorage.getItem("upgrade2") == "1") {
        document.getElementById("upgradeMultiplier1").disabled = true;
        document.getElementById("upgradeMultiplier1").style.opacity = 0;
    } else {
        document.getElementById("upgradeMultiplier1").disabled = false;
        document.getElementById("upgradeMultiplier1").style.opacity = 1;
    }
}

// checks if we need to upgrade the values or not
function upgradeCheck() {
    if (localStorage.getItem("upgrade1") == "1") {
        localStorage.setItem("valuePerTick", 2);
        valuePerTick = 2;
    }
    if (localStorage.getItem('upgrade2') == "1"){
        localStorage.setItem("valueMultiplier", 2);
        valueMultiplyer = 2;
    }
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
        localStorage.setItem("tickLength", 1000);
    }

    if (localStorage.getItem("valueMultiplier") === null) { // check if valueMultiplier exists
        localStorage.setItem("valueMultiplier", 1);
    }

    if (localStorage.getItem("upgrade1") === null) { // check if upgrade1 exists
        localStorage.setItem("upgrade1", 0);
    }

    if (localStorage.getItem("upgrade2") === null) { // check if upgrade1 exists
        localStorage.setItem("upgrade2", 0);
    }

    // checking if we need to implement any upgrades

    
    // set our local variables (in this js file) to be equal to what we have in localStorage
    valuePerTick = Number(localStorage.getItem("valuePerTick"));
    tickLength = Number(localStorage.getItem("tickLength"));
    valueMultiplyer = Number(localStorage.getItem("valueMultiplier"));
    upgrd1 = Number(localStorage.getItem("upgrade1"));
    upgrd2 = Number(localStorage.getItem("upgrade2"));
    
}  

// upgrade functions
function upgrade1() {
    if (upgrd1 == 0) {
        if (value >= 50){
            localStorage.setItem("upgrade1",1);
            value -= cost(upgrd1);
        }
    }
    if (upgrd1 == 1) {
        localStorage.setItem("upgrade1",1);
    }
}

function upgrade2() {
    if (upgrd2 == 0) {
        if (value >= 100){
            localStorage.setItem("upgrade2", 1);
            cost(upgrd2);
        }
    }
    if (upgrd2 == 1) {
        localStorage.setItem("upgrade2", 1);
    }
}