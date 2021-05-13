<template>
  <div class="filter">
    <h1>动画滤镜</h1>
    <canvas ref="canvas" width="1280" height="720"></canvas>
    <img v-show="false" src="../assets/images/1-3-1.png" ref="image" />
    <video
      autoplay
      loop
      muted
      v-show="false"
      src="../assets/video/filter.mp4"
      ref="video"
    ></video>
  </div>
</template>
<script>
export default {
  data() {
    return {
      width: 1280,
      height: 720,
      canvas: null,
      ctx: null,
      image: null,
      video: null,
    };
  },
  mounted: function () {
    this.image = this.$refs.image;
    this.video = this.$refs.video;
    this.canvas = this.$refs.canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    this.drawFilter();
    this.video.play();
  },
  methods: {
    drawFilter() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
      this.ctx.save();
      this.ctx.globalCompositeOperation = "screen";
      this.ctx.drawImage(this.video, 0, 0, this.width, this.height);
      this.ctx.restore();
      requestAnimationFrame(()=>{
        this.drawFilter();
      })
    },
  },
};
</script>
<style lang="less" scoped>
.filter {
}
</style>
