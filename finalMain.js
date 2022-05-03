  'use strict';

  // Global variables that are set and used
  // across the application
  let gl;

  // GLSL programs
  let sphereGlobeProgram;
  let wordProgram;
  
  // VAOs for the objects
  var mySphere = null;
  var myWord = null;
  var myMinion = null;

  // textures
  let worldTexture;
  let curTexture = "globe";

  // rotation
  var anglesReset = [30.0, 30.0, 0.0];
  var cube_angles = [30.0, 30.0, 0.0];
  var sphere_angles = [180.0, 180.0, 0.0];
  var angles = sphere_angles;
  var angleInc = 5.0;


  let nowShowing = 'Sphere';
 
//
// create shapes and VAOs for objects.
// Note that you will need to bindVAO separately for each object / program based
// upon the vertex attributes found in each program
//
function createShapes() {
    // the sphere
    mySphere = new Sphere (20,20);
    mySphere.VAO = bindVAO (mySphere, sphereGlobeProgram);
    //
    // myWord = new Cube(20);
    // myWord.VAO = bindVAO (myWord, wordProgram);


    setUpTextures();
}


//
// Here you set up your camera position, orientation, and projection
// Remember that your projection and view matrices are sent to the vertex shader
// as uniforms, using whatever name you supply in the shaders
//
function setUpCamera(program) {
    
    gl.useProgram (program);
    
    // set up your projection
    
    // set up your view

}


//
// load up the textures you will use in the shader(s)
// The setup for the globe texture is done for you
// Any additional images that you include will need to
// set up as well.
//
function setUpTextures(){
    
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
        // gl.bindTexture(gl.TEXTURE_2D, null);
    };
    worldImage.src = "globe03.png";

    // set texturing parameters
}

//
//  This function draws all of the shapes required for your scene
//
    function drawShapes() {
        // may need to set different parameters based on the texture
        // you are using...The current texture is found in the global variable
        // curTexture.   If will have the value of "globe", "myimage" or "proc"

        let modelMatrix = glMatrix.mat4.create();
        glMatrix.mat4.translate(modelMatrix, modelMatrix, [0,10,1]);
        glMatrix.mat4.scale(modelMatrix, modelMatrix, [0.1,0.1,0.1]);


        // which program are we using
        var program = sphereGlobeProgram;
        var program_word = wordProgram;

        // set up your uniform variables for drawing
        gl.useProgram (program);
        //
        // set up texture uniform & other uniforms that you might
        // have added to the shader
        gl.activeTexture (gl.TEXTURE0);
        gl.bindTexture (gl.TEXTURE_2D, worldTexture);
        gl.uniform1i (program.uTheTexture, 0);


        // set up rotation uniform
        gl.uniform3fv (program.uTheta, new Float32Array(angles));

        //Bind the VAO and draw
        gl.bindVertexArray(mySphere.VAO);
        gl.drawElements(gl.TRIANGLES, mySphere.indices.length, gl.UNSIGNED_SHORT, 0);

        //
        // gl.useProgram (program_word);


        // set up texture uniform & other uniforms that you might
        // have added to the shader
        // gl.activeTexture (gl.TEXTURE0);
        // gl.bindTexture (gl.TEXTURE_2D, worldTexture);
        // gl.uniform1i (program_word.uTheTexture, 0);

        // var translationMat = glMatrix.mat4.create();
        //
        // var translation = glMatrix.vec3.create();
        // glMatrix.vec3.set (translation, 5, 14, 0);
        // glMatrix.mat4.translate(translationMat, translationMat, translation);


        // gl.uniformMatrix4fv (program_word.uModelT, false, modelMatrix);
        // set up rotation uniform
        // gl.uniform3fv (program_word.uTheta, new Float32Array(angles));
        // gl.uniformMatrix4fv(program_word.urx, false, translationMat);
        //
        // gl.bindVertexArray(myWord.VAO);
        // gl.drawElements(gl.TRIANGLES, myWord.indices.length, gl.UNSIGNED_SHORT, 0);



}


  //
  // Use this function to create all the programs that you need
  // You can make use of the auxillary function initProgram
  // which takes the name of a vertex shader and fragment shader
  //
  // Note that after successfully obtaining a program using the initProgram
  // function, you will beed to assign locations of attribute and unifirm variable
  // based on the in variables to the shaders.   This will vary from program
  // to program.
  //
  function initPrograms() {
      sphereGlobeProgram = initProgram('sphereMap-V', 'sphereMap-F');
      // wordProgram = initProgram('cubeMap-V', 'cubeMap-F');
  }


  // creates a VAO and returns its ID
  function bindVAO (shape, program) {
      //create and bind VAO
      let theVAO = gl.createVertexArray();
      gl.bindVertexArray(theVAO);
      
      // create and bind vertex buffer
      let myVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aVertexPosition);
      gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
      
      // add code for any additional vertex attribute
      let uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aUV);
      gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);


      // Setting up the IBO
      let myIndexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

      // Clean
      gl.bindVertexArray(null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      
      return theVAO;
  }


/////////////////////////////////////////////////////////////////////////////
//
//  You shouldn't have to edit anything below this line...but you can
//  if you find the need
//
/////////////////////////////////////////////////////////////////////////////

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
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}


  //
  // compiles, loads, links and returns a program (vertex/fragment shader pair)
  //
  // takes in the id of the vertex and fragment shaders (as given in the HTML file)
  // and returns a program object.
  //
  // will return null if something went wrong
  //
  function initProgram(vertex_id, fragment_id) {
      console.warn(vertex_id, fragment_id);
    const vertexShader = getShader(vertex_id);
    const fragmentShader = getShader(fragment_id);

    // Create a program
    let program = gl.createProgram();
      
    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
      return null;
    }

    // Use this program instance
      gl.useProgram(program);
      // We attach the location of these shader values to the program instance
      // for easy access later in the code
      program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
      program.aUV = gl.getAttribLocation(program, 'aUV');

      // uniforms - you will need to add references for any additional
      // uniforms that you add to your shaders
      program.uTheTexture = gl.getUniformLocation (program, 'theTexture');
      program.uTheta = gl.getUniformLocation (program, 'theta');
      program.aBary = gl.getAttribLocation(program, 'bary');
      program.urx = gl.getUniformLocation (program, 'rx');
      program.ury = gl.getUniformLocation (program, 'ry');
      program.urz = gl.getUniformLocation (program, 'rz');
      program.uModelT = gl.getUniformLocation (program, 'modelT');
      program.uViewT = gl.getUniformLocation (program, 'viewT');
      program.uProjT = gl.getUniformLocation (program, 'projT');
      
    return program;
  }


  //
  // We call draw to render to our canvas
  //
  function draw() {
    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      
    // draw your shapes
    drawShapes();

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
      
    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);
      
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


      // deal with keypress
      window.addEventListener('keydown', gotKey ,false);

    // Read, compile, and link your shaders
    initPrograms();
    
    // create and bind your current object
    createShapes();

    // do a draw
    draw();
  }
