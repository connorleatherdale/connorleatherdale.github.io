//Fluid Sim Script

/*
    Plans
    
    rendering
        - find something to help me create this
        - might see about using the gpu in part to render this
            - https://stackoverflow.com/questions/15213216/accessing-gpu-via-web-browser 
            - https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API
        - might start with rendering with the CPU at first, then try and get it to run on the GPu using the WebGPU api
            - might be really slow with the cpu, but easier to implement since we're already working on the cpu to begin with
    
    the actual simulation part of it
        - https://jamie-wong.com/2016/08/05/webgl-fluid-simulation/
        - https://academic.oup.com/mnras/article/425/2/1068/1187211?login=true
            - this one im not so sure about? althought ill keep it for now cause why not
        - https://www.mikeash.com/pyblog/fluid-simulation-for-dummies.html
            - this one looks good, but i think its meant for a C-based language, though i think i can still use it for javascript
        
        - notes
            - might make the actual simulation with calculating the points in a separate thread, so the performance improves
                - basically do the calculation on one thread, then in script.js, we actually show where they go/actually rendering them
        
*/


// helper functions/things i cant be bothered to write a million times, or just random bits (like developer tools ig)

// fps code, just checks the time between frames, and then shows it on the fps element in the html page
var fps = document.getElementById("fps");
var startTime = Date.now();
var frame = 0;

function tick() {
  var time = Date.now();
  frame++;
  if (time - startTime > 250) {
      fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
      startTime = time;
      frame = 0;
	}
  window.requestAnimationFrame(tick);
}
tick();


//ram usage
let RAMp = document.getElementById("ram");

function ram() {
    if (window.performance && window.performance.memory) { // checks to see if the browser supports it
        const memoryInfo = window.performance.memory;
        /*
        // console logs to show how much memory and whatnot
        console.log(`Used Heap: ${memoryInfo.usedJSHeapSize} bytes`);
        console.log(`Total Heap: ${memoryInfo.totalJSHeapSize} bytes`);
        console.log(`Heap Limit: ${memoryInfo.jsHeapSizeLimit} bytes`);
        */

        RAMp.innerHTML = "RAM usage: " + Math.floor((memoryInfo.totalJSHeapSize / 1024) / 1024) + "mb";
    }
}



// gonna try to use webgl

/*

// Request html canvas element
var canvas = document.getElementById("canvas");

// Create a WebGL rendering context  
var gl = canvas.getContext("webgl2");

// Tell user if their browser does not support WebGL
if (!gl) {
    alert("Your browser does not support WebGL");
}

// Set the color of the canvas.
// Parameters are RGB colors (red, green, blue, alpha)
gl.clearColor(0, 0.6, 0.0, 1.0);
// Clear the color buffer with specified color
gl.clear(gl.COLOR_BUFFER_BIT);

// Define shaders: vertex shader and fragment shader
const shaders = {
    vs: `#version 300 es
        in vec2 vertPosition;
        in vec3 vertColor;
        out vec3 fragColor;
    
        void main() {
            fragColor = vertColor;
            gl_Position = vec4(vertPosition, 0, 1);
        }`,

    fs: `#version 300 es
        precision mediump float;
        in vec3 fragColor;
        out vec4 outColor;
    
        void main() {
            outColor = vec4(fragColor, 1);
        }`
};
// Create WebGl Shader objects
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

// sets the source code of the WebGL shader
gl.shaderSource(vertexShader, shaders.vs);
gl.shaderSource(fragmentShader, shaders.fs);

// Compile GLSL Shaders to a binary data 
// so WebGLProgram can use them
gl.compileShader(vertexShader);
gl.compileShader(fragmentShader);
// Create a WebGLProgram
var program = gl.createProgram();

// Attach pre-existing shaders
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

//this is where we start to draw the triangle
const vertexAttributes = {
    position: {
        numberOfComponents: 2, // X and Y ordered pair coordinates
        data: new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
    },
    color: { 
        numberOfComponents: 3, // RGB triple
        data: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1])
    }
};

// Create an initialize vertex buffers
var vertexBufferObjectPosition = gl.createBuffer();
var vertexBufferObjectColor = gl.createBuffer();

// Bind existing attribute data
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObjectPosition);
gl.bufferData(gl.ARRAY_BUFFER, vertexAttributes.position.data, 
        gl.STATIC_DRAW);

var positionAttribLocation = gl.getAttribLocation(program, 
        'vertPosition');

gl.vertexAttribPointer(positionAttribLocation,
    vertexAttributes.position.numberOfComponents, 
        gl.FLOAT, gl.FALSE, 0, 0);
gl.enableVertexAttribArray(positionAttribLocation);

// Bind existing attribute data
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObjectColor);
gl.bufferData(gl.ARRAY_BUFFER, vertexAttributes.color.data, 
        gl.STATIC_DRAW);

var colorAttribLocation = gl.getAttribLocation(program, 
        'vertColor');

gl.vertexAttribPointer(colorAttribLocation,
    vertexAttributes.color.numberOfComponents, gl.FLOAT, 
            gl.FALSE, 0, 0);
gl.enableVertexAttribArray(colorAttribLocation);

// Set program as part of the current rendering state
gl.useProgram(program);
// Draw the triangle
gl.drawArrays(gl.TRIANGLES, 0, 3);

*/

// dealing with interacting with the webpage

// listening to the buttons and seeing if we should start or stop the sim
document.getElementById("start").addEventListener("click", Start);
document.getElementById("stop").addEventListener("click", stop);

let SIM = document.getElementById("sim");

let interval;

//start the sim
function Start() {
    interval = setInterval(drawFrame, 10); // draw a new frame every 10ms
    SIM.innerHTML = "SIM has started";
}
//stop the sim
function stop() {
    clearInterval(interval);
    SIM.innerHTML = "SIM paused";
}



// canvas related things
// dealing with drawing to the canvas
const canvas = document.getElementById("canvas");
canvas.height = 1000;
canvas.width = 2000;

// need this to figure out the boundaries of the canvas
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

const ctx = canvas.getContext('2d', { willReadFrequently: true });

// clear canvas function
function clearCanvas(consoleON) { // consoleON is just to see if you want to print a console log saying that the 
    ctx.clearRect(0, 0, 5000, 5000);
    if (consoleON == true) {
        console.log("Canvas has been cleared");
    }
    
}


//global constants and variables

// variables for storing the points
let particles = []; // storing each particle as a object, with ID, center x,y and radius

//some constants
const gravity = 9.81; //gravity constant (acceleration)



/*

    what i need to do
        - create a loop at the start to create a grid of circles
        - do the collisions between each circle
            - might be costly to do each frame, if i have a lot of circles ), plot twist it is
            - instead of looping over the entire array, find the closest particles 

*/

//draw a grid/line of circles
function firstDraw() {
    let x = 20; 
    let y = 20;
    let radius = 10;
    for (let i = 0; i < 10000; i++) {
        //drawing the new circle
        ctx.beginPath();
        ctx.arc(x,y,radius,0, Math.PI * 2, true); // arc(position X, position Y, radtius, start angle, stop angle, which way to draw)
        ctx.stroke();

        // adding the new "particle" to the array
        particles.push(
            {
                "id": i, 
                "x": x,
                "y": y,
                "radius": radius
            }
        )

        x = x + (radius*2) + 5;
        
        if (x >= canvasWidth) {
            y += (radius*2) + 5;
            x = 20;
            if (y > 150) {
                break;
            }
        }
    }
}
console.log(particles);

//function to draw the circle
function drawParticle(x, y, radius) {
    ctx.beginPath();

    ctx.arc(x,y,radius,0, Math.PI * 2, true); // arc(position X, position Y, radtius, start angle, stop angle, which way to draw)

    ctx.stroke();

    /*
    // this is very interesting, might make a gas sim out of this 
    for (let i = 0; i < 5; i++) {
        const x = 30 + Math.random() * 140; // Random X position
        const y = 30 + Math.random() * 140; // Random Y position
        const radius = 30;                  // Circle radius

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    }
        */
}


// calculating the physics

// collision function (empty for now)
function collision(targetX, targetY) {
    console.log("im just here as a placeholder");
    // check to see if there are any nearby particles
}



//what to do each frame
function drawFrame () {
    clearCanvas(false); // clears the entire canvas, has to be done first (dont want a console command everytime a new frame is drawn)


    // checking to see if the circle touches the bottom of the border, then set the center position to be equal to the border, but offset it by the radius, so the edge of the circle only touches the border. 
    //Runs every frame, which could be costly, but eh, needs to be checked, esp if i try to create a fluid
    //all the if statements here might need to be in a loop, to check every single circle
    //checking to see if it touches the top

    // loop through every particle and do a check
    for (let i=0; i < particles.length; i++) {
        //draw every particle

        //find the x,y and the radius for the specific particle
        let x = particles[i].x;
        let y = particles[i].y;
        let radius = particles[i].radius;
        //drawing the circle
        drawParticle(x,y,radius);

        //check to see if other particles overlap with our new particle (dont like how we are gonna have a loop inside a loop, not good for performance) NEEDS OPTIMIZATION
        for (let j=0; j < particles.length; j++) { //fps goes from stable to 10fps with this loop wow
            let newParticle = particles[i]; // current particle that we just spawned
            let randomParticle = particles[j]; // random particle in the particles[] array
            let distanceBetween = ((particles[i].x - particles[j].x)*(particles[i].x - particles[j].x) + ((particles[i].y - particles[j].y))*(particles[i].d - particles[j].d));
            // the distance between the two particles (euclidean distance, essentially its the squareroot of the change of X squared + the squareroot of the change of Y squared. Due to performance concerns, we only use multiplication, hence why the equation looks a bit funky above

            let overlap = (particles[i].radius + particles[j].radius) - distanceBetween;

            // resolving if they overlap
            if (distanceBetween < (particles[i].radius + particles[j].radius)){
                console.log("the balls are touching");
            }
        }

        //then figure out what we need to do after we draw the circle

        //applying gravity
        particles[i].y = y + gravity;

        //checking if we hit a border
        if (y + radius >= canvasHeight) {
            particles[i].y = canvasHeight - radius;
        }
    }
}




// what to do when the page loads
document.addEventListener("DOMContentLoaded", function () {
    firstDraw();
    setInterval(ram, 1000);
})