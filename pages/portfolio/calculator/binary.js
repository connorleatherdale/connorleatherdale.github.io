// JS file for the Binary page

//converter things

let input;
let output = document.getElementById("output");

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function calculate() {
    input = document.getElementById("input1").value;
    console.log(input);

    let binary = dec2bin(input);
    console.log(binary);

    output.value = "= " + binary;

    
}





//calculator things