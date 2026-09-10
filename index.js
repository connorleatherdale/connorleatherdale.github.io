// file for the javascript used in the index html page



// code to show/hide the changelog
// starting off with variables and setting things

let cl = document.getElementById("changelog");
let changeLogHidden = true; //start with the changelog hidden, to save space (maybe just show the latest changelog, might do that in the settings page or something idk)
cl.hidden = true;

//add an event listener so when the user clicks on the button, something actually happens
document.getElementById("change").addEventListener("click", changelog);

function changelog() {
    
    if (changeLogHidden == true) {
        changeLogHidden = false;
        cl.hidden = false;
    } else if (changeLogHidden == false) {
        changeLogHidden = true;
        cl.hidden = true;
    }
    console.log(changeLogHidden);
}