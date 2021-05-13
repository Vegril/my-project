<template>
  <div class="matting">
    <h1>抠图</h1>
    <div class="box">
      <div class="config">
        <div class="setting">
          <span class="title">上传绿幕素材:</span>
          <input type="file" ref="file" @change="loadFile" />
        </div>
        <div class="setting" v-show="uploaded">
          <video
            ref="video"
            :src="url"
            controls
            loop
            @play="play"
            @pause="pause"
          ></video>
        </div>
        <div class="setting">
          <div class="colorSetting">
            <span style="marginright: 10px">颜色选择:</span>
            <el-color-picker
              v-model="mattingColor"
              color-format="rgb"
            ></el-color-picker>
          </div>
          <div class="colorSetting">
            <span>吸色:</span>
            <span
              @click="isAbsor = true"
              :class="[{ icon: true }, { active: isAbsor }]"
            ></span>
          </div>
        </div>
        <div class="setting">
          <span>色相差值范围:</span>
          <el-slider style="width: 300px" :max="360" v-model="diff"></el-slider>
        </div>
        <div class="setting">
          <span>抠图饱和度:</span>
          <el-slider
            style="width: 300px"
            :max="255"
            v-model="saturation"
          ></el-slider>
        </div>
        <div class="setting">
          <span>抠图亮度:</span>
          <el-slider
            style="width: 300px"
            :max="255"
            v-model="brightness"
          ></el-slider>
        </div>
        <div class="setting">
          <el-button type="primary" @click="previewMatting">抠图</el-button>
        </div>
      </div>
      <div class="content" @click="isAbsor = false">
        <canvas id="canvas" @mousemove="previewColor" @click.stop="absorColor">
        </canvas>
        <div class="previewWindows" v-show="isAbsor">
          <span
            v-for="item in 121"
            :key="item"
            :style="{ border: item === 61 ? '1px solid #000' : '' }"
          ></span>
        </div>
      </div>
    </div>
    <div v-show="isAbsor" @click="isAbsor = false" class="asborBox"></div>
  </div>
</template>
<script>
import { SingleFrameFilterPThread } from "../worker/worker.js";
export default {
  data() {
    return {
      url: "",
      uploaded: false,
      ctx: null,
      width: 0, //canvas宽
      height: 0, //canvas高
      videoIsplay: false,
      mattingColor: "rgb(0, 255, 0)",
      isAbsor: false,
      saturation: 43, //抠图饱和度
      brightness: 46, //抠图亮度
      workerList: [],
      mattingOptions: {},
      diff: 15,
    };
  },
  mounted: function () {
    let canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.workerList = new SingleFrameFilterPThread(1);
  },
  methods: {
    //加载文件file
    loadFile(event) {
      let that = this;
      let file = event.target.files[0];
      const type = file.type;
      let reader = new FileReader(); // 参数为 Blob 对象或 File 对象
      reader.onload = function (evt) {
        const blob = window.URL.createObjectURL(
          new Blob([evt.target.result], { type })
        );
        that.url = blob;
        that.uploaded = true;
        setTimeout(() => {
          let canvas = document.getElementById("canvas");
          that.ctx = canvas.getContext("2d");
          that.width = that.$refs.video.offsetWidth * 2;
          that.height = that.$refs.video.offsetHeight * 2;
          canvas.width = that.width;
          canvas.height = that.height;
          that.drawCanvas();
        }, 1000);
      };
      reader.readAsArrayBuffer(file);
    },
    //绘制视频
    async drawCanvas() {
      const imageData = await this.getMattingResultData();
      this.ctx.putImageData(imageData, 0, 0);
      if (this.videoIsplay) {
        requestAnimationFrame(() => {
          this.drawCanvas();
        });
      }
    },
    //播放视频
    play() {
      this.videoIsplay = true;
      this.drawCanvas();
    },
    //暂停视频
    pause() {
      this.videoIsplay = false;
    },
    //吸色
    absorColor(e) {
      if (this.isAbsor) {
        let data = this.ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
        this.mattingColor =
          "rgb(" + data[0] + ", " + data[1] + ", " + data[2] + ")";
        this.isAbsor = false;
      }
    },
    //吸色时在canvas上移动时预览颜色
    previewColor(e) {
      if (this.isAbsor) {
        let imageData = this.ctx.getImageData(
          e.offsetX - 5,
          e.offsetY - 5,
          11,
          11
        );
        let previewWindows = document.querySelector(".previewWindows");
        previewWindows.style.top = e.target.offsetTop + e.offsetY - 130 + "px";
        previewWindows.style.left = e.target.offsetLeft + e.offsetX - 55 + "px";
        let list = previewWindows.children;
        let data = imageData.data;
        for (let i = 0; i < list.length; i++) {
          list[i].style.backgroundColor =
            "rgb(" +
            data[i * 4] +
            "," +
            data[i * 4 + 1] +
            "," +
            data[i * 4 + 2] +
            ")";
        }
      }
    },
    // 将'rgb(xxx,xxx,xxx)'转化为[xxx,xxx,xxx]格式
    getRGB: function (rgb) {
      let options = {};
      let arr = rgb.split("(")[1].split(")")[0].split(", ");
      options.r = parseInt(arr[0]);
      options.g = parseInt(arr[1]);
      options.b = parseInt(arr[2]);
      return options;
    },
    //预览当前帧抠图效果
    async previewMatting() {
      const imageData = await this.getMattingResultData();
      this.ctx.putImageData(imageData, 0, 0);
    },
    //获取抠图后的像素点数据
    async getMattingResultData() {
      const canvas = new OffscreenCanvas(this.width, this.height);
      const context = canvas.getContext("2d");
      context.drawImage(this.$refs.video, 0, 0, this.width, this.height);
      const imageData = context.getImageData(0, 0, this.width, this.height);
      const params = { imageData, actionList: this.mattingOptions };
      const result = await this.workerList.post(params);
      return result;
    },
    //rgb转hsv
    rgbToHSV(r, g, b) {
      r = r / 255;
      g = g / 255;
      b = b / 255;
      let h, s, v;
      const min = Math.min(r, g, b);
      const max = (v = Math.max(r, g, b));
      const l = (min + max) / 2;
      const difference = max - min;

      if (max == min) {
        h = 0;
      } else {
        switch (max) {
          case r:
            h = (g - b) / difference + (g < b ? 6 : 0);
            break;
          case g:
            h = 2.0 + (b - r) / difference;
            break;
          case b:
            h = 4.0 + (r - g) / difference;
            break;
        }
        h = h * 60;
      }
      if (max == 0) {
        s = 0;
      } else {
        s = 1 - min / max;
      }
      s = s * 100 * 2.55;
      v = v * 100 * 2.55;
      return { h, s, v };
    },
    //获取抠图设置
    getMattingOptions() {
      let rgb = this.getRGB(this.mattingColor);
      let hsv = this.rgbToHSV(rgb.r, rgb.g, rgb.b);
      let hMin1 = 0,
        hMax1 = 0,
        hMin2 = -2,
        hMax2 = -1;
      if ((hsv.h >= 0 && hsv.h < 20) || (hsv.h >= 310 && hsv.h <= 360)) {
        //红
        hMin1 = 0;
        hMax1 = 20;
        hMin2 = 312;
        hMax2 = 360;
      } else if (hsv.h < 50) {
        //橙
        hMin1 = 20;
        hMax1 = 50;
      } else if (hsv.h < 68) {
        //黄
        hMin1 = 50;
        hMax1 = 68;
      } else if (hsv.h < 154) {
        //绿
        hMin1 = 68;
        hMax1 = 154;
      } else if (hsv.h < 198) {
        //青
        hMin1 = 154;
        hMax1 = 198;
      } else if (hsv.h < 248) {
        //蓝
        hMin1 = 198;
        hMax1 = 248;
      } else if (hsv.h < 310) {
        //紫
        hMin1 = 248;
        hMax1 = 310;
      }
      let mattingOptions = {
        hMin1,
        hMax1,
        hMin2,
        hMax2,
        r:rgb.r,
        g:rgb.g,
        b:rgb.b
      };
      mattingOptions.h = hsv.h;
      mattingOptions.diff = this.diff;
      mattingOptions.saturation = this.saturation;
      mattingOptions.brightness = this.brightness;
      this.mattingOptions = mattingOptions;
    },
  },
  watch: {
    mattingColor: function (newVal, oldVal) {
      this.getMattingOptions();
      if (!this.videoIsplay) {
        this.previewMatting();
      }
    },
    saturation: function (newVal, oldVal) {
      this.getMattingOptions();
      if (!this.videoIsplay) {
        this.previewMatting();
      }
    },
    brightness: function (newVal, oldVal) {
      this.getMattingOptions();
      if (!this.videoIsplay) {
        this.previewMatting();
      }
    },
    diff: function (newVal, oldVal) {
      this.getMattingOptions();
      if (!this.videoIsplay) {
        this.previewMatting();
      }
    },
  },
  computed: {},
  beforeDestroy: function () {
    this.workerList.closeAll();
  },
};
</script>
<style lang="less" scoped>
.matting {
  .box {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 800px;
    .config {
      width: 500px;
      height: 100%;
      background-color: skyblue;
      .setting {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        padding: 10px 0;
        video {
          width: 100%;
        }
        .colorSetting {
          display: flex;
          align-items: center;
          .icon {
            display: inline-block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            background-image: url("../assets/straw.png");
            background-size: 30px 30px;
            margin-left: 10px;
            cursor: pointer;
          }
          .active {
            background-color: #999;
          }
        }
      }
    }
    .content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(100% - 500px);
      height: 100%;
      z-index: 2;
      canvas {
        cursor: pointer;
      }
      .previewWindows {
        position: absolute;
        display: block;
        width: 110px;
        height: 110px;
        border-radius: 55px;
        border: 1px solid #000;
        overflow: hidden;
        span {
          display: block;
          float: left;
          width: 10px;
          height: 10px;
          box-sizing: border-box;
        }
      }
    }
  }
  .asborBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
}
</style>
