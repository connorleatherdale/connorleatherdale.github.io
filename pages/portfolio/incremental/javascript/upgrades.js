// file for all the event listeners and whatnot

//export functions

//checks if the values in local storage are 1, if they are, dont show the button, if they arent, show the button
export function checks() {
    // checking if our variables are in local storage or not
    if (localStorage.getItem("valuePerTick") === null) { // check if valuePerTick exists, if it doesn't, create it
        localStorage.setItem("valuePerTick", 1);
    }

    if (localStorage.getItem("updateRate") === null) { // check if update rate exists
        localStorage.setItem("updateRate", 1000);
    }

    if (localStorage.getItem("valueMultiplier") === null) { // check if valueMultiplier exists
        localStorage.setItem("valueMultiplier", 1);
    }

    // check if the first upgrade should be shown
    if (localStorage.getItem("upgrade1") == "1") {
        console.log("button shouldn't be shown")
        document.getElementById("upgrade1").disabled = true;
        document.getElementById("upgrade1").style.opacity = 0;
    } else {
        console.log("button should be shown")
        document.getElementById("upgrade1").disabled = false;
        document.getElementById("upgrade1").style.opacity = 1;
    }
}

// check if it can be upgrade, then if its upgraded, hide it
export function upgrade1() {
    console.log("you clicked a button")
    let currentValue = Number(localStorage.getItem("value")) - 25;
    if (Number(localStorage.getItem("value")) >= 100) {
        if (localStorage.getItem("upgrade1") == 0){
            localStorage.setItem("upgrade1", 1);
            localStorage.setItem("value", currentValue);
        }
    }

    
    checks();
}