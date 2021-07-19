<template>
  <div class="3D" id="3D">
    <h1>glsl文件读取</h1>
    <div class="config">
      <div class="mesh">
        <h2>glsl文件读取</h2>
        <ul>
          <li>
            <span class="txt">上传glsl文件:</span>
            <el-upload
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
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    uploadFont(file) {
      console.log(file);
      this.readFile(file);
    },
    readFile(file) {
      this.fileToBlob(file.raw).then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log(e.target.result);
        };
        reader.readAsText(blob);
      });
    },
    fileToBlob(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const blob = new Blob([e.target.result]);
          resolve(blob);
        };
        reader.readAsArrayBuffer(file);
      });
    },
  },
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
