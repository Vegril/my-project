<template>
  <div class="3D" id="3D">
    <h1>故障</h1>
    <div class="config">
      <div class="mesh">
        <h2>故障设置</h2>
        <ul>
          <!-- <li>
            <span class="txt">故障类型:</span>
            <el-select v-model="transitionType" placeholder="请选择">
              <el-option
                v-for="item in faultList"
                :key="item.type"
                :label="item.value"
                :value="item.type"
              >
              </el-option>
            </el-select>
          </li> -->
          <li>
            <span class="txt">故障时长:</span>
            <el-slider
              style="width: 300px"
              :max="10"
              :min="0.2"
              :step="0.1"
              v-model="duration"
            ></el-slider>
          </li>
          <li>
            <span class="txt">故障延时:</span>
            <el-slider
              style="width: 300px"
              :max="2"
              :min="0.2"
              :step="0.1"
              v-model="delay"
            ></el-slider>
          </li>
          <li :style="{ height: '100px' }">
            <span class="txt">出场图片:</span>
            <input type="file" ref="file" @change="changeFile($event, 'out')" />
            <img ref="outImage" :src="outImageUrl" alt="" />
          </li>
          <li :style="{ height: '100px' }">
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
      </div>
    </div>
    <canvas ref="canvas" id="canavs"></canvas>
  </div>
</template>
<script>
import { drawFault } from "../methods/drawFault";
export default {
  data() {
    return {
      faultList: [
        { type: 1, value: "RGB颜色分离故障" },
        { type: 2, value: "错位图块故障" },
        { type: 3, value: "错位线条故障" },
        { type: 4, value: "图块抖动故障" },
        { type: 5, value: "扫描线抖动故障" },
        { type: 6, value: "数字条纹故障" },
        { type: 7, value: "模拟噪点故障" },
        { type: 8, value: "屏幕跳跃故障" },
        { type: 9, value: "屏幕抖动故障" },
        { type: 10, value: "波动抖动故障" },
      ],
      transitionType: 1,
      duration: 1,
      delay: 0,
      loop: true,
      fileList: [],
      outImageUrl: require("../assets/images/b.png"),
      openImageUrl: require("../assets/images/a.png"),
      outImage: null,
      openImage: null,
      canvas: null,
      ctx: null,
      width: 640,
      height: 360,
      currentTime: 0,
      isPlaying: false,
      startPlayTime: 0,
    };
  },
  computed: {
    totalDuration: function () {
      return this.duration + this.delay * 2;
    },
  },
  mounted: async function () {
    this.outImage = this.$refs.outImage;
    this.openImage = this.$refs.openImage;
    this.canvas = this.$refs.canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.$refs.canvas.getContext("2d");
    setTimeout(() => {
      this.ctx.drawImage(this.outImage, 0, 0, this.width, this.height);
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
      // console.time("drawCanvas")
      const currentTime = (performance.now() - this.startPlayTime) / 1000;
      if (!this.isPlaying) return;
      if (!this.loop && currentTime >= this.totalDuration) return;
      if (currentTime >= this.totalDuration) {
        this.currentTime = currentTime - this.totalDuration;
        this.startPlayTime = this.startPlayTime + this.totalDuration * 1000;
      } else {
        this.currentTime = currentTime;
      }
      this.ctx.clearRect(0, 0, this.width, this.height);
      if (this.currentTime < this.delay) {
        this.ctx.drawImage(this.outImage, 0, 0, this.width, this.height);
      } else if (this.currentTime > this.delay + this.duration) {
        this.ctx.drawImage(this.openImage, 0, 0, this.width, this.height);
      } else {
        const scale = (this.currentTime - this.delay) / this.duration;
        const canvas = drawFault(
          this.outImage,
          this.openImage,
          scale,
          this.width,
          this.height,
          this.transitionType
        );
        this.ctx.drawImage(canvas, 0, 0, this.width, this.height);
      }
      // console.timeEnd("drawCanvas")
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
  },
  watch: {
    transitionType: function (newVal, oldVal) {
      if (!this.isPlaying) {
        this.drawCanvas();
      }
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
  }
}
canvas {
  float: left;
}
</style>
