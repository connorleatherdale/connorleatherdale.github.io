// the front end for the incremental game

//gonna use workers for this, since the values might go nuts, and update constantly

//declare global variables

let value = 0;
let valuePerTick = 1; // how much is added to value each tick
let updateRate = 1; // gonna be used to change the length of a tick
let valueMultiplyer = 1;

// going to used IndexedDB to store everything

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








const output = document.getElementById("value");

document.addEventListener("DOMContentLoaded", function () {
  output.innerHTML = localStorage.getItem("value");
  setInterval(updateValue, updateRate);
});

function updateValue() {
    value += valuePerTick*valueMultiplyer;
    output.innerHTML = value;
    localStorage.setItem("value", value);
}

