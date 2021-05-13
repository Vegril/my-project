<template>
  <div class="channel">
    <h1>声道分离及合并分析</h1>
    <div class="box">
      <div class="config">
        <div class="setting">
          <span class="title">上传音频:(可选)</span>
          <input type="file" ref="file" @change="loadFile" />
        </div>
        <div class="setting">
          <span class="title">音量:</span>
          <el-slider :style="{ width: '300px' }" v-model="volume"></el-slider>
        </div>
        <div class="setting">
          <el-button type="primary" @click="play">播放</el-button>
          <el-button type="primary" @click="stop">暂停</el-button>
        </div>
      </div>
      <div class="content">
        <canvas id="canvas" width="800" height="400"></canvas>
      </div>
    </div>
    <audio ref="audio" src="../assets/audio/张杰 - 姜子牙.mp3"></audio>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ctx: null, //canvas上下文
      file: null, //音频文件
      volume: 50, //音量
      audioBufferSourceNode: null, //音频播放节点
    };
  },
  mounted: function () {
    this.ctx = document.getElementById("canvas").getContext("2d");
  },
  methods: {
    //播放音频
    play() {
      let that = this;
      let AudioContext = window.AudioContext || window.webkitAudioContext;
      let audioContext = new AudioContext();
      let fileReader = new FileReader();
      fileReader.onload = function (e) {
        let fileContent = e.target.result;
        audioContext.decodeAudioData(fileContent, function (buffer) {
          that.audioBufferSourceNode = audioContext.createBufferSource();
          let analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          // let gainNode = audioContext.createGain();
          let lGain = audioContext.createGain();  // 左声道
          let rGain = audioContext.createGain();  // 右声道
          lGain.gain.value = 0;
          rGain.gain.value = 1;
          let splitter = audioContext.createChannelSplitter(2);
          let  merger = audioContext.createChannelMerger(2);
          // gainNode.gain.value = that.volume / 100;
          that.audioBufferSourceNode.connect(splitter);
          splitter.connect(lGain, 0);
          splitter.connect(rGain, 1);

          lGain.connect(merger, 0, 0);
          rGain.connect(merger, 0, 1);
          merger.connect(analyser);
          analyser.connect(audioContext.destination);
          that.audioBufferSourceNode.buffer = buffer;
          that.render(analyser);
          that.audioBufferSourceNode.start(0, 20);
        });
      };
      fileReader.readAsArrayBuffer(this.file);
    },
    //暂停音频
    stop() {
      if (this.audioBufferSourceNode) this.audioBufferSourceNode.stop(0);
    },
    //加载文件file
    loadFile(event) {
      this.file = event.target.files[0];
    },
    //绘制分析器频谱
    render(analyser) {
      let that = this;
      this.ctx = canvas.getContext("2d");
      this.ctx.strokeStyle = "#00d0ff";
      this.ctx.lineWidth = 2;
      this.ctx.clearRect(0, 0, 800, 400);
      var dataArray = new Uint8Array(analyser.frequencyBinCount);

      analyser.getByteFrequencyData(dataArray);
      var step = Math.round(dataArray.length / 60);

      for (var i = 0; i < 40; i++) {
        var energy = (dataArray[step * i] / 256.0) * 50;
        for (var j = 0; j < energy; j++) {
          this.ctx.beginPath();
          this.ctx.moveTo(20 * i + 2, 200 + 4 * j);
          this.ctx.lineTo(20 * (i + 1) - 2, 200 + 4 * j);
          this.ctx.stroke();
          this.ctx.beginPath();
          this.ctx.moveTo(20 * i + 2, 200 - 4 * j);
          this.ctx.lineTo(20 * (i + 1) - 2, 200 - 4 * j);
          this.ctx.stroke();
        }
        this.ctx.beginPath();
        this.ctx.moveTo(20 * i + 2, 200);
        this.ctx.lineTo(20 * (i + 1) - 2, 200);
        this.ctx.stroke();
      }
      requestAnimationFrame(function () {
        that.render(analyser);
      });
    },
  },
  watch: {
    volume(newVal, oldVal) {
      this.stop();
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
