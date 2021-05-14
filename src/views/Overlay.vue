<template>
  <div class="transition">
    <h1>叠图</h1>
    <div class="config">
      <div class="box">
        <div class="block">
          <span class="demonstration">动画出场帧图片:</span>
          <input type="file" id="out" @change="inputFile($event, 'out')" />
        </div>
        <div class="block">
          <span class="demonstration">动画进场帧图片:</span>
          <input type="file" id="open" @change="inputFile($event, 'open')" />
        </div>
        <!-- <div class="block">
          <span class="demonstration">叠图数量:</span>
          <el-slider
            v-model="num"
            :max="360"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">单帧透明度:</span>
          <el-slider
            v-model="alpha"
            :max="1"
            :step="0.1"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">整体透明度:</span>
          <el-slider
            v-model="opacity"
            :max="1"
            :step="0.1"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">叠图间角度:</span>
          <el-slider
            v-model="rotate"
            :max="5"
            :min="-1"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div> -->
        <div class="block">
          <span class="demonstration">整体旋转角度:</span>
          <el-slider
            v-model="angle"
            :max="360"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <!-- <div class="block">
          <span class="demonstration">加速方式:</span>
          <el-radio v-model="accType" label="1">匀速</el-radio>
          <el-radio v-model="accType" label="2">正弦</el-radio>
          <el-radio v-model="accType" label="3">二次函数</el-radio
          ><el-radio v-model="accType" label="4">三次贝塞尔</el-radio>
        </div> -->
        <div class="block" v-show="accType == '1'">
          <span class="demonstration">动画每次旋转角度:</span>
          <el-slider
            v-model="aniRotate"
            :max="30"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block" v-show="accType == '2'">
          <span class="demonstration">旋转角度峰值:</span>
          <el-slider
            v-model="sineConfig.peakValue"
            :max="360"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block" v-show="accType == '2'">
          <span class="demonstration">一轮动画时长:</span>
          <el-slider
            v-model="sineConfig.duration"
            :max="5"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block" v-show="accType == '3'">
          <span class="demonstration">旋转角度峰值:</span>
          <el-slider
            v-model="quadConfig.peakValue"
            :max="360"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block" v-show="accType == '3'">
          <span class="demonstration">一轮动画时长:</span>
          <el-slider
            v-model="quadConfig.duration"
            :max="5"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block" v-show="accType == '4'">
          <span class="demonstration">一轮动画时长:</span>
          <el-slider
            v-model="bezierCurveEnd"
            :max="10"
            :step="1"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block" v-show="accType == '4'">
          <span class="demonstration">贝塞尔曲线控制点一X位置:</span>
          <el-slider
            v-model="bezierCurve.px1"
            :max="5"
            :min="-5"
            :step="0.01"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block" v-show="accType == '4'">
          <span class="demonstration">贝塞尔曲线控制点一Y位置:</span>
          <el-slider
            v-model="bezierCurve.py1"
            :max="5"
            :min="-5"
            :step="0.01"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block" v-show="accType == '4'">
          <span class="demonstration">贝塞尔曲线控制点二X位置:</span>
          <el-slider
            v-model="bezierCurve.px2"
            :max="5"
            :min="-5"
            :step="0.01"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block" v-show="accType == '4'">
          <span class="demonstration">贝塞尔曲线控制点二Y位置:</span>
          <el-slider
            v-model="bezierCurve.py2"
            :max="5"
            :min="-5"
            :step="0.01"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block" v-show="accType == '4'">
          <span class="demonstration">贝塞尔曲线终点X位置:</span>
          <el-slider
            v-model="bezierCurve.px3"
            :max="5"
            :min="-5"
            :step="0.01"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block" v-show="accType == '4'">
          <span class="demonstration">贝塞尔曲线终点Y位置:</span>
          <el-slider
            v-model="bezierCurve.py3"
            :max="5"
            :min="-5"
            :step="0.01"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block" v-show="accType == '4'">
          <span class="demonstration">最大叠图数量:</span>
          <el-slider
            v-model="numMax"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block" v-show="accType == '4'">
          <span class="demonstration">最大叠图间角度:</span>
          <el-slider
            v-model="degMax"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div class="block" v-show="accType == '4'">
          <span class="demonstration">最大叠图透明度:</span>
          <el-slider
            v-model="alphaMax"
            :max="1"
            :step="0.01"
            :show-input="true"
            :style="{ width: '350px' }"
          ></el-slider>
        </div>
        <div
          class="block"
          :style="{
            width: '100%',
            height: '200px',
            display: 'flex',
            'justify-content': 'space-around',
          }"
          v-show="accType == '4'"
        >
          <canvas width="800" height="400" id="bezierCurve"></canvas>
        </div>
        <el-button type="primary" @click="onclick">绘制</el-button>
        <el-button type="primary" @click="play">播放</el-button>
        <el-button type="primary" @click="pause">暂停</el-button>
        <el-button type="primary" @click="stop">停止</el-button>
      </div>
      <canvas ref="canvas" id="canvas"></canvas>
      <img
        src="../assets/查看源图像.jpg"
        ref="image"
        v-show="false"
        @load="imgLoad"
      />
    </div>
  </div>
</template>
<script>
import { CubicBezier, putImageDataAndAdaptiveCanvas } from "../utils";
export default {
  data() {
    return {
      num: 72, //叠图数量
      alpha: 0.1, //单帧透明度
      opacity: 1, //整体透明度
      rotate: 1, //叠图间角度
      angle: 0, //整体旋转角度
      aniRotate: 1, //整体动画每次旋转角度
      width: 640, //canvas宽度
      height: 360, //canvas高度
      animationId: false, //动画ID
      canvas: null, //需要展示效果的canvas节点
      ctx: null, //canvas上下文
      image: null, //要绘制的图片
      templeCanvas: null, //中间帧
      context: null, //templeCanvas上下文
      accType: "4", //动画加速方式
      sineConfig: {
        //正弦加速设置
        peakValue: 180, //正弦函数峰值
        duration: 0.5, //一轮动画时长
      },
      quadConfig: {
        //二次函数加速设置
        peakValue: 180, //二次函数峰值
        duration: 1, //一轮动画时长
      },
      quadCoe: {
        //二次函数系数
        a: 0,
        b: 0,
        c: 0,
      },
      bezierCurve: {
        //三阶贝塞尔曲线的三个控制点位置
        px1: 0,
        py1: 0,
        px2: 0,
        py2: 0,
        px3: 1,
        py3: 1,
      },
      bezierCurveEnd: 10, //三阶贝塞尔曲线终点位置(即以三阶贝塞尔曲线做一轮加速动画的时长)
      offsetX: 100,
      offsetY: 100,
      startPlayTime: 0,
      lut: [],
      openCanvas: null,
      outCanvas: null,
      numMax: 36, //最高叠图数量
      alphaMax: 1, //最高透明度
      degMax: 1, //最高叠图间角度
      paused: true, // 是否暂停播放
      timeOutId: null,
      freezFrame: 0,
    };
  },
  mounted: function () {
    this.image = this.$refs.image;
    this.canvas = this.$refs.canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    this.templeCanvas = document.createElement("canvas");
    this.templeCanvas.width = this.width * 3;
    this.templeCanvas.height = this.height * 3;
    this.context = this.templeCanvas.getContext("2d");
    this.getCoefficient();
    this.drawBezierCurve();
    this.CubicBezierLut(
      { x: 0, y: 0 },
      { x: this.bezierCurve.px1, y: this.bezierCurve.py1 },
      { x: this.bezierCurve.px2, y: this.bezierCurve.py2 },
      { x: this.bezierCurve.px3, y: this.bezierCurve.py3 }
    );
  },
  methods: {
    //绘制单帧
    drawCanvas() {
      if (this.paused || this.angle >= 360) return;
      // this.ctx.restore();
      let num, alpha, deg, canvas;
      if (this.accType == 1) {
        //匀速
        this.angle = (this.angle + this.aniRotate) % 360;
      } else if (this.accType == 2) {
        // 正弦
        let s = new Date().getSeconds() % this.sineConfig.duration;
        let time = new Date().getMilliseconds();
        let currentTime = s * 1000 + time;
        let currentDeg =
          (currentTime / (this.sineConfig.duration * 1000)) * Math.PI;
        let value = this.sineConfig.peakValue * Math.sin(currentDeg);
        if (currentDeg <= Math.PI / 2) {
          this.angle = -(this.sineConfig.peakValue - value);
        } else {
          this.angle = -(this.sineConfig.peakValue + value);
        }
        // this.angle = (this.angle + increase) % 360;
      } else if (this.accType == 3) {
        //二次函数
        let s = new Date().getSeconds() % this.quadConfig.duration;
        let time = new Date().getMilliseconds();
        let X = (s * 1000 + time) / 1000;
        let value =
          this.quadCoe.a * X * X + this.quadCoe.b * X + this.quadCoe.c;
        if (X <= this.quadConfig.duration / 2) {
          this.angle = -(this.quadConfig.peakValue - value);
        } else {
          this.angle = -(this.quadConfig.peakValue + value);
        }
        // this.angle = (this.angle + Y) % 360;
      } else if (this.accType == 4) {
        if (this.startPlayTime != 0) {
          //贝塞尔
          let X =
            (performance.now() - this.startPlayTime) /
            1000 /
            this.bezierCurveEnd;
          if (X < 0.5) {
            let Y = this.getYbyX(X * 2);
            this.angle = Math.min(155, Math.ceil(155 * Y));
            num = Math.ceil(this.numMax * Y/2);
            alpha = Math.max(0.1,Math.ceil(this.alphaMax * (1 - Y * 2) * 100) / 100);
            deg = Math.ceil(this.degMax * Y * 100) / 100;
            canvas = this.outCanvas;
          } else {
            let Y = this.getYbyX((X - 0.5) * 2);
            this.angle = Math.min(360, Math.ceil(25 * Y + 335));
            this.bezierCurve = {
              px1: 1,
              py1: 1,
              px2: 1,
              py2: 1,
              px3: 1,
              py3: 1,
            };
            num = Math.ceil(this.numMax * (1 - Y)/2);
            alpha = Math.max(0.1,Math.ceil(this.alphaMax * (Y - 0.5) * 2 * 100) / 100);
            deg = Math.ceil(this.degMax * (1 - Y) * 100) / 100;
            canvas = this.openCanvas;
          }
        }
      }
      this.drawSingleFrame(num, alpha, deg, canvas);
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.canvas.width = this.width;
      this.ctx.globalAlpha = this.opacity;
      // this.ctx.save();
      this.ctx.translate(this.width / 2, this.height / 2);
      this.ctx.rotate((this.angle / 180) * Math.PI);
      this.ctx.translate(-this.width / 2, -this.height / 2);
      this.ctx.drawImage(
        this.templeCanvas,
        0,
        0,
        this.width * 3,
        this.height * 3,
        -this.width,
        -this.height,
        this.width * 3,
        this.height * 3
      );
      requestAnimationFrame(this.drawCanvas);
    },
    // 播放
    play() {
      this.startPlayTime = performance.now();
      this.paused = false;
      this.drawCanvas();
    },
    //暂停
    pause() {
      this.paused = true;
    }, //暂停
    stop() {
      this.paused = true;
      this.bezierCurve = {
        px1: 0,
        py1: 0,
        px2: 0,
        py2: 0,
        px3: 1,
        py3: 1,
      };
      this.angle = 0;
      this.startPlayTime = 0;
    },
    //绘制叠图帧
    drawSingleFrame(num, alpha, deg, canvas) {
      
      let image = canvas || this.image;
      let templeCanvas1 = document.createElement("canvas");
      templeCanvas1.width = this.width * 3;
      templeCanvas1.height = this.height * 3;
      let context1 = templeCanvas1.getContext("2d");
      let testCanvas = new OffscreenCanvas(this.width, this.height);
      let testCtx = testCanvas.getContext("2d");
      context1.globalAlpha = alpha || this.alpha;
      //上下镜像
      testCtx.save();
      testCtx.translate(0, this.height);
      testCtx.scale(1, -1);
      testCtx.drawImage(image, 0, 0, this.width, this.height);
      testCtx.restore();
      context1.drawImage(testCanvas, this.width, 0);
      context1.drawImage(testCanvas, this.width, this.height * 2);
      //左右镜像
      testCtx.clearRect(0, 0, this.width, this.height);
      testCtx.save();
      testCtx.translate(this.width, 0);
      testCtx.scale(-1, 1);
      testCtx.drawImage(image, 0, 0, this.width, this.height);
      testCtx.restore();
      context1.drawImage(testCanvas, 0, this.height);
      context1.drawImage(testCanvas, this.width * 2, this.height);
      //中间内容
      context1.drawImage(
        image,
        this.width,
        this.height,
        this.width,
        this.height
      );
      for (let i = num || this.num; i > 0; i--) {
        let rotateDeg = ((i * -(deg || this.rotate)) / 180) * Math.PI;
        this.context.save();
        this.context.translate((this.width * 3) / 2, (this.height * 3) / 2);
        this.context.rotate(rotateDeg);
        this.context.translate((-this.width * 3) / 2, (-this.height * 3) / 2);
        this.context.drawImage(
          templeCanvas1,
          0,
          0,
          this.width * 3,
          this.height * 3
        );
        this.context.restore();
      }
    },
    //图片加载成功后绘制叠图帧
    imgLoad: function () {
      this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
    },
    //按下绘制按钮
    onclick: function () {
      this.drawCanvas();
    },
    // 获取方程系数
    getCoefficient: function () {
      let arr = [];
      arr.push([0, 0]);
      arr.push([this.quadConfig.duration / 2, this.quadConfig.peakValue]);
      arr.push([this.quadConfig.duration, 0]);
      let data = this.dataHandel(arr);
      let D = this.det(data[data.length - 1]);
      this.quadCoe.a = this.det(data[0]) / D;
      this.quadCoe.b = this.det(data[1]) / D;
      this.quadCoe.c = this.det(data[2]) / D;
    },
    // 行列式数据处理(输入点,输入行列式)
    dataHandel: function (arr) {
      let newArr = [];
      for (let i = 0; i <= arr.length; i++) {
        let item = [];
        for (let j = 0; j < arr.length; j++) {
          let item1 = [];
          for (let k = 0; k < arr.length; k++) {
            if (k === i) {
              item1.push(arr[j][1]);
            } else {
              item1.push(Math.pow(arr[j][0], arr.length - 1 - k));
            }
          }
          item.push(item1);
        }
        newArr.push(item);
      }
      return newArr;
    },
    // 计算n阶行列式
    det(square) {
      // 方阵约束
      if (square.length !== square[0].length) {
        throw new Error();
      }
      // 方阵阶数
      let n = square.length;

      let result = 0;
      if (n > 3) {
        // n 阶
        for (let column = 0; column < n; column++) {
          // 去掉第 0 行第 column 列的矩阵
          let matrix = new Array(n - 1)
            .fill(0)
            .map((arr) => new Array(n - 1).fill(0));
          for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1; j++) {
              if (j < column) {
                matrix[i][j] = square[i + 1][j];
              } else {
                matrix[i][j] = square[i + 1][j + 1];
              }
            }
          }
          result += square[0][column] * Math.pow(-1, 0 + column) * det(matrix);
        }
      } else if (n === 3) {
        // 3 阶
        result =
          square[0][0] * square[1][1] * square[2][2] +
          square[0][1] * square[1][2] * square[2][0] +
          square[0][2] * square[1][0] * square[2][1] -
          square[0][2] * square[1][1] * square[2][0] -
          square[0][1] * square[1][0] * square[2][2] -
          square[0][0] * square[1][2] * square[2][1];
      } else if (n === 2) {
        // 2 阶
        result = square[0][0] * square[1][1] - square[0][1] * square[1][0];
      } else if (n === 1) {
        // 1 阶
        result = square[0][0];
      }
      return result;
    },
    //绘制贝塞尔曲线
    drawBezierCurve() {
      let canvas = document.getElementById("bezierCurve");
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 800, 400);
      ctx.beginPath();
      ctx.moveTo(
        this.bezierCurve.px1 * 150 + this.offsetX,
        this.bezierCurve.py1 * 150 + this.offsetY
      );
      ctx.arc(
        this.bezierCurve.px1 * 150 + this.offsetX,
        this.bezierCurve.py1 * 150 + this.offsetY,
        2,
        0,
        2 * Math.PI
      );
      ctx.moveTo(
        this.bezierCurve.px2 * 150 + this.offsetX,
        this.bezierCurve.py2 * 150 + this.offsetY
      );
      ctx.arc(
        this.bezierCurve.px2 * 150 + this.offsetX,
        this.bezierCurve.py2 * 150 + this.offsetY,
        2,
        0,
        2 * Math.PI
      );
      ctx.moveTo(
        this.bezierCurve.px3 * 150 + this.offsetX,
        this.bezierCurve.py3 * 150 + this.offsetY
      );
      ctx.arc(
        this.bezierCurve.px3 * 150 + this.offsetX,
        this.bezierCurve.py3 * 150 + this.offsetY,
        2,
        0,
        2 * Math.PI
      );
      ctx.moveTo(this.offsetX, this.offsetY);
      ctx.lineTo(this.offsetX + 1000, this.offsetY);
      ctx.moveTo(this.offsetX, this.offsetY);
      ctx.lineTo(this.offsetX, this.offsetY + 1000);
      ctx.moveTo(this.offsetX, this.offsetY);
      ctx.bezierCurveTo(
        this.bezierCurve.px1 * 150 + this.offsetX,
        this.bezierCurve.py1 * 150 + this.offsetY,
        this.bezierCurve.px2 * 150 + this.offsetX,
        this.bezierCurve.py2 * 150 + this.offsetY,
        this.bezierCurve.px3 * 150 + this.offsetX,
        this.bezierCurve.py3 * 150 + this.offsetY
      );
      ctx.stroke();
    },
    //
    CubicBezierLut(p0, p1, p2, p3, count = 100) {
      this.lut = [];
      this.bezier = new CubicBezier(p0, p1, p2, p3);
      var step = 1 / count;
      var t = 0;
      for (var i = 0; i < count; i++) {
        this.lut.push(this.bezier.get(t));
        t += step;
      }
    },
    // 找一个最接近的点
    getYbyX: function (x) {
      const dict = this.bezier.get(x);
      const { y } = dict;
      return y;
    },
    //上传帧图
    inputFile: function (e, type) {
      let that = this;
      var file = e.target.files[0]; //获取input输入的图片
      if (!/image\/\w+/.test(file.type)) {
        alert("请确保文件为图像类型");
        return false;
      } //判断是否图片，在移动端由于浏览器对调用file类型处理不同，虽然加了accept = 'image/*'，但是还要再次判断
      let reader = new FileReader();
      reader.readAsDataURL(file); //转化成base64数据类型
      reader.onload = function (e) {
        that.drawToCanvas(this.result, type);
      };
    },
    //绘制上传的图片并自适应
    drawToCanvas: function (imgData, type) {
      let that = this;
      let canvas = new OffscreenCanvas(this.width, this.height);
      let ctx = canvas.getContext("2d");
      var img = new Image();
      img.onload = function () {
        //必须onload之后再画
        let tempCanvas = document.createElement("canvas");
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        // let tempCanvas = new OffscreenCanvas(img.width, img.height);
        let context = tempCanvas.getContext("2d");
        context.drawImage(img, 0, 0, img.width, img.height);
        putImageDataAndAdaptiveCanvas(
          ctx,
          context.getImageData(0, 0, img.width, img.height)
        );
        tempCanvas.width = that.width;
        tempCanvas.height = that.height;
        context.fillRect(0, 0, that.width, that.height);
        context.drawImage(canvas, 0, 0, that.width, that.height);
        if (type === "open") {
          that.openCanvas = tempCanvas;
        } else {
          that.outCanvas = tempCanvas;
        }
      };
      img.src = imgData;
    },
  },
  watch: {
    quadConfig: {
      handler(newVal, oldVal) {
        this.getCoefficient();
      },
      deep: true,
    },
    bezierCurve: {
      handler(newVal, oldVal) {
        this.drawBezierCurve();
        this.CubicBezierLut(
          { x: 0, y: 0 },
          { x: this.bezierCurve.px1, y: this.bezierCurve.py1 },
          { x: this.bezierCurve.px2, y: this.bezierCurve.py2 },
          { x: this.bezierCurve.px3, y: this.bezierCurve.py3 }
        );
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.config {
  width: 100%;
  height: 800px;
  .box {
    width: 550px;
    height: 100%;
    background-color: skyblue;
    float: left;
    overflow: auto;
    .block {
      display: flex;
      padding: 10px 20px;
      height: 20px;
      align-items: center;
      .demonstration {
        display: inline-block;
        width: 150px;
      }
      canvas {
        background-color: pink;
        transform: rotateX(180deg);
      }
    }
  }
  #canvas {
    float: left;
  }
  #bezierCurve {
    width: 400px;
    height: 200px;
  }
}
</style>
