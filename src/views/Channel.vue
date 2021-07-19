<template>
  <div class="channel">
    <h1>Web Audio Api</h1>
    <div class="box">
      <div class="config">
        <div class="setting">
          <span class="title">上传音频:(可选)</span>
          <input type="file" ref="file" @change="loadFile" />
        </div>
        <div class="setting">
          <span class="title">左声道音量:</span>
          <el-slider
            :style="{ width: '300px' }"
            :max="1"
            :step="0.01"
            :show-tooltip="false"
            v-model="lVolume"
          ></el-slider>
          <span>{{ (lVolume * 100).toFixed(0) }}%</span>
        </div>
        <div class="setting">
          <span class="title">右声道音量:</span>
          <el-slider
            :style="{ width: '300px' }"
            :max="1"
            :step="0.01"
            :show-tooltip="false"
            v-model="rVolume"
          ></el-slider>
          <span>{{ (rVolume * 100).toFixed(0) }}%</span>
        </div>
        <div class="setting">
          <span class="title">淡入:</span>
          <el-switch v-model="openFadeIn"></el-switch>
          <el-slider
            :style="{ width: '300px' }"
            :max="10"
            :show-tooltip="false"
            v-model="fadeInDuration"
          ></el-slider>
          <span>{{ fadeInDuration }}s</span>
        </div>
        <div class="setting">
          <span class="title">淡出:</span>
          <el-switch v-model="openFadeOut"></el-switch>
          <el-slider
            :style="{ width: '300px' }"
            :max="10"
            :show-tooltip="false"
            v-model="fadeOutDuration"
          ></el-slider>
          <span>{{ fadeOutDuration }}s</span>
        </div>
        <div class="setting" v-show="false">
          <span class="title">播放速度:</span>
          <el-slider
            :style="{ width: '300px' }"
            :max="3"
            :step="0.1"
            :show-tooltip="false"
            v-model="playbackRate"
          ></el-slider>
          <span>{{ playbackRate }}倍速</span>
        </div>
        <div class="setting" v-show="false">
          <span class="title">播放失谐:</span>
          <el-slider
            :style="{ width: '300px' }"
            :max="12000"
            :min="-12000"
            :show-tooltip="false"
            v-model="detune"
          ></el-slider>
          <span>{{ detune }}</span>
        </div>
        <div class="setting">
          <span class="title">音源位置X:</span>
          <el-slider
            :style="{ width: '300px' }"
            :max="10"
            :min="-10"
            :step="0.1"
            :show-tooltip="false"
            v-model="position.x"
          ></el-slider>
          <span>{{ position.x }}</span>
        </div>
        <div class="setting">
          <span class="title">音源位置Y:</span>
          <el-slider
            :style="{ width: '300px' }"
            :max="10"
            :min="-10"
            :step="0.1"
            :show-tooltip="false"
            v-model="position.y"
          ></el-slider>
          <span>{{ position.y }}</span>
        </div>
        <div class="setting">
          <span class="title">音源位置Z:</span>
          <el-slider
            :style="{ width: '300px' }"
            :max="10"
            :min="-10"
            :step="0.1"
            :show-tooltip="false"
            v-model="position.z"
          ></el-slider>
          <span>{{ position.z }}</span>
        </div>
        <div class="setting">
          <span class="title">滤波器</span>
          <el-select v-model="biquadFilterType" placeholder="请选择">
            <el-option
              v-for="item in biquadFilterOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="setting">
          <span class="title">滤波频率阈值:</span>
          <el-slider
            :style="{ width: '300px' }"
            :max="9999"
            :min="0"
            :step="1"
            :show-tooltip="false"
            v-model="biquadFilterFrequency"
          ></el-slider>
          <span>{{ biquadFilterFrequency }}Hz</span>
        </div>
        <div class="setting">
          <span class="title">{{ openConvoler ? "关闭" : "开启" }}混响:</span>
          <el-switch v-model="openConvoler" />
          <el-select v-model="convoler" placeholder="请选择">
            <el-option
              v-for="item in convolverList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="setting" style="height: 100px">
          <span class="title">上传混音音频:(可选)</span>
          <el-upload
            class="upload-demo"
            action=""
            multiple
            :limit="3"
            accept="audio/*"
            :file-list="fileList"
            :on-change="uploadReverberation"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <div class="setting">
          <span class="title">振荡器(音波生成器):</span>
          <a href="http://192.168.180.41:5501/index.html" target="_blank"
            >点这里玩一玩</a
          >
        </div>
        <div class="setting">
          <el-button type="primary" @click="play">播放</el-button>
          <el-button type="primary" @click="plosivePlay">爆音播放</el-button>
          <el-button type="primary" @click="stop">暂停</el-button>
        </div>
      </div>
      <div class="content">
        <canvas id="canvas" width="800" height="400"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ctx: null, //canvas上下文
      sourceNode: null, //音频sourceNode
      audioContext: null, //音频上下文
      buffer: null, //音频buffer数据
      lVolume: 1, //音频左声道音量
      lGain: null, //音频左声道node
      rGain: null, //音频右声道node
      rVolume: 1, //音频右声道音量
      pannerNode: null, //音频位置node
      biquadFilterNode: null, //音频滤波器node
      biquadFilterType: "lowpass", //音频滤波器类型
      biquadFilterFrequency: 9999, //音频滤波器阈值
      compressorNode: null, //动态混音node
      convolverNode: null, //混响node
      openFadeIn: false,
      fadeInDuration: 3,
      openFadeOut: false,
      fadeOutDuration: 3,
      position: {
        //音频位置
        x: 0,
        y: 0,
        z: 0,
      },
      reverberation: [], //混响音频
      fileList: [],
      biquadFilterOptions: [
        {
          value: "lowpass",
          label: "低通滤波",
        },
        {
          value: "highpass",
          label: "高通滤波",
        },
        {
          value: "bandpass",
          label: "标准二阶带通滤波器",
        },
        {
          value: "lowshelf",
          label: "标准二阶低架过滤器",
        },
        {
          value: "highshelf",
          label: "标准二阶高架过滤器",
        },
        {
          value: "peaking",
          label: "范围滤波",
        },
        {
          value: "notch",
          label: "标准陷波滤波器",
        },
        {
          value: "allpass",
          label: "标准二阶全通滤波器",
        },
      ],
      openConvoler: false,
      convolverList: [
        {
          label: "大厅",
          url: require("../assets/audio/convolver/BIG HALL E003 M2S.wav"),
          value: 0,
        },
        {
          label: "走廊",
          url: require("../assets/audio/convolver/CORRIDOR FLUTTER ECHO E001 M2S.wav"),
          value: 1,
        },
        {
          label: "潮湿洞穴",
          url: require("../assets/audio/convolver/DAMPED CAVE E001 M2S.wav"),
          value: 2,
        },
        {
          label: "杜比",
          url: require("../assets/audio/convolver/DUBWISE E001 M2S.wav"),
          value: 3,
        },
        {
          label: "酒店",
          url: require("../assets/audio/convolver/HOTHALL COMP-1.wav"),
          value: 4,
        },
        {
          label: "中阻尼房间",
          url: require("../assets/audio/convolver/MEDIUM DAMPING ROOM E001 M2S.wav"),
          value: 5,
        },
        {
          label: "巨型扩散器",
          url: require("../assets/audio/convolver/MEGA DIFFUSOR E001 M2S.wav"),
          value: 6,
        },
        {
          label: "管道",
          url: require("../assets/audio/convolver/PIPE & CARPET E001 M2S.wav"),
          value: 7,
        },
      ],
      convoler: 0,
      convolverBuffer: null,
      playbackRate: 1,
      detune:0
    };
  },
  mounted: function () {
    this.ctx = document.getElementById("canvas").getContext("2d");
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    this.loadBuffer(
      this.audioContext,
      this.convolverList[this.convoler].url
    ).then((buffer) => {
      this.convolverBuffer = buffer;
    });
  },
  methods: {
    //播放音频
    play() {
      this.reverberation.map((item) => {
        this.initReverberation(item);
      });
      if (this.sourceNode) this.sourceNode.stop();
      this.initAudio(this.buffer);
      this.reverberation.map((item) => {
        item.sourceNode.start();
      });
      if (this.openFadeIn) {
        this.lGain.gain.value = 0;
        this.rGain.gain.value = 0;
        this.lGain.gain.linearRampToValueAtTime(
          this.lVolume,
          this.audioContext.currentTime + this.fadeInDuration
        );
        this.rGain.gain.linearRampToValueAtTime(
          this.rVolume,
          this.audioContext.currentTime + this.fadeInDuration
        );
      }
      this.sourceNode.start();
    },
    //暂停音频
    stop() {
      if (this.sourceNode) {
        if (this.openFadeOut) {
          this.lGain.gain.linearRampToValueAtTime(
            0,
            this.audioContext.currentTime + this.fadeOutDuration
          );
          this.rGain.gain.linearRampToValueAtTime(
            0,
            this.audioContext.currentTime + this.fadeOutDuration
          );
          setTimeout(() => {
            this.sourceNode.stop();
          }, this.fadeOutDuration * 1000);
        } else {
          this.sourceNode.stop();
        }
      }
      this.reverberation.map((item) => {
        console.log(item.sourceNode);
        item.sourceNode.stop();
      });
    },
    //加载文件file
    loadFile(event) {
      const that = this;
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        that.audioContext.decodeAudioData(e.target.result, function (buffer) {
          that.buffer = buffer;
        });
      };
      fileReader.readAsArrayBuffer(event.target.files[0]);
    },
    initAudio(buffer) {
      //创建SourceNode
      this.sourceNode = this.audioContext.createBufferSource();
      //指定SourceNode播放的音频源
      this.sourceNode.buffer = buffer;
      this.sourceNode.playbackRate.value = this.playbackRate;
      this.sourceNode.detune.value = this.detune;
      //创建混音器
      this.compressorNode = this.audioContext.createDynamicsCompressor();
      //创建左声道音频
      this.rGain = this.audioContext.createGain(); // 左声道
      //创建右声道音频
      this.lGain = this.audioContext.createGain(); // 右声道
      //设置左右声道音量
      this.rGain.gain.value = this.lVolume;
      this.lGain.gain.value = this.rVolume;
      const splitter = this.audioContext.createChannelSplitter(2);
      const merger = this.audioContext.createChannelMerger(2);
      this.sourceNode.connect(splitter);
      splitter.connect(this.rGain, 1);
      splitter.connect(this.lGain, 0);
      this.lGain.connect(merger, 0, 1);
      this.rGain.connect(merger, 0, 0);
      //创建3D立体音效
      this.pannerNode = this.audioContext.createPanner();
      this.pannerNode.setPosition(
        this.position.x,
        this.position.y,
        this.position.z
      );
      //创建频谱分析器
      const analyser = this.audioContext.createAnalyser();
      analyser.fftSize = 256;
      //创建滤波器
      this.biquadFilterNode = this.audioContext.createBiquadFilter();
      //设置滤波器类型
      this.biquadFilterNode.type = this.biquadFilterType;
      //设置滤波器频率
      this.biquadFilterNode.frequency.value = this.biquadFilterFrequency;
      //创建混响
      this.convolverNode = this.audioContext.createConvolver();
      this.convolverNode.buffer = this.convolverBuffer;
      merger.connect(this.pannerNode);
      this.pannerNode.connect(this.biquadFilterNode);
      if (this.openConvoler) {
        this.biquadFilterNode.connect(this.convolverNode);
        this.convolverNode.connect(this.compressorNode);
      } else {
        this.biquadFilterNode.connect(this.compressorNode);
      }

      //将上传的所有音频连接到混音器上
      this.reverberation.map((item) => {
        item.sourceNode.connect(this.compressorNode);
      });
      this.compressorNode.connect(analyser);
      analyser.connect(this.audioContext.destination);
      this.render(analyser);
    },
    //绘制分析器频谱
    render(analyser) {
      let that = this;
      this.ctx = canvas.getContext("2d");
      this.ctx.fillStyle = "#00d0ff";
      this.ctx.clearRect(0, 0, 800, 400);
      let startX = 0;
      var dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);
      this.ctx.beginPath();
      for (let i = 0; i < 100; i++) {
        this.ctx.rect(
          startX,
          (400 - dataArray[i] * 1.5) / 2 || 3,
          5,
          dataArray[i] * 1.5 || 2
        );
        this.ctx.fill();
        startX += 8;
      }
      this.ctx.closePath();
      requestAnimationFrame(function () {
        that.render(analyser);
      });
    },
    //绘制分析器频谱
    // render(analyser) {
    //   let that = this;
    //   this.ctx = canvas.getContext("2d");
    //   this.ctx.strokeStyle = "#00d0ff";
    //   this.ctx.lineWidth = 2;
    //   this.ctx.clearRect(0, 0, 800, 400);
    //   var dataArray = new Uint8Array(analyser.frequencyBinCount);

    //   analyser.getByteFrequencyData(dataArray);

    //   var step = Math.round(dataArray.length / 60);

    //   for (var i = 0; i < 40; i++) {
    //     var energy = (dataArray[step * i] / 256.0) * 50;
    //     for (var j = 0; j < energy; j++) {
    //       this.ctx.beginPath();
    //       this.ctx.moveTo(20 * i + 2, 200 + 4 * j);
    //       this.ctx.lineTo(20 * (i + 1) - 2, 200 + 4 * j);
    //       this.ctx.stroke();
    //       this.ctx.beginPath();
    //       this.ctx.moveTo(20 * i + 2, 200 - 4 * j);
    //       this.ctx.lineTo(20 * (i + 1) - 2, 200 - 4 * j);
    //       this.ctx.stroke();
    //     }
    //     this.ctx.beginPath();
    //     this.ctx.moveTo(20 * i + 2, 200);
    //     this.ctx.lineTo(20 * (i + 1) - 2, 200);
    //     this.ctx.stroke();
    //   }
    //   requestAnimationFrame(function () {
    //     that.render(analyser);
    //   });
    // },
    uploadReverberation(file) {
      const that = this;
      const object = {};
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        that.audioContext.decodeAudioData(e.target.result, function (buffer) {
          object.buffer = buffer;
          that.initReverberation(object);
          that.reverberation.push(object);
          that.fileList.push({ name: file.raw.name });
        });
      };
      fileReader.readAsArrayBuffer(file.raw);
    },
    initReverberation(reverberation) {
      //创建SourceNode
      reverberation.sourceNode = this.audioContext.createBufferSource();
      //设置输入的音频buffer
      reverberation.sourceNode.buffer = reverberation.buffer;
      reverberation.sourceNode.loop = true;
    },
    fileToBlob(url) {
      return new Promise((resolve, reject) => {
        //创建XMLHttpRequest对象
        var xhr = new XMLHttpRequest();
        //配置请求方式、请求地址以及是否同步
        xhr.open("POST", url, true);
        //设置请求结果类型为blob
        xhr.responseType = "blob";
        //请求成功回调函数
        xhr.onload = function (e) {
          if (this.status == 200) {
            //请求成功
            //获取blob对象
            var blob = this.response;
            resolve(blob);
          }
        };
        xhr.send();
      });
    },
    loadBuffer(context, url) {
      return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";
        request.onload = function () {
          context.decodeAudioData(
            request.response,
            function (buffer) {
              if (!buffer) {
                reject("error decoding file data: " + url);
              }
              resolve(buffer);
            },
            function (error) {
              reject("decodeAudioData error" + error);
            }
          );
        };
        request.send();
      });
    },
    beforeUpload() {
      return false;
    },
    plosivePlay() {
      const sourceNode1 = this.audioContext.createBufferSource();
      sourceNode1.buffer = this.buffer;
      sourceNode1.connect(this.audioContext.destination);
      sourceNode1.start();
      this.reverberation.map((item) => {
        const sourceNode = this.audioContext.createBufferSource();
        sourceNode.buffer = item.buffer;
        sourceNode.loop = true;
        sourceNode.connect(this.audioContext.destination);
        sourceNode.start();
      });
    },
  },
  watch: {
    lVolume: function (newVal, oldVal) {
      if (this.lGain) this.lGain.gain.value = newVal;
    },
    rVolume: function (newVal, oldVal) {
      if (this.rGain) this.rGain.gain.value = newVal;
    },
    position: {
      handler: function (newVal, oldVal) {
        this.pannerNode.setPosition(newVal.x, newVal.y, newVal.z);
      },
      deep: true,
    },
    biquadFilterType: function (newVal, oldVal) {
      if (this.biquadFilterNode) this.biquadFilterNode.type = newVal;
    },
    biquadFilterFrequency: function (newVal, oldVal) {
      if (this.biquadFilterNode) this.biquadFilterNode.frequency.value = newVal;
    },
    convolver: function (newVal, oldVal) {
      this.loadBuffer(this.audioContext, this.convolverList[newVal].url).then(
        (buffer) => {
          this.convolverBuffer = buffer;
        }
      );
    },
    playbackRate: function (newVal, oldVal) {
      this.sourceNode.playbackRate.value = newVal;
    },
    detune: function (newVal, oldVal) {
      this.sourceNode.detune.value = newVal;
    },
  },
};
</script>
<style lang="less" scoped>
.channel {
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
        height: 50px;
      }
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(100% - 500px);
      height: 100%;
      background-color: #000;
    }
  }
}
</style>
