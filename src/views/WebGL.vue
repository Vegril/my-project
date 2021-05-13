<template>
  <div class="3D" id="3D">
    <h1>three.js</h1>
    <div class="config">
      <div class="mesh">
        <h2>模型设置</h2>
        <ul>
          <li>
            <span class="txt">模型几何体类型:</span>
          </li>
        </ul>
      </div>
    </div>
    <canvas ref="glcanvas" :width="width" :height="height"></canvas>
  </div>
</template>
<script>
import { mat4, vec2 } from "gl-matrix";
export default {
  data() {
    return {
      glcanvas: null,
      width: 1280,
      height: 720,
      gl: null,
      vsSource: "", //顶点着色器源码
      fsSource: "", //片元着色器源码
      program: null,
      vertexShader: null, //顶点着色器对象
      fragmentShader: null, //片元着色器对象
      programInfo: null,
      positionBuffer: null,
    };
  },
  mounted() {
    console.log(vec2.create(1.0,1.0));
    console.time('webgl');
    this.glcanvas = this.$refs.glcanvas;
    this.gl = this.glcanvas.getContext("webgl");
    // 使用完全不透明的黑色清除所有图像
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // 用上面指定的颜色清除缓冲区
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.vsSource = `
      attribute vec4 aVertexPosition;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      }
    `;
    this.fsSource = `
      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      }
    `;
    this.shaderProgram = this.initShaderProgram(
      this.gl,
      this.vsSource,
      this.fsSource
    );
    this.programInfo = {
      program: this.shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(
          this.shaderProgram,
          "aVertexPosition"
        ),
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation(
          this.shaderProgram,
          "uProjectionMatrix"
        ),
        modelViewMatrix: this.gl.getUniformLocation(
          this.shaderProgram,
          "uModelViewMatrix"
        ),
      },
    };
    this.initBuffers(this.gl);
    this.drawScene();
    console.timeEnd('webgl');
  },
  methods: {
    initShaderProgram(gl, vsSource, fsSource) {
      const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
      const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

      // 创建着色器程序

      const shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      // 创建失败， alert
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(
          "Unable to initialize the shader program: " +
            gl.getProgramInfoLog(shaderProgram)
        );
        return null;
      }

      return shaderProgram;
    },
    loadShader(gl, type, source) {
      const shader = gl.createShader(type);

      // Send the source to the shader object

      gl.shaderSource(shader, source);

      // Compile the shader program

      gl.compileShader(shader);

      // See if it compiled successfully

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(
          "An error occurred compiling the shaders: " +
            gl.getShaderInfoLog(shader)
        );
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    },
    initBuffers(gl) {
      // 调用 gl 的成员函数 createBuffer() 得到了缓冲对象并存储在顶点缓冲器
      const positionBuffer = gl.createBuffer();
      // 调用 bindBuffer() 函数绑定上下文
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      // 创建一个Javascript 数组去记录每一个正方体的每一个顶点
      const vertices = [
        1.0,
        1.0,
        0.0,
        -1.0,
        1.0,
        0.0,
        1.0,
        -1.0,
        0.0,
        -1.0,
        -1.0,
        0.0,
      ];
      // 将其转化为 WebGL 浮点型类型的数组，并将其传到 gl 对象的  bufferData() 方法来建立对象的顶点
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
      );
      this.positionBuffer = { position: positionBuffer };
    },
    drawScene() {
      this.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
      this.gl.clearDepth(1.0); // Clear everything
      this.gl.enable(this.gl.DEPTH_TEST); // Enable depth testing
      this.gl.depthFunc(this.gl.LEQUAL); // Near things obscure far things

      // Clear the canvas before we start drawing on it.

      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

      // Create a perspective matrix, a special matrix that is
      // used to simulate the distortion of perspective in a camera.
      // Our field of view is 45 degrees, with a width/height
      // ratio that matches the display size of the canvas
      // and we only want to see objects between 0.1 units
      // and 100 units away from the camera.

      const fieldOfView = (45 * Math.PI) / 180; // in radians
      const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
      const zNear = 0.1;
      const zFar = 100.0;
      const projectionMatrix = mat4.create();

      // note: glmatrix.js always has the first argument
      // as the destination to receive the result.
      mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

      // Set the drawing position to the "identity" point, which is
      // the center of the scene.
      const modelViewMatrix = mat4.create();

      // Now move the drawing position a bit to where we want to
      // start drawing the square.

      mat4.translate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to translate
        [-0.0, 0.0, -6.0]
      ); // amount to translate

      // Tell WebGL how to pull out the positions from the position
      // buffer into the vertexPosition attribute.
      {
        const numComponents = 3; // pull out 3 values per iteration
        const type = this.gl.FLOAT; // the data in the buffer is 32bit floats
        const normalize = false; // don't normalize
        const stride = 0; // how many bytes to get from one set of values to the next
        // 0 = use type and numComponents above
        const offset = 0; // how many bytes inside the buffer to start from
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer.position);
        this.gl.vertexAttribPointer(
          this.programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset
        );
        this.gl.enableVertexAttribArray(
          this.programInfo.attribLocations.vertexPosition
        );
      }

      // Tell WebGL to use our program when drawing

      this.gl.useProgram(this.programInfo.program);

      // Set the shader uniforms

      this.gl.uniformMatrix4fv(
        this.programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
      );
      this.gl.uniformMatrix4fv(
        this.programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
      );

      {
        const offset = 0;
        const vertexCount = 4;
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertexCount);
      }
    },
  },
  watch: {},
  beforeDestroy() {},
};
</script>
<style lang="less" scoped>
.config {
  float: left;
  width: 520px;
  height: 720px;
  background-color: pink;
  overflow: auto;
  .mesh,
  .camera {
    ul {
      padding: 0 30px;
      li {
        display: flex;
        height: 50px;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
canvas {
  float: left;
}
</style>
