<template>
  <div class="subtitle">
    <h1>canvas绘制文字</h1>
    <div class="box">
      <div class="optionsBox">
        <div ref="fontTest">
          上传字体<el-upload
            class="upload-demo"
            ref="upload"
            :action="''"
            :multiple="true"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="uploadFont"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
          </el-upload>
        </div>
        <div>
          字体<el-select v-model="applyOptions.fontFamily" placeholder="请选择">
            <el-option
              v-for="item in fontFamlyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span class="demonstration">字体颜色</span>
          <el-color-picker v-model="applyOptions.color"></el-color-picker>
        </div>
        <div>
          对齐方式<el-select
            v-model="applyOptions.textAlign"
            placeholder="请选择"
          >
            <el-option
              v-for="item in textAlignOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          加粗<el-switch v-model="applyOptions.fontWeight"></el-switch>
          斜体<el-switch v-model="applyOptions.fontStyle"></el-switch>
        </div>
        <div>
          投影<el-switch v-model="applyOptions.fontShadow"></el-switch>
          <span v-show="applyOptions.fontShadow">x偏移量</span
          ><el-slider
            v-model="applyOptions.fontShadowXOffset"
            v-show="applyOptions.fontShadow"
            style="width: 150px; display: inline-block"
          ></el-slider>
          <span v-show="applyOptions.fontShadow">y偏移量</span
          ><el-slider
            v-model="applyOptions.fontShadowYOffset"
            v-show="applyOptions.fontShadow"
            style="width: 150px; display: inline-block"
          ></el-slider>
          <span v-show="applyOptions.fontShadow">投影颜色</span
          ><el-color-picker
            :show-alpha="true"
            :color-format="'rgb'"
            v-model="applyOptions.fontShadowColor"
            v-show="applyOptions.fontShadow"
          ></el-color-picker>
          <span v-show="applyOptions.fontShadow">投影模糊度</span
          ><el-slider
            v-model="applyOptions.fontShadowBlur"
            :max="20"
            v-show="applyOptions.fontShadow"
            style="width: 150px; display: inline-block"
          ></el-slider>
        </div>
        <div>
          字体大小<el-slider
            v-model="applyOptions.fontSize"
            @input="measureWidth"
            @change="measureWidth"
            style="width: 500px; display: inline-block"
          ></el-slider>
        </div>
        <div>
          开启描边<el-switch v-model="applyOptions.useStroke"></el-switch>
          <span v-show="applyOptions.useStroke">内描边颜色</span>
          <el-color-picker
            v-show="applyOptions.useStroke"
            v-model="applyOptions.strokeColor"
          ></el-color-picker>
          <span v-show="applyOptions.useStroke">内描边宽度</span>
          <el-slider
            v-show="applyOptions.useStroke"
            v-model="applyOptions.strokeWidth"
            :max="10"
            style="width: 500px; display: inline-block"
          ></el-slider>
        </div>
        <div v-show="applyOptions.useStroke">
          <span>外描边颜色</span>
          <el-color-picker
            v-model="applyOptions.strokeColorW"
          ></el-color-picker>
          <span>外描边宽度</span>
          <el-slider
            v-model="applyOptions.strokeWidthW"
            :max="10"
            style="width: 500px; display: inline-block"
          ></el-slider>
        </div>
        <div>
          不透明度<el-slider
            v-model="applyOptions.alpha"
            style="width: 500px; display: inline-block"
          ></el-slider>
        </div>
        <div>
          旋转角度:<el-slider
            v-model="applyOptions.rotateValue"
            :max="360"
            style="width: 500px; display: inline-block"
          ></el-slider>
        </div>
        <div>
          Y轴旋转动画<button @click="changeScale">
            {{ isPlaying ? "暂停" : "播放" }}
          </button>
        </div>
        <div><button @click="download">下载图片</button></div>
        <!-- <div>位置<input type="num" v-model="applyOptions.posX">X<input type="num" v-model="applyOptions.posY"></div>
        <div>尺寸<input type="num" v-model="applyOptions.width">X<input type="num" v-model="applyOptions.fontSize"></div> -->
      </div>
      <canvas
        id="canvas"
        ref="canvas"
        :style="{
          opacity: applyOptions.alpha / 100,
          transform:
            'translateX(' +
            640 * Math.sin((scale / 180) * Math.PI) +
            'px) ' +
            'rotateY(' +
            scale +
            'deg)',
        }"
        width="1280"
        height="720"
      ></canvas>
      <!-- <canvas id="canvas" :style="{opacity:applyOptions.alpha/100,transform:'translateX('+640*Math.sin(scale/180*Math.PI)+'px) '+'rotateY('+scale+'deg)'}" width="1280" height="720"></canvas> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "蓝天数据",
      textAlignOptions: [
        { value: "left", label: "左对齐" },
        { value: "right", label: "右对齐" },
        { value: "center", label: "居中" },
        { value: "start", label: "开始" },
        { value: "end", label: "结束" },
      ],
      fontFamlyOptions: [
        { value: "SimSun", label: "宋体" },
        { value: "SimHei", label: "黑体" },
        { value: "Microsoft Yahei", label: "微软雅黑" },
        { value: "Microsoft JhengHei", label: "微软正黑体" },
        { value: "KaiTi", label: "楷体" },
        { value: "NSimSun", label: "新宋体" },
        { value: "FangSong", label: "仿宋" },
      ],
      applyOptions: {
        fontFamily: "SimSun",
        color: "#000000",
        textAlign: "left",
        fontWeight: false,
        fontStyle: false,
        fontShadow: false,
        fontShadowXOffset: 2,
        fontShadowYOffset: 2,
        fontShadowColor: "rgba(0,0,0,0.8)",
        fontShadowBlur: 2,
        fontSize: 50,
        strokeColor: "#000000",
        useStroke: false,
        strokeWidth: 1,
        strokeColorW: "#000000",
        strokeWidthW: 1,
        alpha: 100,
        rotateValue: 0,
        posX: 100,
        posY: 100,
        width: 1280,
        height: 100,
      },
      scale: 0,
      isPlaying: false,
      intervalId: "",
    };
  },
  methods: {
    download() {
      const dataurl = this.$refs.canvas.toDataURL("image/png");
      const file = this.dataURLtoFile(dataurl, "测试");
      console.log(file);
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    drawSubtitle: function () {
      let canvas = document.getElementById("canvas");
      canvas.width = 1280;
      let ctx = canvas.getContext("2d");
      ctx.strokeRect(
        this.applyOptions.posX,
        this.applyOptions.posY,
        this.applyOptions.width,
        this.applyOptions.fontSize
      );
      ctx.globalAlpha = this.applyOptions.alpha;
      ctx.textBaseline = "top";
      let font =
        (this.applyOptions.fontStyle ? "italic " : "normal ") +
        (this.applyOptions.fontWeight ? "bold " : "normal ") +
        this.applyOptions.fontSize +
        "px " +
        this.applyOptions.fontFamily;
      ctx.font = font;
      console.log(font);
      ctx.textAlign = this.applyOptions.textAlign;
      if (this.applyOptions.fontShadow) {
        ctx.shadowColor = this.applyOptions.fontShadowColor; //定义投影颜色为蓝色
        ctx.shadowOffsetX = this.applyOptions.fontShadowXOffset;
        ctx.shadowOffsetY = this.applyOptions.fontShadowYOffset;
        ctx.shadowBlur = this.applyOptions.fontShadowBlur;
      }
      if (this.applyOptions.rotateValue) {
        ctx.save();
        ctx.translate(
          this.applyOptions.width / 2,
          this.applyOptions.height / 2
        );
        ctx.rotate((this.applyOptions.rotateValue / 180) * Math.PI);
        ctx.translate(
          -this.applyOptions.width / 2,
          -this.applyOptions.height / 2
        );
      }
      if (this.applyOptions.useStroke && this.applyOptions.strokeWidthW != 0) {
        ctx.strokeStyle = this.applyOptions.strokeColorW;
        ctx.lineWidth = this.applyOptions.strokeWidthW;
        ctx.strokeText(
          this.content,
          this.applyOptions.posX,
          this.applyOptions.posY
        );
      }
      // ctx.fillStyle='#2dacd7'
      // ctx.fillText(this.content, this.applyOptions.posX-2,this.applyOptions.posY+2);
      ctx.fillStyle = this.applyOptions.color;
      ctx.fillText(
        this.content,
        this.applyOptions.posX,
        this.applyOptions.posY
      );
      if (this.applyOptions.useStroke && this.applyOptions.strokeWidth != 0) {
        ctx.strokeStyle = this.applyOptions.strokeColor;
        ctx.lineWidth = this.applyOptions.strokeWidth;
        ctx.strokeText(
          this.content,
          this.applyOptions.posX,
          this.applyOptions.posY
        );
      }
      if (this.applyOptions.rotateValue) {
        ctx.restore();
      }
    },
    measureWidth: function (value) {
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      let text = ctx.measureText(this.content);
      this.applyOptions.width = text.width;
      this.applyOptions.height = value;
    },
    changeScale: function () {
      if (this.isPlaying) {
        clearInterval(this.intervalId);
        this.isPlaying = false;
      } else {
        this.isPlaying = true;
        this.intervalId = setInterval(() => {
          this.scale += 2;
          this.drawSubtitle();
        }, 17);
      }
    },
    uploadFont(file) {
      const that = this;
      const url = this.fileToBlob(file.raw);
      const name = this.randomString();
      const font = new FontFace(name, `url(${url})`);
      font.load().then(function (loadedFontFace) {
        document.fonts.add(loadedFontFace);
        document.fonts.ready.then(() => {
          that.fontFamlyOptions.push({
            value: name,
            label: "测试字体" + that.fontFamlyOptions.length,
          });
        });
      });
    },
    fileToBlob(file) {
      let url = "";
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    randomString(e) {
      e = e || 6;
      var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz",
        a = t.length,
        n = "";
      for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
      return n;
    },
  },
  mounted: function () {
    this.drawSubtitle();
  },
  watch: {
    applyOptions: {
      handler(newVal, oldVal) {
        this.drawSubtitle();
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.subtitle {
  .box {
    .optionsBox {
      float: left;
      width: 630px;
      height: 720px;
      background-color: pink;
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
