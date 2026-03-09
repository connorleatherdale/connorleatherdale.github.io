
/*
function backgroundMode() {
    if (lightDarkMode == true) {
        document.body.style.backgroundColor = "rgb(0,0,0)";
        console.log("set background to dark");
    }
    if (lightDarkMode == false) {
        document.body.style.backgroundColor = "rgb(255,255,255)";
        console.log("set background to white");
    }
    console.log(lightDarkMode);
}
*/


//when page is loaded, change page to be the settings the user likes
window.addEventListener("DOMContentLoaded", function () {
    let modeValue = localStorage.getItem("light/dark mode");

    if (modeValue == "true") {
        document.body.style.backgroundColor = "rgb(134, 134, 134)";
        console.log("set background to dark");
    }
    if (modeValue == "false") {
        document.body.style.backgroundColor = "rgb(255,255,255)";
        console.log("set background to white");
    }

    //backgroundMode();
    console.log(modeValue);
});

//setInterval(backgroundMode, 100);