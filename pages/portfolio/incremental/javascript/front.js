/* 
    the front end for the incremental game

    Essentially, this file is going to be used if anything in the actual HTML DOM needs to be changed, and calls everything else
*/

//gonna use workers for this, since the values might go nuts, and update constantly, will work on that later


//Importing all the functions

import { upgrade1 } from "./upgrades.js";
import { checks } from "./upgrades.js";






//declare global variables

// setting the local storage variables to the defaults



let value = Number(localStorage.getItem("value"));
let valuePerTick = Number(localStorage.getItem("valuePerTick")); // how much is added to value each tick
let updateRate = 1000; // gonna be used to change the length of a tick
let valueMultiplyer = 1;

const output = document.getElementById("value"); // just the main value to be shown

document.addEventListener("DOMContentLoaded", function () {
    output.innerHTML = localStorage.getItem("value");
    setInterval(tick, updateRate);
    checks();

});

// setting up the upgrades

if (localStorage.getItem("upgrade1") != 1) {
    localStorage.setItem("upgrade1", 0);
}





/* going to used IndexedDB to store everything

// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var open = indexedDB.open("Incremental", 1);

// Create the schema
open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("Values", {keyPath: "id"});
    var index = store.createIndex("value", "value");
};

open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    var tx = db.transaction("Values", "readwrite");
    var store = tx.objectStore("Values");
    var index = store.index("value");

    // Add some data
    store.put({id: 1, value: value});
    
    // Query the data
    

    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
}
*/


// adding the logic to upgrade buttons

document.getElementById("upgrade1").addEventListener("click", upgrade1);




// functions

//tick function, runs every X amount of time. Inside are things that need to be checked/updated every tick
function tick() {
    updateValue();
    checks();
    // checking to see if any upgrades happened
    if (Number(localStorage.getItem("upgrade1")) == 1) {
        localStorage.setItem("valuePerTick",2);
    }
    console.log("tick");
}

// function runs constantly
function updateValue() {
    value += valuePerTick*valueMultiplyer;
    output.innerHTML = value;
    localStorage.setItem("value", value);
    console.log("updated number");
}

