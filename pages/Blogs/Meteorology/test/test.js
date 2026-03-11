//messing around with functions and tying this to html, will have to use javascript to create a tornado intensity calculator, and maybe other things
// will see about adding other tools aswell, might add echo's tornado intensity calculator.

// I am slightly worried about memory usage, I am still new to JS, we will see



// sleep function i found
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


//messing around with something basic, everytime you press this button, the value adds one
let a = 1

function math() {
    let b = a++;
    return b;
                
}



// function to print to the <p id = demo> guy
function print() {
    document.getElementById("demo").innerHTML = math();
    console.log(a-1);
}

// functions to operate the form

const formValues = []; // gonna see if i can store everything in just one array

let x = 0;
let y = 0;
let z = 0;
let check1;



function input() {
    // valueAsNumber is needed, if you try to use .value, when trying to add, treats them as strings, instead of integers, so the math then gets funky
    x = document.getElementById('value1').valueAsNumber; // set the x variable to the input on the form
    formValues[0] = document.getElementById('value1').valueAsNumber;
    
    y = document.getElementById('value2').valueAsNumber; // set the y variable to the input of the form
    formValues[1] = document.getElementById('value2').valueAsNumber;

    
    check1 = document.getElementById("check1").checked; // set the variable check1 to either true or false, based on the form
    formValues[3] = document.getElementById("check1").checked;
    console.log(check1);
    console.log("form has been saved and printed"); // just to see if the function has saved

    z = x + y;
    formValues[2] = z;
    document.getElementById("demo").innerHTML = z;
    console.log(formValues);
}



// resets the form back to the starting "base level" 
function resetForm() {
    document.getElementById("form").reset();
    
    console.log("form has been reset");
}

// decided to mess around with storing variables in the browser's built in storage, using the local.storage api thing.

// saving the form to localStorage in the browser
function saveValue(){
  localStorage.setItem("value1",z); // set the value as the variable Z from ealier, can be anything though, just have it as this as a placeholder.
  localStorage.setItem("array", formValues);
}

// then loading the value and printing it to the console
function loadValue() {
  document.getElementById("demo").innerHTML = localStorage.getItem("value1");
  console.log(localStorage.getItem("value1"));
  console.log(localStorage.getItem("array"));
}


// testing out API calls and such, and whatnot idk
let w = new Worker("worker.js");

// call the worker and if the worker is undefined, change it, then wait for the message
function startWorker() {
  if (typeof(w) == "undefined") {
    w = new Worker("worker.js");
  }
  w.onmessage = function(event) {
    document.getElementById("result").innerHTML = event.data;
    console.log(event.data);
  };
}


// stop the worker, and make it undefined again, so we can re use it.
function stopWorker() {
  w.terminate();
  w = undefined;
}

