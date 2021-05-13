<template>
  <div class="subtitle">
    <h1>挂件运动</h1>
    <div class="box">
      <div class="optionsBox">
        <div>
          <span :style="{ 'margin-right': '20px' }">运动方式:</span
          ><el-select v-model="type" placeholder="请选择">
            <el-option
              v-for="item in movementTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span :style="{ 'margin-right': '20px' }">周期时长:</span>
          <el-slider
            v-model="duration"
            :max="5"
            :step="0.1"
            style="width: 400px; display: inline-block"
          ></el-slider>
          <span>{{ duration }}秒</span>
        </div>
        <div>
          <el-button @click="play">播放</el-button>
          <el-button @click="pause">暂停</el-button>
        </div>
      </div>
      <canvas ref="canvas" width="500" height="500"></canvas>
      <img
        ref="background"
        src="../assets/查看源图像.jpg"
        alt=""
        v-show="false"
      />
      <!-- <canvas id="canvas" :style="{opacity:applyOptions.alpha/100,transform:'translateX('+640*Math.sin(scale/180*Math.PI)+'px) '+'rotateY('+scale+'deg)'}" width="1280" height="720"></canvas> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: 0,
      movementTypeList: [
        { value: 0, label: "放大缩小" },
        { value: 1, label: "环绕" },
        { value: 2, label: "闪烁" },
        { value: 3, label: "左右摇摆" },
        { value: 4, label: "跳跃" },
      ],
      duration: 1,
      img: null,
      canvas: null,
      ctx: null,
      time: 0,
      offsetX: 150,
      offsetY: 150,
      width: 200,
      height: 200,
      isPlaying: false,
    };
  },
  methods: {
    drawCanvas() {
      switch (this.type) {
        case 0:
          this.drawScale();
          break;
        case 1:
          this.drawFlip();
          break;
        case 2:
          this.drawFlash();
          break;
        case 3:
          this.drawSwing();
          break;
        case 4:
          this.drawJump();
          break;
      }
      if (this.isPlaying) {
        requestAnimationFrame(() => {
          this.drawCanvas();
        });
      }
    },
    play() {
      this.isPlaying = true;
      this.time = new Date().getTime();
      this.drawCanvas();
    },
    pause() {
      this.isPlaying = false;
    },
    drawBackground() {
      this.ctx.drawImage(
        this.$refs.background,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    },
    drawImage() {
      this.ctx.drawImage(
        this.img,
        this.offsetX,
        this.offsetY,
        this.width,
        this.height
      );
    },
    drawScale() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground();
      const time = new Date().getTime();
      const scale =this.easeInOutSine((((time - this.time) / 1000) % this.duration) / this.duration);
      this.ctx.save();
      this.ctx.translate(
        this.offsetX + this.width / 2,
        this.offsetY + this.height / 2
      );
      if (scale < 0.5) {
        this.ctx.scale(1 - 0.2 * (scale / 0.5), 1 - 0.2 * (scale / 0.5));
      } else {
        this.ctx.scale(
          0.8 + 0.2 * (scale - 0.5) * 2,
          0.8 + 0.2 * (scale - 0.5) * 2
        );
      }
      this.ctx.translate(
        -(this.offsetX + this.width / 2),
        -(this.offsetY + this.height / 2)
      );
      this.drawImage();
      this.ctx.restore();
    },
    drawFlip() {
      const width = this.canvas.width;
      const height = this.canvas.height;
      this.ctx.clearRect(0, 0, width, height);
      this.drawBackground();
      let tempCanvas = new OffscreenCanvas(width, height);
      let context = tempCanvas.getContext("2d");
      const time = new Date().getTime();
      let scale = (((time - this.time) / 1000) % this.duration) / this.duration;
      this.ctx.save();
      if (scale < 0.5) {
        context.drawImage(
          this.img,
          this.offsetX,
          this.offsetY,
          this.width,
          this.height
        );
        scale = 1 - 4 * scale;
      } else {
        context.translate(width, 0);
        context.scale(-1, 1);
        context.drawImage(
          this.img,
          this.offsetX,
          this.offsetY,
          this.width,
          this.height
        );
        scale = 1 - 4 * (scale - 0.5);
      }
      this.ctx.translate((width * (1 - scale)) / 2, 0);
      this.ctx.scale(scale, 1);
      this.ctx.drawImage(tempCanvas, 0, 0);
      this.ctx.setTransform(1, 0.5, 0, 1, 0, 0);
      this.ctx.restore();
    },
    // drawFlip() {
    //   const width = this.canvas.width;
    //   const height = this.canvas.height;
    //   this.ctx.clearRect(0, 0, width, height);
    //   this.drawBackground();
    //   let tempCanvas = new OffscreenCanvas(width, height);
    //   let context = tempCanvas.getContext("2d");
    //   const time = new Date().getTime();
    //   let scale = (((time - this.time) / 1000) % this.duration) / this.duration;
    //   this.ctx.save();
    //   if (scale < 0.5) {
    //     context.drawImage(
    //       this.img,
    //       this.offsetX,
    //       this.offsetY,
    //       this.width,
    //       this.height
    //     );
    //     scale = 1 - 4 * scale;
    //   } else {
    //     context.translate(width, 0);
    //     context.scale(-1, 1);
    //     context.drawImage(
    //       this.img,
    //       this.offsetX,
    //       this.offsetY,
    //       this.width,
    //       this.height
    //     );
    //     scale = 1 - 4 * (scale - 0.5);
    //   }
    //   this.ctx.translate((width * (1 - scale)) / 2, 0);
    //   this.ctx.scale(scale, 1);
    //   this.ctx.drawImage(tempCanvas, 0, 0);
    //   this.ctx.setTransform(1, 0.5, 0, 1, 0, 0);
    //   this.ctx.restore();
    // },
    drawJump() {
      const width = this.canvas.width;
      const height = this.canvas.height;
      this.ctx.clearRect(0, 0, width, height);
      this.drawBackground();
      const amp = 100;
      const time = new Date().getTime();
      let scale = (((time - this.time) / 1000) % this.duration) / this.duration;
      const result = this.easeOutElastic(scale);
      this.ctx.drawImage(
        this.img,
        this.offsetX,
        this.offsetY - 50 + amp * result,
        this.width,
        this.height
      );
    },
    drawFlash() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground();
      const time = new Date().getTime();
      const scale =
        (((time - this.time) / 1000) % this.duration) / this.duration;
      this.ctx.save();
      if (scale < 0.5) {
        const result =this.easeInOutSine(scale*2);
        this.ctx.globalAlpha = 1 - result;
      } else {
        const result =this.easeInOutSine((scale-0.5)*2);
        this.ctx.globalAlpha = result;
      }
      this.drawImage();
      this.ctx.restore();
    },
    drawSwing() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground();
      const time = new Date().getTime();
      const scale =
        (((time - this.time) / 1000) % this.duration) / this.duration;
      this.ctx.save();
      this.ctx.translate(
        this.offsetX + this.width / 2,
        this.offsetY + this.height / 2
      );
      if (scale < 0.5) {
        const result =this.easeInOutSine(scale*2);
        const deg = ((-30 + 60 * result ) / 180) * Math.PI;
        this.ctx.rotate(deg);
      } else {
        const result =this.easeInOutSine((scale-0.5)*2);
        const deg = ((-30 + 60 * (1 - result)) / 180) * Math.PI;
        this.ctx.rotate(deg);
      }
      this.ctx.translate(
        -(this.offsetX + this.width / 2),
        -(this.offsetY + this.height / 2)
      );
      this.drawImage();
      this.ctx.restore();
    },
    easeOutElastic(x) {
      const c4 = (2 * Math.PI) / 3;
      return x === 0
        ? 0
        : x === 1
        ? 1
        : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    },
    easeInOutSine(x) {
      return -(Math.cos(Math.PI * x) - 1) / 2;
    },
  },
  mounted: function () {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.img = document.createElement("img");
    this.img.onload = () => {
      this.time = new Date().getTime();
      this.drawCanvas();
    };
    this.img.src = require("../assets/tiger.png");
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.subtitle {
  .box {
    .optionsBox {
      float: left;
      width: 550px;
      height: 720px;
      background-color: pink;
      padding: 20px;
      div {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 10px 0;
      }
    }
    canvas {
      float: left;
    }
  }
}
canvas {
  border: 1px solid red;
}
</style>
