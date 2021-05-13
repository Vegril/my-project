<template>
  <div class="lottie">
    <h1>Ae动画</h1>
    <div class="options">
      <div>
        <el-button type="primary" @click="stop" round>停止</el-button>
        <el-button type="primary" @click="pause" round>暂停</el-button>
        <el-button type="primary" @click="play" round>播放</el-button>
      </div>
      <div>
        <p>
          <span>播放速度:</span
          ><el-slider
            v-model="animationSpeed"
            @change="onSpeedChange"
            :max="10"
            :step="0.01"
            style="width: 200px; display: inline-block"
          ></el-slider>
        </p>
      </div>
      <div>
        <span>反向播放:</span
        ><el-switch @change="directionChange" v-model="direction"></el-switch>
      </div>
      <div>
        跳转到某一帧并暂停:<el-slider
          v-model="goToAndStopFrame"
          @input="goToAndStop"
          :max="defaultOptions.animationData.op"
          style="width: 500px; display: inline-block"
        ></el-slider>
      </div>
      <div>
        跳转到某一帧并播放:<el-slider
          v-model="goToAndPlayFrame"
          @change="goToAndPlay"
          :max="defaultOptions.animationData.op"
          style="width: 500px; display: inline-block"
        ></el-slider>
      </div>
      <div>
        播放帧片段:<el-slider
          v-model="range"
          @change="playRange"
          range
          show-stops
          :max="defaultOptions.animationData.op"
          style="width: 500px; display: inline-block"
        >
        </el-slider>
      </div>
      <div>
        文字内容:<el-input
          v-model="input"
          @change="textChange"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>
    <div class="anim">
      <lottie
        ref="lottie"
        :options="defaultOptions"
        :width="960"
        :height="540"
        v-on:animCreated="handleAnimation"
      />
    </div>
  </div>
</template>
<script>
import lottie from "vue-lottie";
import Anim from "../assets/data.json";
export default {
  components: {
    lottie: lottie,
  },
  data() {
    return {
      animationData: {},
      defaultOptions: { animationData: Anim, loop: true, autoplay: true },
      defaultAnim: "",
      duration: 0,
      animationSpeed: 1,
      direction: false,
      goToAndStopFrame: 0,
      goToAndPlayFrame: 0,
      range: [0, Anim.op],
      input: "蓝天数据云剪辑",
      oldInput: "蓝天数据云剪辑",
    };
  },
  methods: {
    handleAnimation(anim) {
      this.defaultAnim = anim;
    },
    stop: function () {
      this.defaultAnim.stop();
    },
    play: function () {
      this.defaultAnim.play();
    },
    pause: function () {
      this.defaultAnim.pause();
    },
    onSpeedChange: function () {
      this.defaultAnim.setSpeed(this.animationSpeed);
    },
    directionChange: function () {
      let direction = 1;
      if (this.direction) {
        direction = -1;
      }
      this.defaultAnim.setDirection(direction);
    },
    goToAndStop: function () {
      this.defaultAnim.goToAndStop(this.goToAndStopFrame, true);
    },
    goToAndPlay: function () {
      this.defaultAnim.goToAndPlay(this.goToAndPlayFrame, true);
    },
    playRange: function () {
      this.defaultAnim.playSegments(this.range, true);
    },
    textChange: function () {
      this.defaultAnim.destroy();
      this.defaultOptions.animationData.assets[3].layers[0].t.d.k[0].s.t = this.input;
      this.$refs.lottie.animInit();
    },
  },
  mounted: function () {},
  created: function () {
    this.duration =
      (this.defaultOptions.animationData.op -
        this.defaultOptions.animationData.ip) /
      this.defaultOptions.animationData.fr;
  },
};
</script>
<style lang="less" scoped>
.options {
  float: left;
  width: 730px;
  height: 720px;
  background-color: pink;
  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 10px 0;
  }
}
  img{
    width: 600px;
    // height: 150px;
    // filter: url('#f1');
  }
</style>
