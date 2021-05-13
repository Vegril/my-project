<template>
  <div class="3D" id="3D">
    <h1>three.js</h1>
    <div class="config">
      <div class="mesh">
        <h2>模型设置</h2>
        <ul>
          <li>
            <span class="txt">模型几何体类型:</span>
            <el-select
              v-model="geometryoptions.geometryType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in geometryType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <span class="txt">模型几何体颜色:</span>
            <el-color-picker v-model="geometryoptions.color"></el-color-picker>
          </li>
          <li>
            <span class="txt">模型几何体材质类型:</span>
            <el-select v-model="geometryoptions.material" placeholder="请选择">
              <el-option
                v-for="item in materialType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <span class="txt">模型几何体位置X:</span>
            <el-slider
              style="width: 300px"
              :max="200"
              v-model="geometryoptions.meshPosition.x"
            ></el-slider>
          </li>
          <li>
            <span class="txt">模型几何体位置Y:</span>
            <el-slider
              style="width: 300px"
              :max="200"
              v-model="geometryoptions.meshPosition.y"
            ></el-slider>
          </li>
          <li>
            <span class="txt">模型几何体位置Z:</span>
            <el-slider
              style="width: 300px"
              :max="200"
              v-model="geometryoptions.meshPosition.z"
            ></el-slider>
          </li>
          <li>
            <span class="txt"
              >{{
                geometryoptions.transparent ? "关闭" : "开启"
              }}透明效果:</span
            >
            <el-switch v-model="geometryoptions.transparent"> </el-switch>
          </li>
          <li v-show="geometryoptions.transparent">
            <span class="txt">透明度:</span>
            <el-slider
              style="width: 300px"
              :max="1"
              :step="0.1"
              v-model="geometryoptions.opacity"
            ></el-slider>
          </li>
          <li>
            <span class="txt"
              >{{ geometryoptions.highLight ? "关闭" : "开启" }}高光效果:</span
            >
            <el-switch v-model="geometryoptions.highLight"> </el-switch>
          </li>
          <li>
            <span class="txt"
              >{{ geometryoptions.wireframe ? "关闭" : "开启" }}线框效果:</span
            >
            <el-switch v-model="geometryoptions.wireframe"> </el-switch>
          </li>
        </ul>
      </div>
      <div class="camera">
        <h2>光源设置</h2>
        <ul>
          <li>
            <span class="txt"
              >{{ openAmbientLight ? "关闭" : "开启" }}环境光:</span
            >
            <el-switch v-model="openAmbientLight"> </el-switch>
          </li>
          <li v-show="openAmbientLight">
            <span class="txt">环境光颜色:</span>
            <el-color-picker v-model="ambientLightColor"></el-color-picker>
          </li>
          <li>
            <span class="txt">{{ openLight ? "关闭" : "开启" }}光源:</span>
            <el-switch v-model="openLight"> </el-switch>
          </li>
          <li v-show="openLight">
            <span class="txt">光源类型:</span>
            <el-select v-model="lightType" placeholder="请选择">
              <el-option
                v-for="item in lighttypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>
          <li v-show="openLight">
            <span class="txt">光源颜色:</span>
            <el-color-picker v-model="lightColor"></el-color-picker>
          </li>
          <li v-show="openLight">
            <span class="txt">光源位置X:</span>
            <el-slider
              style="width: 300px"
              :max="500"
              v-model="lightPosition.x"
            ></el-slider>
          </li>
          <li v-show="openLight">
            <span class="txt">光源位置Y:</span>
            <el-slider
              style="width: 300px"
              :max="500"
              v-model="lightPosition.y"
            ></el-slider>
          </li>
          <li v-show="openLight">
            <span class="txt">光源位置Z:</span>
            <el-slider
              style="width: 300px"
              :max="500"
              v-model="lightPosition.z"
            ></el-slider>
          </li>
        </ul>
      </div>
      <div class="camera">
        <h2>相机设置</h2>
        <ul>
          <li>
            <span class="txt">相机类型:</span>
            <el-select v-model="cameraType" placeholder="请选择">
              <el-option
                v-for="item in cameraTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import * as THREE from "three";
import "three-orbitcontrols";
export default {
  data() {
    return {
      camera: null, //相机
      scene: null, //场景
      renderer: null,
      mesh: null, //网络模型
      light: null, //光源
      geometry: null, //几何体
      ambient: null, //环境光
      material: null, //材质
      pointLightHelper: null, //点光源辅助线
      directionalLightHelper: null, //平行光辅助线
      spotLightHelper: null, //聚光源辅助线
      controls: null,
      geometryType: [
        { value: 1, label: "长方体" },
        { value: 2, label: "球体" },
        { value: 3, label: "圆柱" },
        { value: 4, label: "正八面体" },
        { value: 5, label: "正十二面体" },
        { value: 6, label: "正二十面体" },
      ],
      materialType: [
        { value: 1, label: "基础网格材质" },
        { value: 2, label: "深度网格材质" },
        { value: 3, label: "Lambert网格材质" },
        { value: 4, label: "法线网格材质" },
        { value: 5, label: "Phong网格材质" },
        { value: 6, label: "物理网格材质" },
        { value: 7, label: "标准网格材质" },
        { value: 8, label: "卡通网格材质" },
      ],
      geometryoptions: {
        geometryType: 2,
        color: "#ffff00",
        material: 5,
        meshPosition: {
          x: 0,
          y: 0,
          z: 0,
        },
        transparent: false,
        opacity: 1,
        highLight: false,
        wireframe: false,
      },
      openAmbientLight: true,
      ambientLightColor: "#444444",
      openLight: true,
      lightType: 2,
      lightColor: "#fff",
      lighttypeList: [
        { value: 0, label: "点光源" },
        { value: 1, label: "平行光" },
        { value: 2, label: "聚光源" },
      ],
      lightPosition: {
        x: 200,
        y: 200,
        z: 200,
      },
      cameraType: 0,
      cameraTypeList: [
        { value: 0, label: "正投影相机" },
        { value: 1, label: "透视投影相机" },
      ],
    };
  },
  mounted: function () {
    // 第一步:创建场景对象
    this.scene = new THREE.Scene();
    // 第二部:创建网络模型
    // 创建一个球体几何对象Geometry
    // let geometry = new THREE.SphereGeometry(100,40,40)
    // 创建一个立方体几何对象Geometry
    this.geometry = this.createGeometry();
    this.material = this.setMaterial(); //材质对象Material
    this.mesh = new THREE.Mesh(this.geometry, this.material); //网格模型对象Mesh
    this.mesh.position.set(
      this.geometryoptions.meshPosition.x,
      this.geometryoptions.meshPosition.y,
      this.geometryoptions.meshPosition.z
    );
    this.scene.add(this.mesh); //网格模型添加到场景中

    /**
     * 光源设置
     */
    //环境光
    this.ambient = new THREE.AmbientLight(this.ambientLightColor);
    this.scene.add(this.ambient);
    //聚光源
    this.light = new THREE.SpotLight(0xffffff);
    this.light.position.set(
      this.lightPosition.x,
      this.lightPosition.y,
      this.lightPosition.z
    );
    this.light.target = this.mesh;
    this.scene.add(this.light);
    this.spotLightHelper = new THREE.SpotLightHelper(this.light);
    this.scene.add(this.spotLightHelper);

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(500);
    this.scene.add(axisHelper);

    /**
     * 相机设置
     */
    var width = window.innerWidth - 520; //窗口宽度
    var height = 720; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    this.camera.position.set(200, 300, 200); //设置相机位置
    this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height); //设置渲染区域尺寸
    this.renderer.setClearColor("#ccc", 1); //设置背景颜色
    document.getElementById("3D").appendChild(this.renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    this.renderScene();
    this.controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    ); //创建控件对象
    this.controls.addEventListener("change", this.renderScene); //监听鼠标、键盘事件
  },
  methods: {
    autoRotate() {
      this.renderScene();
      this.mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
      requestAnimationFrame(this.autoRotate);
    },
    renderScene() {
      this.renderer.render(this.scene, this.camera); //执行渲染操作
    },
    createGeometry() {
      switch (this.geometryoptions.geometryType) {
        case 1:
          return new THREE.BoxGeometry(100, 100, 100);
        case 2:
          return new THREE.SphereGeometry(60, 40, 40);
        case 3:
          return new THREE.CylinderGeometry(50, 50, 100, 25);
        case 4:
          return new THREE.OctahedronGeometry(50);
        case 5:
          return new THREE.DodecahedronGeometry(50);
        case 6:
          return new THREE.IcosahedronGeometry(50);
      }
    },
    setMaterial() {
      let options = {};
      options.color = this.geometryoptions.color;
      options.transparent = this.geometryoptions.transparent;
      options.opacity = this.geometryoptions.opacity;
      options.wireframe = this.geometryoptions.wireframe;
      if (this.geometryoptions.highLight) {
        options.specular = "#4488ee";
        options.shininess = 12;
      }
      console.log(options);
      switch (this.geometryoptions.material) {
        case 1:
          return new THREE.MeshBasicMaterial(options);
        case 2:
          return new THREE.MeshDepthMaterial(options);
        case 3:
          return new THREE.MeshLambertMaterial(options);
        case 4:
          return new THREE.MeshNormalMaterial(options);
        case 5:
          return new THREE.MeshPhongMaterial(options);
        case 6:
          return new THREE.MeshPhysicalMaterial(options);
        case 7:
          return new THREE.MeshStandardMaterial(options);
        case 8:
          return new THREE.MeshToonMaterial(options);
      }
    },
    setAmbient() {
      this.scene.remove(this.ambient);
      if (this.openAmbientLight) {
        //环境光
        this.ambient = new THREE.AmbientLight(this.ambientLightColor);
        this.scene.add(this.ambient);
      }
      this.renderScene();
    },
    setLight() {
      this.scene.remove(this.light);
      this.scene.remove(this.pointLightHelper);
      this.scene.remove(this.directionalLightHelper);
      this.scene.remove(this.spotLightHelper);
      if (this.openLight) {
        switch (this.lightType) {
          case 0:
            this.light = new THREE.PointLight(this.lightColor);
            this.light.position.set(
              this.lightPosition.x,
              this.lightPosition.y,
              this.lightPosition.z
            );
            this.scene.add(this.light);
            this.pointLightHelper = new THREE.PointLightHelper(
              this.light,
              50,
              0xff00ff
            );
            this.scene.add(this.pointLightHelper);
            break;
          case 1:
            this.light = new THREE.DirectionalLight(this.lightColor, 1);
            this.light.position.set(
              this.lightPosition.x,
              this.lightPosition.y,
              this.lightPosition.z
            );
            this.light.target = this.mesh;
            this.scene.add(this.light);
            this.directionalLightHelper = new THREE.DirectionalLightHelper(
              this.light,
              50,
              0xff0000
            );
            this.scene.add(this.directionalLightHelper);
            break;
          case 2:
            this.light = new THREE.SpotLight(this.lightColor);
            this.light.position.set(
              this.lightPosition.x,
              this.lightPosition.y,
              this.lightPosition.z
            );
            this.light.target = this.mesh;
            this.scene.add(this.light);
            this.spotLightHelper = new THREE.SpotLightHelper(this.light);
            this.scene.add(this.spotLightHelper);
            break;
        }
      }
      this.renderScene();
    },
    setCamera() {
      this.scene.remove(this.camera);
      var width = window.innerWidth - 520; //窗口宽度
      var height = 720; //窗口高度
      var k = width / height; //窗口宽高比
      var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
      switch (this.cameraType) {
        case 0:
          this.camera = new THREE.OrthographicCamera(
            -s * k,
            s * k,
            s,
            -s,
            1,
            1000
          );
          this.camera.position.set(200, 300, 200); //设置相机位置
          this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
          break;
        case 1:
          this.camera=new THREE.PerspectiveCamera(60, k, 1, 1000);
          break;
      }
      this.renderScene();
    },
  },
  watch: {
    geometryoptions: {
      handler(newVal, oldVal) {
        this.geometry.dispose();
        this.material.dispose();
        this.scene.remove(this.mesh);
        this.geometry = this.createGeometry();
        this.material = this.setMaterial();
        this.mesh = new THREE.Mesh(this.geometry, this.material); //网格模型对象Mesh
        this.mesh.position.set(
          this.geometryoptions.meshPosition.x,
          this.geometryoptions.meshPosition.y,
          this.geometryoptions.meshPosition.z
        );
        this.scene.add(this.mesh);
        this.renderScene();
      },
      deep: true,
    },
    openAmbientLight: function (newVal, oldVal) {
      this.setAmbient();
    },
    ambientLightColor: function (newVal, oldVal) {
      this.setAmbient();
    },
    openLight: function (newVal, oldVal) {
      this.setLight();
    },
    lightType: function (newVal, oldVal) {
      this.setLight();
    },
    lightColor: function (newVal, oldVal) {
      this.setLight();
    },
    cameraType: function (newVal, oldVal) {
      this.setCamera();
    },
    lightPosition: {
      handler(newVal, oldVal) {
        this.setLight();
      },
      deep: true,
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
      }
    }
  }
}
canvas {
  float: left;
}
</style>
