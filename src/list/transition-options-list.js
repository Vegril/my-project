import {
  cloneDeep
} from "lodash";
import {
  formItemConfig
} from "./form-item-config";

const setDefaultValue = function (defaultConfig, defaultValue) {
  const result = cloneDeep(defaultConfig);
  result.map((item, index) => {
    if (defaultValue[index]) {
      const {
        name,
        value,
        changeIndex
      } = defaultValue[index];
      if (changeIndex || changeIndex === 0) index = changeIndex;
      if (name) result[index].name = name;
      if (value || value === 0) result[index].value = value;
    }
  });
  return result;
}

export const glTransitionList = [{
    type: 20, //转场类型
    name: '下划',
    key: 'Directional',
    keyword: 'twist',
    options: {
      direction: {
        ...formItemConfig.direction,
        data: setDefaultValue(formItemConfig.direction.data, [{
          value: 0
        }])
      }
    },
  },
  {
    type: 21, //转场类型
    name: '抖动故障',
    key: 'GlitchMemories',
    keyword: 'twist',
    options: {},
  },
  {
    type: 22, //转场类型
    name: '圆点',
    key: 'PolkaDotsCurtain',
    keyword: 'twist',
    options: {
      dots: {
        ...formItemConfig.dots
      },
      center: {
        ...formItemConfig.center,
        data: setDefaultValue(formItemConfig.center.data, [{
          value: 0
        }, {
          value: 0
        }])
      }
    },
  },
  {
    type: 23, //转场类型
    name: '卡片切换',
    key: 'StereoViewer',
    keyword: 'twist',
    options: {
      corner_radius: {
        ...formItemConfig.corner_radius
      },
      zoom: {
        ...formItemConfig.zoom,
        max: 1,
        min: 0,
        step: 0.1,
        data: setDefaultValue(formItemConfig.zoom.data, [{
          value: 0.8
        }])
      },
    },
  },
  {
    type: 24, //转场类型
    name: '位移',
    key: 'displacement',
    keyword: 'twist',
    options: {
      displacementMap: {
        ...formItemConfig.displacementMap
      },
      strength: {
        ...formItemConfig.strength,
      },
    },
  },
  {
    type: 25, //转场类型
    name: '折叠门',
    key: 'Windowslice',
    keyword: 'twist',
    options: {
      count: {
        ...formItemConfig.count,
        max: 50,
        min: 0,
      },
      smoothness: {
        ...formItemConfig.smoothness,
        max: 1,
        min: 0,
        step: 0.1,
        data: setDefaultValue(formItemConfig.smoothness.data, [{
          value: 0.5
        }])
      },
    },
  },
  {
    type: 26, //转场类型
    name: '上下切换',
    key: 'BowTieVertical',
    keyword: 'twist',
    options: {},
  }, {
    type: 27, //转场类型
    name: '左右切换',
    key: 'BowTieHorizontal',
    keyword: 'twist',
    options: {},
  }, {
    type: 28, //转场类型
    name: '模糊放大',
    key: 'SimpleZoom',
    keyword: 'twist',
    options: {
      zoom_quickness: {
        ...formItemConfig.zoom_quickness
      },
    },
  }, {
    type: 29, //转场类型
    name: '交叉模糊',
    key: 'LinearBlur',
    keyword: 'twist',
    options: {
      intensity: {
        ...formItemConfig.intensity
      },
    },
  }, {
    type: 30, //转场类型
    name: '水滴',
    key: 'WaterDrop',
    keyword: 'twist',
    options: {
      amplitude: {
        ...formItemConfig.amplitude,
        max: 100,
        min: 0,
        step: 1,
        data: setDefaultValue(formItemConfig.amplitude.data, [{
          value: 30
        }])
      },
      speed: {
        ...formItemConfig.speed,
        max: 100,
      },
    },
  }, {
    type: 31, //转场类型
    name: '右上翻页',
    key: 'InvertedPageCurl',
    keyword: 'switch',
    options: {},
  },
  // 参数direction需要更改
  {
    type: 32, //转场类型
    name: '亮度融化',
    key: 'Luminance_melt',
    keyword: 'switch',
    options: {
      direction: {
        name: '方向',
        dataType: 'bool',
        componentType: 'switch',
        data: [{
          name: '反向',
          value: true,
        }]
      },
      l_threshold: {
        ...formItemConfig.l_threshold
      },
      above: {
        ...formItemConfig.above
      },
    },
  },
  {
    type: 33, //转场类型
    name: '颜色溶解',
    key: 'ColourDistance',
    keyword: 'switch',
    options: {
      power: {
        ...formItemConfig.power,
        data: setDefaultValue(formItemConfig.power.data, [{
          value: 5
        }])
      },
    },
  }, {
    type: 34, //转场类型
    name: '中心圆切换',
    key: 'CircleCrop',
    keyword: 'switch',
    options: {
      bgcolor: {
        ...formItemConfig.bgcolor
      },
    },
  }, {
    type: 35, //转场类型
    name: '漩涡',
    key: 'Swirl',
    keyword: 'switch',
    options: {},
  }, {
    type: 36, //转场类型
    name: '晕染',
    key: 'Perlin',
    keyword: 'switch',
    options: {
      scale: {
        ...formItemConfig.scale,
        max: 30,
        min: 0,
        step: 1,
        data: setDefaultValue(formItemConfig.scale.data, [{
          value: 4
        }])
      },
      smoothness: {
        ...formItemConfig.smoothness,
        max: 1,
        step: 0.1
      },
      seed: {
        ...formItemConfig.seed
      },
    },
  }, {
    type: 37, //转场类型
    name: '波浪',
    key: 'Directionalwarp',
    keyword: 'switch',
    options: {
      direction: {
        ...formItemConfig.direction
      },
    },
  }, {
    type: 38, //转场类型
    name: '下拉切换',
    key: 'Bounce',
    keyword: 'switch',
    options: {
      shadow_colour: {
        ...formItemConfig.shadow_colour
      },
      shadow_height: {
        ...formItemConfig.shadow_height
      },
      bounces: {
        ...formItemConfig.bounces
      },
    },
  }, {
    type: 39, //转场类型
    name: '向右切换',
    key: 'WipeRight',
    keyword: 'switch',
    options: {},
  }, {
    type: 40, //转场类型
    name: '向左切换',
    key: 'WipeLeft',
    keyword: 'switch',
    options: {},
  }, {
    type: 41, //转场类型
    name: '向下切换',
    key: 'WipeDown',
    keyword: 'switch',
    options: {},
  }, {
    type: 42, //转场类型
    name: '向上切换',
    key: 'WipeUp',
    keyword: 'switch',
    options: {},
  }, {
    type: 43, //转场类型
    name: '交叉溶解',
    key: 'morph',
    keyword: 'switch',
    options: {
      strength: {
        ...formItemConfig.strength,
        data: setDefaultValue(formItemConfig.strength.data, [{
          value: 0.1
        }])
      },
    },
  }, {
    type: 44, //转场类型
    name: '径向变焦',
    key: 'CrossZoom',
    keyword: 'switch',
    options: {
      strength: {
        ...formItemConfig.strength
      },
    },
  }, {
    type: 45, //转场类型
    name: '声波',
    key: 'CrazyParametricFun',
    keyword: 'switch',
    options: {
      a: {
        ...formItemConfig.a
      },
      b: {
        ...formItemConfig.b
      },
      amplitude: {
        ...formItemConfig.amplitude,
        max: 150,
        min: 0,
        step: 1,
        data: setDefaultValue(formItemConfig.amplitude.data, [{
          value: 120
        }])
      },
      smoothness: {
        ...formItemConfig.smoothness,
        max: 1,
        step: 0.1
      },
    },
  }, {
    type: 46, //转场类型
    name: '波形履带',
    key: 'ButterflyWaveScrawler',
    keyword: 'switch',
    options: {
      amplitude: {
        ...formItemConfig.amplitude,
        max:3,
        min:0,
      },
      waves: {
        ...formItemConfig.waves
      },
      colorSeparation: {
        ...formItemConfig.colorSeparation,
        max:1
      },
    },
  }, {
    type: 47, //转场类型
    name: '万花筒',
    key: 'kaleidoscope',
    keyword: 'switch',
    options: {
      speed: {
        ...formItemConfig.speed,
        max: 10,
        min: 0,
        step: 1,
        data: setDefaultValue(formItemConfig.speed.data, [{
          value: 1.0
        }])
      },
      angle: {
        ...formItemConfig.angle
      },
      power: {
        ...formItemConfig.power
      },
    },
  }, {
    type: 48, //转场类型
    name: '波形溶解',
    key: 'Dreamy',
    keyword: 'switch',
    options: {},
  }, {
    type: 49, //转场类型
    name: '网格翻转',
    key: 'GridFlip',
    keyword: 'switch',
    options: {
      size: {
        ...formItemConfig.count,
        dataType: "vec2",
        max: 30,
        min: 1,
        step: 1,
        data: [{
          name: '宽',
          value: 4,
        }, {
          name: '高',
          value: 4,
        }]
      },
      pause: {
        ...formItemConfig.pause
      },
      dividerWidth: {
        ...formItemConfig.dividerWidth
      },
      bgcolor: {
        ...formItemConfig.bgcolor
      },
      randomness: {
        ...formItemConfig.randomness
      },
    },
  }, {
    type: 50, //转场类型
    name: '放大圆',
    key: 'ZoominCircles',
    keyword: 'switch',
    options: {},
  }, {
    type: 51, //转场类型
    name: '径向檫除',
    key: 'Radial',
    keyword: 'dissolution',
    options: {
      smoothness: {
        ...formItemConfig.smoothness,
        max: 2,
        min: 0,
        step: 0.1,
        data: setDefaultValue(formItemConfig.smoothness.data, [{
          value: 1
        }])
      },
    },
  }, {
    type: 52, //转场类型
    name: '马赛克',
    key: 'Mosaic',
    keyword: 'dissolution',
    options: {
      endx: {
        ...formItemConfig.endx
      },
      endy: {
        ...formItemConfig.endy
      },
    },
  }, {
    type: 53, //转场类型
    name: '波纹燃烧',
    key: 'undulatingBurnOut',
    keyword: 'dissolution',
    options: {
      smoothness: {
        ...formItemConfig.smoothness,
        max: 1,
        min: 0,
        step: 0.1,
        data: setDefaultValue(formItemConfig.smoothness.data, [{
          value: 0.1
        }])
      },
      center: {
        ...formItemConfig.center
      },
      color: {
        ...formItemConfig.color
      },
    },
  }, {
    type: 54, //转场类型
    name: '交叉影线',
    key: 'crosshatch',
    keyword: 'dissolution',
    options: {
      center: {
        ...formItemConfig.center,
        min: -1
      },
      threshold: {
        ...formItemConfig.threshold
      },
      fadeEdge: {
        ...formItemConfig.fadeEdge
      },
    },
  }, {
    type: 55, //转场类型
    name: '信号差',
    key: 'windowblinds',
    keyword: 'dissolution',
    options: {},
  }, {
    type: 56, //转场类型
    name: '椭圆切换',
    key: 'circle',
    keyword: 'dissolution',
    options: {
      center: {
        ...formItemConfig.center,
        min:-1
      },
      backColor: {
        ...formItemConfig.backColor,
        dataType: 'vec3',
        data: [{
          name: '背景颜色',
          value: "rgb(26, 26, 26)"
        }]
      },
    },
  }, {
    type: 57, //转场类型
    name: '圈开',
    key: 'circleopen',
    keyword: 'dissolution',
    options: {
      smoothness: {
        ...formItemConfig.smoothness,
        max: 1,
        min: 0,
        step: 0.1,
        data: setDefaultValue(formItemConfig.smoothness.data, [{
          value: 0.3
        }])
      },
      opening: {
        ...formItemConfig.opening
      },
    },
  }, {
    type: 58, //转场类型
    name: '色相淡入',
    key: 'colorphase',
    keyword: 'dissolution',
    options: {
      fromStep: {
        ...formItemConfig.fromStep
      },
      toStep: {
        ...formItemConfig.toStep
      },
    },
  }, {
    type: 59, //转场类型
    name: '六边形',
    key: 'hexagonalize',
    keyword: 'dissolution',
    options: {
      steps: {
        ...formItemConfig.steps
      },
      horizontalHexagons: {
        ...formItemConfig.horizontalHexagons
      },
    },
  }, {
    type: 60, //转场类型
    name: '小故障',
    key: 'GlitchDisplace',
    keyword: 'dissolution',
    options: {},
  }, {
    type: 61, //转场类型
    name: '闪白变焦',
    key: 'Dreamyzoom',
    keyword: 'dissolution',
    options: {
      rotation: {
        ...formItemConfig.rotation
      },
      scale: {
        ...formItemConfig.scale,
        max: 3,
        min: 0,
        step: 0.1,
        data: setDefaultValue(formItemConfig.scale.data, [{
          value: 1.2
        }])
      },
    },
  }, {
    type: 62, //转场类型
    name: '向下掉落',
    key: 'DoomscreenTransition',
    keyword: 'dissolution',
    options: {
      bars: {
        ...formItemConfig.bars
      },
      amplitude: {
        ...formItemConfig.amplitude,
        max: 10,
        min: 0,
        step: 0.1,
        data: setDefaultValue(formItemConfig.amplitude.data, [{
          value: 2
        }])
      },
      noise: {
        ...formItemConfig.noise
      },
      frequency: {
        ...formItemConfig.frequency
      },
      dripScale: {
        ...formItemConfig.dripScale
      },
    },
  }, {
    type: 63, //转场类型
    name: '波纹',
    key: 'ripple',
    keyword: 'dissolution',
    options: {
      amplitude: {
        ...formItemConfig.amplitude,
        max: 200,
        min: 0,
        step: 1,
        data: setDefaultValue(formItemConfig.amplitude.data, [{
          value: 100
        }])
      },
      speed: {
        ...formItemConfig.speed,
        max:200,
      },
    },
  }, {
    type: 64, //转场类型
    name: '风车',
    key: 'pinwheel',
    keyword: 'dissolution',
    options: {
      speed: {
        ...formItemConfig.speed,
        max: 30,
        min: 0,
        step: 1,
        data: setDefaultValue(formItemConfig.speed.data, [{
          value: 2
        }])
      },
    },
  }, {
    type: 65, //转场类型
    name: '逆时针径向擦除',
    key: 'angular',
    keyword: 'dissolution',
    options: {
      startingAngle: {
        ...formItemConfig.startingAngle
      },
    },
  }, {
    type: 66, //转场类型
    name: '颜色淡入',
    key: 'burn',
    keyword: 'dissolution',
    options: {
      color: {
        ...formItemConfig.color,
        data: setDefaultValue(formItemConfig.color.data, [{
          value: "rgb(230, 102, 51)"
        }])
      },
    },
  }, {
    type: 67, //转场类型
    name: '交叉扭曲',
    key: 'crosswarp',
    keyword: 'dissolution',
    options: {},
  }, {
    type: 68, //转场类型
    name: '形状切换',
    key: 'luma',
    keyword: 'dissolution',
    options: {
      luma: {
        ...formItemConfig.luma
      },
    },
  }, {
    type: 69, //转场类型
    name: '多重混合',
    key: 'multiply_blend',
    keyword: 'dissolution',
    options: {},
  }, {
    type: 70, //转场类型
    name: '像素格',
    key: 'pixelize',
    keyword: 'shape',
    options: {
      squaresMin: {
        ...formItemConfig.squaresMin
      },
      steps: {
        ...formItemConfig.steps
      },
    },
  }, {
    type: 71, //转场类型
    name: '立方体旋转',
    key: 'cube',
    keyword: 'shape',
    options: {
      persp: {
        ...formItemConfig.persp
      },
      unzoom: {
        ...formItemConfig.unzoom
      },
      reflection: {
        ...formItemConfig.reflection
      },
      floating: {
        ...formItemConfig.floating
      },
    },
  }, {
    type: 72, //转场类型
    name: '定向擦除',
    key: 'directionalwipe',
    keyword: 'shape',
    options: {
      direction: {
        ...formItemConfig.direction
      },
      smoothness: {
        ...formItemConfig.smoothness,
        max: 2,
        min: 0,
        step: 0.1,
        data: setDefaultValue(formItemConfig.smoothness.data, [{
          value: 0.5
        }])
      },
    },
  }, {
    type: 73, //转场类型
    name: '双侧平推门',
    key: 'doorway',
    keyword: 'shape',
    options: {
      reflection: {
        ...formItemConfig.reflection,
        max: 1,
        min: 0,
        step: 0.1,
        data: setDefaultValue(formItemConfig.reflection.data, [{
          value: 0.4
        }])
      },
      perspective: {
        ...formItemConfig.perspective
      },
      depth: {
        ...formItemConfig.depth
      },
    },
  }, {
    type: 74, //转场类型
    name: '淡入',
    key: 'fade',
    keyword: 'shape',
    options: {},
  }, {
    type: 75, //转场类型
    name: '淡入淡出',
    key: 'fadecolor',
    keyword: 'shape',
    options: {
      color: {
        ...formItemConfig.color
      },
      colorPhase: {
        ...formItemConfig.colorPhase
      },
    },
  }, {
    type: 76, //转场类型
    name: '褪色交叉',
    key: 'fadegrayscale',
    keyword: 'shape',
    options: {
      intensity: {
        ...formItemConfig.intensity,
        max: 1,
        min: 0,
        step: 0.01,
        data: setDefaultValue(formItemConfig.intensity.data, [{
          value: 0.3
        }])
      },
    },
  }, {
    type: 77, //转场类型
    name: '玻璃',
    key: 'flyeye',
    keyword: 'shape',
    options: {
      size: {
        ...formItemConfig.size,
        max:5,
        min:0,
        step:0.1
      },
      zoom: {
        ...formItemConfig.zoom
      },
      colorSeparation: {
        ...formItemConfig.colorSeparation,
        max:1
      },
    },
  }, {
    type: 78, //转场类型
    name: '爱心擦除',
    key: 'heart',
    keyword: 'shape',
    options: {},
  }, {
    type: 79, //转场类型
    name: '波纹擦除',
    key: 'polar_function',
    keyword: 'shape',
    options: {
      segments: {
        ...formItemConfig.segments
      },
    },
  }, {
    type: 80, //转场类型
    name: '方格',
    key: 'randomsquares',
    keyword: 'shape',
    options: {
      size: {
        name: '数量',
        dataType: 'vec2',
        componentType: 'slider',
        max: 30,
        min: 1,
        step: 1,
        data: [{
          name: '行',
          value: 10,
        }, {
          name: '列',
          value: 10,
        }]
      },
      smoothness: {
        ...formItemConfig.smoothness,
        max: 1,
        min: 0,
        step: 0.1,
        data: setDefaultValue(formItemConfig.smoothness.data, [{
          value: 0.5
        }])
      },
    },
  }, {
    type: 81, //转场类型
    name: '放大旋转',
    key: 'rotate_scale_fade',
    keyword: 'shape',
    options: {
      center: {
        ...formItemConfig.center
      },
      rotations: {
        ...formItemConfig.rotations
      },
      scale: {
        ...formItemConfig.scale,
        min:0
      },
      backColor: {
        ...formItemConfig.backColor
      },
    },
  }, {
    type: 82, //转场类型
    name: '方格擦除',
    key: 'squareswire',
    keyword: 'shape',
    options: {
      squares: {
        ...formItemConfig.squares
      },
      direction: {
        ...formItemConfig.direction
      },
      smoothness: {
        ...formItemConfig.smoothness,
        max: 1,
        min: 0,
        step: 0.1,
        data: setDefaultValue(formItemConfig.smoothness.data, [{
          value: 0.8
        }])
      },
    },
  }, {
    type: 83, //转场类型
    name: '挤压',
    key: 'squeeze',
    keyword: 'shape',
    options: {
      colorSeparation: {
        ...formItemConfig.colorSeparation,
        max: 2,
        min: 0,
        step: 0.01,
        data: setDefaultValue(formItemConfig.colorSeparation.data, [{
          value: 0.1
        }])
      },
    },
  }, {
    type: 84, //转场类型
    name: '交换',
    key: 'swap',
    keyword: 'shape',
    options: {
      reflection: {
        ...formItemConfig.reflection
      },
      perspective: {
        ...formItemConfig.perspective,
        max:1,
        min:0,
        step:0.1,
        data: setDefaultValue(formItemConfig.perspective.data, [{
          value: 0.2
        }])
      },
      depth: {
        ...formItemConfig.depth
      },
    },
  }, {
    type: 85, //转场类型
    name: '风',
    key: 'wind',
    keyword: 'shape',
    options: {
      size: {
        ...formItemConfig.size,
        max: 1,
        min: 0,
        step: 0.1,
        data: setDefaultValue(formItemConfig.size.data, [{
          value: 0.2
        }])
      },
    },
  }
]