'use strict';

// Global variables that are set and used
// across the application
let gl;

// The programs
let perVertexProgram;
let perFragmentProgram;
let sphereMapProgram;

// VAOs for the objects
var mySpherePerVertex = null;
var mySpherePerFragment = null;
var mySphere = null;

// what is currently showing
let nowShowing = 'Vertex';
let worldTexture;
var sphere_angles = [180.0, 180.0, 0.0];
var angles = sphere_angles;
var angleInc = 5.0;

let cur_x = 0;

//
// Creates a VAO for a given object and return it.
//
// shape is the object to be bound
// program is the program (vertex/fragment shaders) to use in this VAO
//
//
// Note that the program object has member variables that store the
// location of attributes and uniforms in the shaders.  See the function
// initProgram for details.
//
// You can see the definition of the shaders themselves in the
// HTML file assn6-shading.html.   Though there are 2 sets of shaders
// defined (one for per-vertex shading and one for per-fragment shading,
// each set does have the same list of attributes and uniforms that
// need to be set
//
function bindVAO (shape, program) {

    //create and bind VAO


    // create, bind, and fill buffer for vertex locations
    // vertex locations can be obtained from the points member of the
    // shape object.  3 floating point values (x,y,z) per vertex are
    // stored in this array.

    let theVAO = gl.createVertexArray();
    gl.bindVertexArray(theVAO)

    let myVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


    // create, bind, and fill buffer for normal values
    // normals can be obtained from the normals member of the
    // shape object.  3 floating point values (x,y,z) per vertex are
    // stored in this array.
    // stored in this array.
    // console.warn(gl.getUniformLocation(program, 'aNormal'));
    if (program.aNormal == 1) {
        let myNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, myNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.normals), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(program.aNormal);
        gl.vertexAttribPointer(program.aNormal, 3, gl.FLOAT, false, 0, 0);
    }
    // add code for any additional vertex attribute
    console.warn(gl.getUniformLocation(program, 'aUV'));
    if (program.aUV == 1) {
        let uvBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(program.aUV);
        gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);
    }
    // Setting up element array
    // element indicies can be obtained from the indicies member of the
    // shape object.  3 values per triangle are stored in this
    // array.

    let myIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);




    // Do cleanup
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    // return the VAO
    return theVAO;

}


//
// In this function, you must set up all of the uniform variables
// in the shaders required for the implememtation of the Phong
// Illumination model.
//
// Check out the source of the vertex shader in the HTML file
// assn6-shading.html taking note of the types of each of the
// uniforms.
//
// Note that the program object has member variables that store the
// location of attributes and uniforms in the shaders.  See the function
// initProgram for details.
//
//
//  You should also set up your Model transform here.

function setUpPhong(program, type) {


    // Recall that you must set the program to be current using
    // the gl useProgram function
    gl.useProgram (program);

    //
    // set values for all your uniform variables
    // including the model transform
    // but not your view and projection transforms as
    // they are set in setUpCamera()
    //


    // gl.uniform3fv (program.ambientLight, [0.7, 0.8, 0.6]);
    gl.uniform3fv (program.ambientLight, [0.2, 0.2, 0.2]);

    gl.uniform3fv (program.lightPosition, [-2.5, 2.0, 4.0]);

    gl.uniform3fv (program.lightColor, [1, 1, 1]);


    // object color parameters
    if (type == 'vertex') {
        gl.uniform3fv(program.baseColor, [0.9, 0, 0]);
    } else {
        gl.uniform3fv(program.baseColor, [0.9, 1, 1]);
    }


    gl.uniform3fv (program.specHighlightColor, [1, 1, 1]);


    // Phong parameters
    let ka = 1;
    gl.uniform1fv (program.ka, [ka]);
    let kd = 0.8;
    gl.uniform1fv (program.kd, [kd]);
    let ks = 0.7;
    gl.uniform1fv (program.ks, [ks]);
    let ke = 2.2;
    gl.uniform1fv (program.ke, [ke]);



    // set up your model transform...Add transformations
    // if you are moiving, scaling, or rotating the object.
    // Default is no transformations at all (identity matrix).
    //
    let modelMatrix = glMatrix.mat4.create();
    if (type == 'vertex') {
        glMatrix.mat4.scale(modelMatrix, modelMatrix,[3, 3, 3]);
    } else {
        glMatrix.mat4.scale(modelMatrix, modelMatrix,[2, 2, 2]);
    }
    gl.uniformMatrix4fv (program.uModelT, false, modelMatrix);


}

//
// set up the view and projections transformations and
// send to the program (shaders) as uniforms.
//
// Note that the program object has member variables that store the
// location of attributes and uniforms in the shaders.  See the function
// initProgram for details.
//
function setUpCamera(program) {

    // Recall you must set the program to be current using the gl
    // function useProgram.
    gl.useProgram (program);


    // set up your projection
    let projMatrix = glMatrix.mat4.create();
    glMatrix.mat4.ortho(projMatrix, -5, 5, -5, 5, 1.0, 300.0);
    gl.uniformMatrix4fv (program.uProjT, false, projMatrix);

    // set up your view
    let viewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(viewMatrix, [0, 0, 5.0], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);

}

///////////////////////////////////////////////////////////////////
//
//  No need to edit below this line.
//
////////////////////////////////////////////////////////////////////

// general call to make and bind a new object based on current
// settings..Basically a call to shape specfic calls in cgIshape.js
function createShapes() {

    //per vertex
    mySpherePerVertex = new Sphere (20,20);
    mySpherePerVertex.VAO = bindVAO (mySpherePerVertex, perVertexProgram);

    // per fragment
    mySpherePerFragment = new Sphere(20, 20);
    mySpherePerFragment.VAO = bindVAO (mySpherePerFragment, perFragmentProgram);

    mySphere = new Globe (20,20);
    mySphere.VAO = bindVAO (mySphere, sphereMapProgram);
    setUpTextures(sphereMapProgram);

}


function drawShapes(object, program) {

    // set up your uniform variables for drawing
    gl.useProgram (program);

    //Bind the VAO and draw
    gl.bindVertexArray(object.VAO);
    gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

}

function drawglobe(object, program) {

    // set up your uniform variables for drawing
    gl.useProgram (program);

    gl.activeTexture (gl.TEXTURE0);
    gl.bindTexture (gl.TEXTURE_2D, worldTexture);
    gl.uniform1i (program.uTheTexture, 0);

    // set up rotation uniform
    gl.uniform3fv (program.uTheta, new Float32Array(angles));
    gl.uniform1i(program.ux, cur_x);


    //Bind the VAO and draw
    gl.bindVertexArray(object.VAO);
    gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

}

// Given an id, extract the content's of a shader script
// from the DOM and return the compiled shader
function getShader(id) {
    const script = document.getElementById(id);
    const shaderString = script.text.trim();

    // Assign shader depending on the type of shader
    let shader;
    if (script.type === 'x-shader/x-vertex') {
        shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else if (script.type === 'x-shader/x-fragment') {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else {
        return null;
    }

    // Compile the shader using the supplied shader code
    gl.shaderSource(shader, shaderString);
    gl.compileShader(shader);

    // Ensure the shader is valid
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Compiling shader " + id + " " + gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

// Create a program with the appropriate vertex and fragment shaders
function initProgram (vertexid, fragmentid) {
    // set up the per-vertex program
    const vertexShader = getShader(vertexid);
    const fragmentShader = getShader(fragmentid);

    // Create a program
    let program = gl.createProgram();

    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Could not initialize shaders');
    }

    // Use this program instance
    gl.useProgram(program);
    // We attach the location of these shader values to the program instance
    // for easy access later in the code
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.aNormal = gl.getAttribLocation(program, 'aNormal');

    // uniforms
    program.uModelT = gl.getUniformLocation (program, 'modelT');
    program.uViewT = gl.getUniformLocation (program, 'viewT');
    program.uProjT = gl.getUniformLocation (program, 'projT');
    program.ambientLight = gl.getUniformLocation (program, 'ambientLight');
    program.lightPosition = gl.getUniformLocation (program, 'lightPosition');
    program.lightColor = gl.getUniformLocation (program, 'lightColor');
    program.baseColor = gl.getUniformLocation (program, 'baseColor');
    program.specHighlightColor = gl.getUniformLocation (program, 'specHighlightColor');
    program.ka = gl.getUniformLocation (program, 'ka');
    program.kd = gl.getUniformLocation (program, 'kd');
    program.ks = gl.getUniformLocation (program, 'ks');
    program.ke = gl.getUniformLocation (program, 'ke');
    program.uTheTexture = gl.getUniformLocation (program, 'theTexture');
    program.aUV = gl.getAttribLocation(program, 'aUV');
    program.uTheta = gl.getUniformLocation (program, 'theta');
    program.ux = gl.getUniformLocation (program, 'cur_x');




    return program;
}

function setUpTextures(program){
    gl.useProgram(program);

    // flip Y for WebGL
    gl.pixelStorei (gl.UNPACK_FLIP_Y_WEBGL, true);

    // get some texture space from the gpu
    worldTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, worldTexture);

    // load the actual image
    var worldImage = document.getElementById ('world-texture')
    worldImage.crossOrigin = "";

    // bind the texture so we can perform operations on it
    gl.bindTexture (gl.TEXTURE_2D, worldTexture);

    // load the texture data
    worldImage.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, worldTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, worldImage);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    worldImage.src = "globe03.png";

    // set texturing parameters
}


// We call draw to render to our canvas
function draw() {
    // Clear the scene
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // draw your shapes
    // if (nowShowing == 'Vertex') {
    var script = document.getElementById('webgl-canvas');
    script.style.backgroundImage = "url('universe02.png')";
    drawShapes(mySpherePerVertex, perVertexProgram);
    // }
    // if (nowShowing == 'Fragment') {
    drawShapes(mySpherePerFragment, perFragmentProgram);
    // }

    drawglobe(mySphere, sphereMapProgram);

    // Clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

}

// Entry point to our application
function init() {

    // Retrieve the canvas
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) {
        console.error(`There is no canvas with id ${'webgl-canvas'} on this page.`);
        return null;
    }

    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);

    // Retrieve a WebGL context
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error(`There is no WebGL 2.0 context`);
        return null;
    }

    // Set the clear color to be black
    gl.clearColor(0, 0, 0, 1);

    // some GL initialization
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)

    // Read, compile, and link your shaders
    perVertexProgram = initProgram('phong-per-vertex-V', 'phong-per-vertex-F');
    perFragmentProgram = initProgram('phong-per-fragment-V', 'phong-per-fragment-F');
    sphereMapProgram = initProgram('sphereMap-V', 'sphereMap-F');

    // create and bind your current object
    createShapes();




    // set up your camera
    setUpCamera(perVertexProgram);
    setUpCamera(perFragmentProgram);

    // set up Phong parameters
    setUpPhong(perVertexProgram, 'vertex');
    setUpPhong(perFragmentProgram, 'fragment');

    // do a draw
    draw();
}
