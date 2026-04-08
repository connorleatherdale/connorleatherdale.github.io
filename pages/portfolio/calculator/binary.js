// JS file for the Binary page

//converter things

// variables and whatnot
const form = document.forms;
let input;
let output = document.getElementById("output");

console.log(form);

// converter functions

/*
  - decimal to binary
  - binary to decimal
  - decimal to hex
  - binary to hex
  - hex to decimal
  - hex to binary
*/

// converts a decimal number to a binary
function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

// converts a binary number to decimal
function bin2dec(bin) {
  return parseInt(bin, 2);
}

//  converts a decimal number to hex
function dec2hex(dec) {
  return Math.abs(dec).toString(16);
}

//converts a binary number to hex
function bin2hex(bin) {
  return parseInt(bin, 2).toString(16).toUpperCase();
}

//converting a hex number to decimal
function hex2dec(hex) {
  return parseInt(hex, 16).toString(2);
}



// runs when the user hits the submit button
function calculate() {
  input = document.getElementById("input1").value;
  let start = Date.now();
  
  


  //check which converter we should use
  let chosenOption = '';
  let len = document.forms.converter.length

  // go through the radio and find which one is checked
  for (let i = 0; i < len; i++) {
    if (document.forms.converter[i].checked) {
      chosenOption = document.forms.converter[i].value;
    }
  }

  // check if the user has selected a converter
  if (chosenOption == '') {
    alert('Please choose a converter type!');
    return false;
  } else {
    // now use the converter that the user selects
    if (chosenOption == 'bin-dec') { // binary to decimal converter
      output.value = "Output: " + bin2dec(input);
    } else if (chosenOption == 'dec-bin') {
      output.value = "Output: " + dec2bin(input);
    } else if (chosenOption == 'dec-hex') {
      output.value = "Output: " + dec2hex(input);
    } else if (chosenOption == 'bin-hex') {
      output.value = "Output: " + bin2hex(input);
    } 

  }



  //finding out how long it takes to run the calculation
  let timeTaken = Date.now() - start;
  console.log("calculated in " + timeTaken + "ms");
}





//calculator things