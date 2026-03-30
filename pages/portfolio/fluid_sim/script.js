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
        
*/


// fps code, just checks the time between frames, and then shows it on the fps element in the html page
var fps = document.getElementById("fps");
var startTime = Date.now();
var frame = 0;

function tick() {
  var time = Date.now();
  frame++;
  if (time - startTime > 1000) {
      fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
      startTime = time;
      frame = 0;
	}
  window.requestAnimationFrame(tick);
}
tick();





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





// dealing with drawing to the canvas
const canvas = document.getElementById("canvas");
canvas.height = 500;
canvas.width = 2000;

// need this to figure out the boundaries of the canvas
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

const ctx = canvas.getContext('2d', { willReadFrequently: true });



if (canvas.getContext) {
  // drawing code here
  
} else {
  // canvas-unsupported code here
}

function draw() {
  ctx.fillStyle = "rgb(200 0 0)";
  //ctx.fillRect(10, 10, 50, 50);
  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, Math.PI * 2, true); 
  ctx.stroke();

}

var circle = {
    x:10,
    y:20,
    radius:10
};

//function to draw the circle
function drawCircle(x, y, radius) {
    ctx.beginPath();

    ctx.arc(x,y,radius,0, Math.PI * 2, true); // arc(position X, position Y, radtius, start angle, stop angle, which way to draw)

    ctx.stroke();
}


// the physics part of everything

const gravity = 9.81; //gravity constant (acceleration)









//what to do each frame
function drawFrame () {
    ctx.clearRect(0, 0, 5000, 5000); // clears the entire canvas, has to be done first

    circle.y = circle.y + gravity; // adding gravity to the circle

    // checking to see if the circle touches the bottom of the border, then set the center position to be equal to the border, but offset it by the radius, so the edge of the circle only touches the border. 
    //Runs every frame, which could be costly, but eh, needs to be checked, esp if i try to create a fluid
    if (circle.y + circle.radius >= canvasHeight) {
        circle.y = canvasHeight - circle.radius;
    } 
    //checking to see if it touches the top
    if (circle.y + circle.radius <= canvasHeight) {
        circle.y = canvasHeight + circle.radius;
    }


    //draw the curcle
    drawCircle(circle.x, circle.y, circle.radius);

    console.log("new frame");
}


setInterval(drawFrame, 10); // draw a new frame every 10ms

