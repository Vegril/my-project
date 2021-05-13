<template>
  <div class="3D" id="3D">
    <h1>gl-transition</h1>
    <div class="config">
      <div class="mesh">
        <h2>过渡设置</h2>
        <ul>
          <li>
            <span class="txt">过渡类型:</span>
            <el-select v-model="transitionType" placeholder="请选择">
              <el-option
                v-for="item in glTransitionList"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <span class="txt">过渡时长:</span>
            <el-slider
              style="width: 300px"
              :max="10"
              :min="0.2"
              :step="0.1"
              v-model="duration"
            ></el-slider>
          </li>
          <li>
            <span class="txt">过渡延时:</span>
            <el-slider
              style="width: 300px"
              :max="2"
              :min="0.2"
              :step="0.1"
              v-model="delay"
            ></el-slider>
          </li>
          <li v-show="false" :style="{ height: '100px' }">
            <span class="txt">出场图片:</span>
            <input type="file" ref="file" @change="changeFile($event, 'out')" />
            <img ref="outImage" :src="outImageUrl" alt="" />
          </li>
          <li v-show="false" :style="{ height: '100px' }">
            <span class="txt">进场图片:</span>
            <input
              type="file"
              ref="file"
              @change="changeFile($event, 'open')"
            />
            <img ref="openImage" :src="openImageUrl" alt="" />
          </li>
          <li>
            <span class="txt">循环播放:</span>
            <el-switch v-model="loop" />
          </li>
          <li :style="{ height: '100px', 'justify-content': 'space-around' }">
            <el-button @click="play" type="primary">播放</el-button>
            <el-button @click="pause" type="primary">暂停</el-button>
            <el-button @click="stop" type="primary">停止</el-button>
          </li>
          <li :style="{ height: '100px', 'justify-content': 'space-around' }">
            <span class="txt">进度:</span
            >{{ (currentTime % totalDuration).toFixed(2) }}
          </li>
        </ul>
        <div class="adjust">
          <div
            class="param"
            v-for="(item, index) in selectedTransition.options"
            :key="index"
          >
            <h4>{{ item.name }}</h4>
            <div class="slider" v-if="item.componentType === 'slider'">
              <div
                class="adjust"
                v-for="(data, dataIndex) in item.data"
                :key="dataIndex"
              >
                <span>{{ data.name }}</span>
                <el-slider
                  :max="item.max"
                  :min="item.min"
                  :step="item.step"
                  v-model="data.value"
                >
                </el-slider>
              </div>
            </div>
            <div
              class="colorPicker"
              v-if="item.componentType === 'colorPicker'"
            >
              <div
                class="adjust"
                v-for="(data, dataIndex) in item.data"
                :key="dataIndex"
              >
                <span>{{ data.name }}</span>
                <el-color-picker
                  v-model="data.value"
                  :color-format="'rgb'"
                  :show-alpha="item.dataType==='vec4'"
                />
              </div>
            </div>
            <div class="switch" v-if="item.componentType === 'switch'">
              <div
                class="adjust"
                v-for="(data, dataIndex) in item.data"
                :key="dataIndex"
              >
                <span>{{ data.name }}</span>
                <el-switch v-model="data.value" />
              </div>
            </div>
            <div
              class="selectImage"
              v-if="item.componentType === 'selectImage'"
            >
              <img
                :class="{ active: item.selectedType === data.type }"
                v-for="(data, dataIndex) in item.data"
                :key="dataIndex"
                :style="{ width: '40px' }"
                :src="data.src"
                @click="item.selectedType=data.type"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <canvas ref="canvas" id="canavs"></canvas>
    <canvas
      ref="glCanvas"
      v-show="false"
      :width="width"
      :height="height"
    ></canvas>
  </div>
</template>
<script>
import transitions from "gl-transitions";
import createTransition from "gl-transition";
import createTexture from "gl-texture2d";
// import { glTransitionList } from "../list/gl-transition-list";
import { glTransitionList } from "../list/transition-options-list";
export default {
  data() {
    return {
      glTransitionList: [],
      transitionType: 24,
      duration: 2,
      delay: 0,
      loop: true,
      fileList: [],
      outImageUrl: require("../assets/images/1.png"),
      openImageUrl: require("../assets/images/2.png"),
      texture: null,
      outImage: null,
      openImage: null,
      from: null,
      to: null,
      canvas: null,
      glCanvas: null,
      gl: null,
      transition: null,
      width: 640,
      height: 360,
      currentTime: 0,
      isPlaying: false,
      startPlayTime: 0,
    };
  },
  created() {
    this.glTransitionList = glTransitionList;
  },
  computed: {
    totalDuration: function () {
      return this.duration + this.delay * 2;
    },
    selectedTransition: function () {
      return this.glTransitionList.find((item) => {
        return item.type === this.transitionType;
      });
    },
  },
  watch: {
    transitionType: function (newVal, oldVal) {
      this.drawGl();
    },
    outImageUrl: function (newVal, oldVal) {
      this.stop();
      setTimeout(() => {
        this.drawGl();
        this.play();
      }, 500);
    },
    openImageUrl: function (newVal, oldVal) {
      this.stop();
      setTimeout(() => {
        this.drawGl();
        this.play();
      }, 500);
    },
    selectedTransition: {
      handler(newVal, oldVal) {
        for (let key in newVal.options) {
          const config = newVal.options[key];
          if (config.dataType === "sampler2D") {
            const image = config.data.find((item) => {
              return item.type === config.selectedType;
            }).image;
            this.texture=null;
            this.texture = createTexture(this.gl, image);
            this.texture.minFilter = this.gl.LINEAR;
            this.texture.magFilter = this.gl.LINEAR;
          }
        }
        if (!this.isPlaying) this.drawCanvas();
      },
      deep: true,
    },
  },
  mounted: async function () {
    this.outImage = this.$refs.outImage;
    this.openImage = this.$refs.openImage;
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.glCanvas = this.$refs.glCanvas;
    this.gl =
      this.glCanvas.getContext("webgl") ||
      this.glCanvas.getContext("experimental-webgl");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    setTimeout(() => {
      this.ctx.drawImage(this.outImage, 0, 0, this.width, this.height);
      this.drawGl();
    }, 500);
  },
  methods: {
    changeFile(event, type) {
      let that = this;
      let file = event.target.files[0];
      const fileType = file.type;
      let reader = new FileReader(); // 参数为 Blob 对象或 File 对象
      reader.onload = function (evt) {
        const blob = window.URL.createObjectURL(
          new Blob([evt.target.result], { fileType })
        );
        if (type === "open") {
          that.openImageUrl = blob;
        } else {
          that.outImageUrl = blob;
        }
      };
      reader.readAsArrayBuffer(file);
    },
    drawCanvas() {
      const currentTime = (performance.now() - this.startPlayTime) / 1000;
      if (!this.isPlaying) return;
      if (!this.loop && currentTime >= this.totalDuration) return;
      if (currentTime >= this.totalDuration) {
        this.currentTime = currentTime - this.totalDuration;
        this.startPlayTime = this.startPlayTime + this.totalDuration * 1000;
      } else {
        this.currentTime = currentTime;
      }
      if (this.currentTime < this.delay) {
        this.ctx.drawImage(this.outImage, 0, 0, this.width, this.height);
      } else if (this.currentTime > this.delay + this.duration) {
        this.ctx.drawImage(this.openImage, 0, 0, this.width, this.height);
      } else {
        const progress = (this.currentTime - this.delay) / this.duration;
        const options = this.processData(this.selectedTransition.options);
        this.transition.draw(
          progress,
          this.from,
          this.to,
          this.canvas.width,
          this.canvas.height,
          options
        );
        this.ctx.drawImage(this.glCanvas, 0, 0, this.width, this.height);
      }
      requestAnimationFrame(this.drawCanvas);
    },
    play() {
      if (this.isPlaying) return;
      this.startPlayTime = performance.now() - this.currentTime * 1000;
      this.isPlaying = true;
      this.drawCanvas();
    },
    pause() {
      this.isPlaying = false;
    },
    stop() {
      this.isPlaying = false;
      setTimeout(() => {
        this.startPlayTime = 0;
        this.currentTime = 0;
        this.ctx.drawImage(this.outImage, 0, 0, this.width, this.height);
      }, 100);
    },
    async drawGl() {
      if (this.transition) this.transition.dispose();
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
      const buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 4, 4, -1]), // see a-big-triangle
        this.gl.STATIC_DRAW
      );
      this.gl.viewport(0, 0, this.width, this.height);

      this.from = createTexture(this.gl, this.outImage);
      this.from.minFilter = this.gl.LINEAR;
      this.from.magFilter = this.gl.LINEAR;

      this.to = createTexture(this.gl, this.openImage);
      this.to.minFilter = this.gl.LINEAR;
      this.to.magFilter = this.gl.LINEAR;
      const params = { resizeMode: "stretch" };
      this.transition = createTransition(
        this.gl,
        transitions.find(
          (t) =>
            t.name.toLowerCase() === this.selectedTransition.key.toLowerCase()
        ),
        params
      );
      requestAnimationFrame(this.drawCanvas);
    },
    processData(options) {
      const result = {};
      for (let key in options) {
        if (options[key].componentType === "slider") {
          const arr = [];
          options[key].data.map((item) => {
            arr.push(item.value);
          });
          result[key] = new Float32Array(arr);
        } else if (options[key].componentType === "colorPicker") {
          options[key].data.map((item) => {
            result[key] = new Float32Array(this.getRGB(item.value));
          });
        } else if (options[key].componentType === "switch") {
          options[key].data.map((item) => {
            result[key] = item.value;
          });
        } else if (options[key].componentType === "selectImage") {
          result[key] = this.texture;
        }
      }
      return result;
    },
    // 将'rgb(xxx,xxx,xxx)'转化为[xxx,xxx,xxx]格式
    getRGB(rgb) {
      let arr = rgb.split("(")[1].split(")")[0].split(", ");
      for (let i = 0; i < arr.length; i++) {
        arr[i]= parseFloat((arr[i] / 255).toFixed(3));
      }
      return arr;
    },
  },
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
        img {
          height: 70px;
        }
      }
    }
    .selectImage{
      display: flex;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
    }
    .active {
      border: 1px solid #3485fb;
    }
  }
}
canvas {
  float: left;
}
</style>
