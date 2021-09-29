function main() {
    /**
     * @type {HTMLCanvasElement} canvas
     */
    var canvas = document.getElementById("myCanvas");
    
     /**
      * @type {WebGLRenderingContext} gl
      */
    var gl = canvas.getContext("webgl");

    var vertices = [
        -0.25, 0.5,
        -0.75, -0.5,
        0.25, -0.5,
        0.25, 0.75,
        0.25, 0,
        0.5, 0
    ]

     /**
      * @type {WebGLBuffer} positionBuffer
      */
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
      attribute vec2 a_Position;
      void main() {
        gl_Position = vec4(a_Position, 0.0, 1.0);
        gl_PointSize = 20.0;
      }
    `;

    /**
     * @type {WebGLShader} vertexShader
     */
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);
 
    var fragmentShaderCode = `
      void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `;

    /**
     * @type {WebGLShader} fragmentShader
     */
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    /**
     * @type {WebGLProgram} shaderProgram
     */
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}