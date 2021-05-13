const getImage=function(src){
  const image=new Image();
  image.src=src;
  return image;
}
export const formItemConfig = {
  direction: {
    name: '方向',
    dataType: 'vec2',
    componentType: 'slider',
    max: 1.0,
    min: -1.0,
    step: 1.0,
    data: [{
      name: 'X轴',
      value: 1.0,
    }, {
      name: 'Y轴',
      value: 1.0,
    }]
  },
  amplitude: {
    name: '振幅',
    dataType: 'float',
    componentType: 'slider',
    max: 2.0,
    min: 0.1,
    step: 0.1,
    data: [{
      name: '振幅',
      value: 1.0,
    }]
  },
  waves: {
    name: '波浪',
    dataType: 'float',
    componentType: 'slider',
    max: 50,
    min: 0,
    step: 1,
    data: [{
      name: '波浪',
      value: 30,
    }]
  },
  colorSeparation: {
    name: '颜色分离',
    dataType: 'float',
    componentType: 'slider',
    max: 0.6,
    min: 0,
    step: 0.1,
    data: [{
      name: '颜色分离',
      value: 0.3,
    }]
  },
  displacementMap: {
    name: '扭曲样式',
    dataType: 'sampler2D',
    componentType: 'selectImage',
    selectedType: 9,
    data: [{
      name: '扭曲样式',
      type: 1,
      image: getImage(require("../assets/images/twist-img/1.png")),
      src: require("../assets/images/twist-img/1.png")
    }, {
      name: '扭曲样式',
      type: 2,
      image: getImage(require("../assets/images/twist-img/2.png")),
      src: require("../assets/images/twist-img/2.png")
    }, {
      name: '扭曲样式',
      type: 3,
      image: getImage(require("../assets/images/twist-img/3.png")),
      src: require("../assets/images/twist-img/3.png")
    }, {
      name: '扭曲样式',
      type: 4,
      image: getImage(require("../assets/images/twist-img/4.png")),
      src: require("../assets/images/twist-img/4.png")
    }, {
      name: '扭曲样式',
      type: 5,
      image: getImage(require("../assets/images/twist-img/5.png")),
      src: require("../assets/images/twist-img/5.png")
    }, {
      name: '扭曲样式',
      type: 6,
      image: getImage(require("../assets/images/twist-img/6.png")),
      src: require("../assets/images/twist-img/6.png")
    }, {
      name: '扭曲样式',
      type: 7,
      image: getImage(require("../assets/images/twist-img/7.png")),
      src: require("../assets/images/twist-img/7.png")
    }, {
      name: '扭曲样式',
      type: 8,
      image: getImage(require("../assets/images/twist-img/8.png")),
      src: require("../assets/images/twist-img/8.png")
    }, {
      name: '扭曲样式',
      type: 9,
      image: getImage(require("../assets/images/twist-img/9.png")),
      src: require("../assets/images/twist-img/9.png")
    }, ]
  },
  strength: {
    name: '扭曲强度',
    dataType: 'float',
    componentType: 'slider',
    max: 1.0,
    min: 0,
    step: 0.1,
    data: [{
      name: '扭曲强度',
      value: 0.5,
    }]
  },
  speed: {
    name: '速度',
    dataType: 'float',
    componentType: 'slider',
    max: 60,
    min: 0,
    step: 1,
    data: [{
      name: '扭曲强度',
      value: 30,
    }]
  },
  a: {
    name: '数量',
    dataType: 'float',
    componentType: 'slider',
    max: 10,
    min: 0,
    step: 1,
    data: [{
      name: '数量',
      value: 4,
    }]
  },
  b: {
    name: '粗细',
    dataType: 'float',
    componentType: 'slider',
    max: 10,
    min: 0,
    step: 1,
    data: [{
      name: '粗细',
      value: 1,
    }]
  },
  smoothness: {
    name: '光滑度',
    dataType: 'float',
    componentType: 'slider',
    max: 0.2,
    min: 0,
    step: 0.01,
    data: [{
      name: '光滑度',
      value: 0.1,
    }]
  },
  angle: {
    name: '角度',
    dataType: 'float',
    componentType: 'slider',
    max: 2.0,
    min: 0,
    step: 0.1,
    data: [{
      name: '角度',
      value: 1.0,
    }]
  },
  power: {
    name: '强度',
    dataType: 'float',
    componentType: 'slider',
    max: 10,
    min: 0,
    step: 0.1,
    data: [{
      name: '强度',
      value: 1.5,
    }]
  },
  size: {
    name: '尺寸',
    dataType: 'float',
    componentType: 'slider',
    max: 0.08,
    min: 0,
    step: 0.01,
    data: [{
      name: '尺寸',
      value: 0.04,
    }]
  },
  zoom: {
    name: '缩放',
    dataType: 'float',
    componentType: 'slider',
    max: 100,
    min: 0,
    step: 1,
    data: [{
      name: '缩放',
      value: 50,
    }]
  },
  corner_radius: {
    name: '圆角半径',
    dataType: 'float',
    componentType: 'slider',
    max: 1,
    min: 0,
    step: 0.1,
    data: [{
      name: '圆角半径',
      value: 0.2,
    }]
  },
  shadow_colour: {
    name: '阴影颜色',
    dataType: 'vec4',
    componentType: 'colorPicker',
    data: [{
      name: '阴影颜色',
      value: "rgba(0, 0, 0, 153)"
    }]
  },
  shadow_height: {
    name: '阴影高度',
    dataType: 'float',
    componentType: 'slider',
    max: 1,
    min: 0,
    step: 0.1,
    data: [{
      name: '阴影高度',
      value: 0.1,
    }]
  },
  bounces: {
    name: '弹跳次数',
    dataType: 'float',
    componentType: 'slider',
    max: 10,
    min: 0,
    step: 1,
    data: [{
      name: '弹跳次数',
      value: 3,
    }]
  },
  center: {
    name: '中心点位置',
    dataType: 'vec2',
    componentType: 'slider',
    max: 1,
    min: 0,
    step: 0.1,
    data: [{
      name: '中心点x',
      value: 0.5,
    },{
      name: '中心点y',
      value: 0.5,
    }]
  },
  color: {
    name: '颜色',
    dataType: 'vec3',
    componentType: 'colorPicker',
    data: [{
      name: '颜色',
      value: "rgb(0, 0, 0)"
    }]
  },
  threshold: {
    name: '临界点',
    dataType: 'float',
    componentType: 'slider',
    max: 30,
    min: 0,
    step: 1,
    data: [{
      name: '临界点',
      value: 3,
    }]
  },
  fadeEdge: {
    name: '光滑度',
    dataType: 'float',
    componentType: 'slider',
    max: 1,
    min: 0,
    step: 0.1,
    data: [{
      name: '光滑度',
      value: 0.1,
    }]
  },
  bars: {
    name: '数量',
    dataType: 'int',
    componentType: 'slider',
    max: 50,
    min: 0,
    step: 1,
    data: [{
      name: '数量',
      value: 30,
    }]
  },
  noise: {
    name: '噪音',
    dataType: 'float',
    componentType: 'slider',
    max: 1,
    min: 0,
    step: 0.1,
    data: [{
      name: '噪音',
      value: 0.1,
    }]
  },
  frequency: {
    name: '频率',
    dataType: 'float',
    componentType: 'slider',
    max: 2,
    min: 0,
    step: 0.1,
    data: [{
      name: '频率',
      value: 0.5,
    }]
  },
  dripScale: {
    name: '消失点',
    dataType: 'float',
    componentType: 'slider',
    max: 5,
    min: 0,
    step: 0.1,
    data: [{
      name: '消失点',
      value: 0.5,
    }]
  },
  startingAngle: {
    name: '起始角度',
    dataType: 'float',
    componentType: 'slider',
    max: 360,
    min: 0,
    step: 1,
    data: [{
      name: '起始角度',
      value: 90,
    }]
  },
  luma: {
    name: '选择形状',
    dataType: 'sampler2D',
    componentType: 'selectImage',
    selectedType: 9,
    data: [{
      name: '选择形状',
      type: 1,
      image: getImage(require("../assets/images/twist-img/1.png")),
      src: require("../assets/images/twist-img/1.png")
    }, {
      name: '选择形状',
      type: 2,
      image: getImage(require("../assets/images/twist-img/2.png")),
      src: require("../assets/images/twist-img/2.png")
    }, {
      name: '选择形状',
      type: 3,
      image: getImage(require("../assets/images/twist-img/3.png")),
      src: require("../assets/images/twist-img/3.png")
    }, {
      name: '选择形状',
      type: 4,
      image: getImage(require("../assets/images/twist-img/4.png")),
      src: require("../assets/images/twist-img/4.png")
    }, {
      name: '选择形状',
      type: 5,
      image: getImage(require("../assets/images/twist-img/5.png")),
      src: require("../assets/images/twist-img/5.png")
    }, {
      name: '选择形状',
      type: 6,
      image: getImage(require("../assets/images/twist-img/6.png")),
      src: require("../assets/images/twist-img/6.png")
    }, {
      name: '选择形状',
      type: 7,
      image: getImage(require("../assets/images/twist-img/7.png")),
      src: require("../assets/images/twist-img/7.png")
    }, {
      name: '选择形状',
      type: 8,
      image: getImage(require("../assets/images/twist-img/8.png")),
      src: require("../assets/images/twist-img/8.png")
    }, {
      name: '选择形状',
      type: 9,
      image: getImage(require("../assets/images/twist-img/9.png")),
      src: require("../assets/images/twist-img/9.png")
    }, ]
  },
  persp: {
    name: '透视',
    dataType: 'float',
    componentType: 'slider',
    max: 1,
    min: 0,
    step: 0.1,
    data: [{
      name: '透视',
      value: 0.7,
    }]
  },
  unzoom: {
    name: '缩放',
    dataType: 'float',
    componentType: 'slider',
    max: 10,
    min: -10,
    step: 0.1,
    data: [{
      name: '缩放',
      value: 0.3,
    }]
  },
  reflection: {
    name: '投影',
    dataType: 'float',
    componentType: 'slider',
    max: 1,
    min: 0,
    step: 0.1,
    data: [{
      name: '投影',
      value: 0.3,
    }]
  },
  floating: {
    name: '投影距离',
    dataType: 'float',
    componentType: 'slider',
    max: 20,
    min: 0,
    step: 1,
    data: [{
      name: '投影距离',
      value: 3.0,
    }]
  },
  perspective: {
    name: '压缩',
    dataType: 'float',
    componentType: 'slider',
    max: 10,
    min: -10,
    step: 0.1,
    data: [{
      name: '压缩',
      value: 0.4,
    }]
  },
  depth: {
    name: '深度',
    dataType: 'float',
    componentType: 'slider',
    max: 10,
    min: 0,
    step: 0.1,
    data: [{
      name: '深度',
      value: 3,
    }]
  },
  rotations: {
    name: '旋转角度',
    dataType: 'float',
    componentType: 'slider',
    max: 1,
    min: -1,
    step: 0.1,
    data: [{
      name: '旋转角度',
      value: 1,
    }]
  },
  scale: {
    name: '大小',
    dataType: 'float',
    componentType: 'slider',
    max: 10,
    min: 6,
    step: 0.1,
    data: [{
      name: '大小',
      value: 8,
    }]
  },
  backColor: {
    name: '背景颜色',
    dataType: 'vec4',
    componentType: 'colorPicker',
    data: [{
      name: '背景颜色',
      value: "rgba(38, 38, 38, 255)"
    }]
  },
  zoom_quickness: {
    name: '速度',
    dataType: 'float',
    componentType: 'slider',
    max: 1.0,
    min: 0,
    step: 0.1,
    data: [{
      name: '速度',
      value: 0.8,
    }]
  },
  intensity: {
    name: '强度',
    dataType: 'float',
    componentType: 'slider',
    max: 1,
    min: 0,
    step: 0.1,
    data: [{
      name: '速度',
      value: 0.1,
    }]
  },
  l_threshold: {
    name: '阈值',
    dataType: 'float',
    componentType: 'slider',
    max: 5,
    min: 0,
    step: 0.1,
    data: [{
      name: '阈值',
      value: 0.8,
    }]
  },
  above: {
    name: '亮度混合',
    dataType: 'bool',
    componentType: 'switch',
    data: [{
      name: '亮度混合',
      value: false,
    }]
  },
  seed: {
    name: '规律',
    dataType: 'float',
    componentType: 'slider',
    max: 100,
    min: 0,
    step: 1,
    data: [{
      name: '规律',
      value: 13,
    }]
  },
  fromStep: {
    name: '从...',
    dataType: 'vec4',
    componentType: 'slider',
    max: 1,
    min: 0,
    step: 0.1,
    data: [{
      name: 'x',
      value: 0,
    },{
      name: 'y',
      value: 0.2,
    },{
      name: 'z',
      value: 0.4,
    },{
      name: 'w',
      value: 1,
    }]
  },
  toStep: {
    name: '到...',
    dataType: 'vec4',
    componentType: 'slider',
    max: 1,
    min: 0,
    step: 0.1,
    data: [{
      name: 'x',
      value: 0.6,
    },{
      name: 'y',
      value: 0.8,
    },{
      name: 'z',
      value: 1,
    },{
      name: 'w',
      value: 1,
    }]
  },
  rotation: {
    name: '旋转角度',
    dataType: 'float',
    componentType: 'slider',
    max: 100,
    min: 0,
    step: 1,
    data: [{
      name: '旋转角度',
      value: 6,
    }]
  },
  squaresMin: {
    name: '大小',
    dataType: 'vec2',
    componentType: 'slider',
    max: 40,
    min: 1,
    step: 1,
    data: [{
      name: '宽度',
      value: 20,
    },{
      name: '高度',
      value: 20,
    }]
  },
  steps: {
    name: '速度',
    dataType: 'int',
    componentType: 'slider',
    max: 100,
    min: 0,
    step: 1,
    data: [{
      name: '速度',
      value: 50,
    }]
  },
  colorPhase: {
    name: '色相',
    dataType: 'float',
    componentType: 'slider',
    max: 2,
    min: 0,
    step: 0.1,
    data: [{
      name: '色相',
      value: 0.4,
    }]
  },
  dots: {
    name: '点的数量',
    dataType: 'float',
    componentType: 'slider',
    max: 50,
    min: 0,
    step: 1,
    data: [{
      name: '数量',
      value: 20,
    }]
  },
  count: {
    name: '数量',
    dataType: 'float',
    componentType: 'slider',
    max: 20,
    min: 1,
    step: 1,
    data: [{
      name: '数量',
      value: 10,
    }]
  },
  bgcolor: {
    name: '背景颜色',
    dataType: 'vec4',
    componentType: 'colorPicker',
    data: [{
      name: '背景颜色',
      value: "rgba(0, 0, 0, 255)"
    }]
  },
  pause: {
    name: '翻转数量',
    dataType: 'float',
    componentType: 'slider',
    max: 1,
    min: 0,
    step: 0.1,
    data: [{
      name: '翻转数量',
      value: 0.1,
    }]
  },
  dividerWidth: {
    name: '分频器宽度',
    dataType: 'float',
    componentType: 'slider',
    max: 0.35,
    min: 0,
    step: 0.05,
    data: [{
      name: '分频器宽度',
      value: 0.05,
    }]
  },
  randomness: {
    name: '随机性',
    dataType: 'float',
    componentType: 'slider',
    max: 1,
    min: 0,
    step: 0.1,
    data: [{
      name: '随机性',
      value: 0.1,
    }]
  },
  endx: {
    name: '位移起点',
    dataType: 'int',
    componentType: 'slider',
    max: 10,
    min: -10,
    step: 0.1,
    data: [{
      name: '位移起点',
      value: 2,
    }]
  },
  endy: {
    name: '位移终点',
    dataType: 'int',
    componentType: 'slider',
    max: 10,
    min: -10,
    step: 0.1,
    data: [{
      name: '位移终点',
      value: -1,
    }]
  },
  opening: {
    name: '反向',
    dataType: 'bool',
    componentType: 'switch',
    data: [{
      name: '反向',
      value: true
    }]
  },
  horizontalHexagons: {
    name: '水平六边形',
    dataType: 'int',
    componentType: 'slider',
    max: 30,
    min: 0,
    step: 1,
    data: [{
      name: '水平六边形',
      value: 20,
    }]
  },
  segments: {
    name: '波纹数量',
    dataType: 'int',
    componentType: 'slider',
    max: 30,
    min: 0,
    step: 1,
    data: [{
      name: '波纹数量',
      value: 5,
    }]
  },
  squares: {
    name: '方格大小',
    dataType: 'vec2',
    componentType: 'slider',
    max: 20,
    min: 0,
    step: 1,
    data: [{
      name: '宽度',
      value: 10,
    },{
      name: '高度',
      value: 10,
    }]
  },
}