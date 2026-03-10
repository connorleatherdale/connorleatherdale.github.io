/*
Essentially, this JS file is tied to every single page/html file on the site, since its responsible for applying the settings to the page. Basically reads the settings stored in localStorage and applies them to the page
*/

let modeValue = localStorage.getItem("light/dark mode"); // find the value for light/dark mode
let smoothScroll = localStorage.getItem("scrollBehaviour"); // find the value for scroll behaviour


//check to see if dark mode is on, if not keep light mode on
function backgroundMode() {
    

    if (modeValue == "true") {
        document.body.style.backgroundColor = "rgb(134, 134, 134)";
        console.log("set background to dark");
    }
    if (modeValue == "false") {
        document.body.style.backgroundColor = "rgb(255,255,255)";
        console.log("set background to white");
    }

}

// check to see if smoothScroll is on, if not keep it as is
function scrollBehaviour() {
    if (smoothScroll == "true") {
        document.documentElement.style.scrollBehavior = "smooth";
        console.log("scroll set to smooth");
    }
    if (smoothScroll == "false") {
        document.documentElement.style.scrollBehavior = "auto";
        console.log("scroll set to normal");
    }
}



//when page is loaded, change page to be the settings the user likes
window.addEventListener("DOMContentLoaded", function () {
    backgroundMode();
    scrollBehaviour();

    console.log(modeValue);
    console.log(smoothScroll);
});

//setInterval(backgroundMode, 100);