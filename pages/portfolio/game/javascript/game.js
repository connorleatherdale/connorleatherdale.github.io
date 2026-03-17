// code for the game

//setting up the canvas
const canvas = document.getElementById("Canvas");
canvas.width = 750;
canvas.height = 400;

const ctx = canvas.getContext("2d");


// use this to change the position and whatnot, basically just storing where the player should be, and the scale it should be, allows us to change the position and whatnot
var player = {
    x:10,
    y:20,
    width:20,
    height:40
};

//clear the canvas then draw
player.width = 60;


//drawing the player
function drawPlayer() {
    ctx.fillRect(player.x,player.y,player.width,player.height);
    ctx.fillStyle = "rgb(200 0 0)";
  

  
}





// i think ill use this as the "main()" fuction, since alot of the time, what would needed to be done will happen on a key press anyways, probably will handle movement with this anyways

document.addEventListener('keydown', (event) => {
    console.log(event.key);
});

// Let k listen for keydown
document.addEventListener("keydown", function (event) {
// Then display the event.key
    console.log("you pressed " + event.key + "!");
    
    if (event.key == 'w') {
        ctx.clearRect(player.x,player.y,player.width,player.height); //clears the previous rectangle
        player.y -= 5; // makes it so it moves
        drawPlayer(); // then draws the new player
    } 
    if (event.key == 's') {
        ctx.clearRect(player.x,player.y,player.width,player.height);
        player.y += 5;
        drawPlayer();
    } 
    if (event.key == 'a') {
        ctx.clearRect(player.x,player.y,player.width,player.height);
        player.x -= 5;
        drawPlayer();
    } 
    if (event.key == 'd') {
        ctx.clearRect(player.x,player.y,player.width,player.height);
        player.x += 5;
        drawPlayer();
    } 
    // going to need to do the checks if the player wants to move diagonally, for example, if W and A are pressed, then move both w and left
    // might have to redo the keypress event 

    if (event.key == 'w' && event.key == 'd') {
        ctx.clearRect(player.x,player.y,player.width,player.height);
        player.x += 5;
        player.y -= 5
        drawPlayer();
    }
    
  
});


document.addEventListener("DOMContentLoaded", function () {
  drawPlayer();
});


// checks to see if canvas is supported or not
if (canvas.getContext) {
  console.log("canvas is supported");
  
  // drawing code here
} else {
  // canvas-unsupported code here
  console.log("canvas not supported");
}

