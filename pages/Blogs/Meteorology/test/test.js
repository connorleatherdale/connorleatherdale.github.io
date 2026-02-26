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
function print(){
    document.getElementById("demo").innerHTML = math();
    console.log(a-1);
}

// functions to operate the form

let x = 0;
let y = 0;
let z = 0;

function input(){
    //let text;
    // valueAsNumber is needed, if you try to use .value, when trying to add, treats them as strings, instead of integers, so the math then gets funky
    x = document.getElementById('value1').valueAsNumber;
    //if (x<0){
        //text = "Input not valid";
        //document.getElementById("value1error").innerHTML = text;
    //}
    y = document.getElementById('value2').valueAsNumber;
    console.log("form has been saved and printed");

    z = x + y;
    document.getElementById("demo").innerHTML = z;
    console.log(z);
}



function resetForm() {
    document.getElementById("form").reset();
    //z = 0;
    //document.getElementById("demo").innerHTML = 0;
    console.log("form has been reset");
}



