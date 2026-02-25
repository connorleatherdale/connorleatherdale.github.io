//const form = document.getElementById("FirstValue");

let a = 1

function math() {
    let b = a++;
    return b;
                
}
function print(){
    document.getElementById("demo").innerHTML = math();
    console.log(a-1);
}

// Form functions and whatnot

let x = 0;
let y = 0;
let z = 0;

function input(){
    // valueAsNumber is needed, if you try to use .value, when trying to add, treats them as strings, instead of integers, so the math then gets funky
    x = document.getElementById('value1').valueAsNumber 
    y = document.getElementById('value2').valueAsNumber
}

//changes the <p> to the output of z
function printForm() {
    let z = x + y;
    document.getElementById("demo").innerHTML = z;
}

function form(x) {
    document.getElementById("demo").innerHTML = x;
}

