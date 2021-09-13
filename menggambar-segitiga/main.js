function main() {
    /**
     * @type {HTMLCanvasElement} canvas
     */
    var canvas = document.getElementById("myCanvas");
    
    /**
     * @type {WebGLRenderingContext} context
     */
    var context = canvas.getContext("webgl");

    var vertices = [
        -0.5, 0.5,   //titik A
        -0.5, -0.5,  //titik B
        0.5, -0.5,   //titik C
    ]

    /**
     * @type {WebGLBuffer} positionBuffer
     */
    var positionBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);
    context.bindBuffer(context.ARRAY_BUFFER, null);

    var vertexShaderCode = document.getElementById("vertexShaderCode");

    /**
     * @type {WebGLShader} vertexShader
     */
    var vertexShader = context.createShader(context.VERTEX_SHADER);
    context.shaderSource(vertexShader, vertexShaderCode.textContent);
    context.compileShader(vertexShader);

    var fragmentShaderCode = document.getElementById("fragmentShaderCode");

    /**
     * @type {WebGLShader} fragmentShader
     */
    var fragmentShader = context.createShader(context.FRAGMENT_SHADER);
    context.shaderSource(fragmentShader, fragmentShaderCode.textContent);
    context.compileShader(fragmentShader);

    /**
     * @type {WebGLProgram} shaderProgram
     */
    var shaderProgram = context.createProgram();
    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);
    context.linkProgram(shaderProgram);
    context.useProgram(shaderProgram);

    context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
    var aPosition = context.getAttribLocation(shaderProgram, "a_position");
    context.vertexAttribPointer(aPosition, 2, context.FLOAT, false, 0, 0);
    context.enableVertexAttribArray(aPosition);

    context.clearColor(1.0, 1.0, 1.0, 1.0);
    context.clear(context.COLOR_BUFFER_BIT);

    context.drawArrays(context.LINE_LOOP, 0, 3);
}