// 写法一
this.addEventListener('message', function (e) {
  let imageData = drawMatting(e.data.imageData, e.data.actionList);
  self.postMessage(imageData);
}, false);

/** 抠图
 * @method drawMatting
 * @param { imageData } imageData canvas getImageData方法返回的图片数据
 * @param { object } options 相关修改配置参数  colorType:抠图类型(1:绿幕抠图;2:蓝幕抠图) saturation:抠图饱和度范围 brightness:抠图亮度范围
 * @return {ImageData} 处理过后的imageData
 */
function drawMatting(imageData, options) {
  const {
    data,
    width,
    height
  } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue
    const HSV = rgbToHSV(data[i], data[i + 1], data[i + 2]);
    if (Math.abs(HSV.h - options.h) <= options.diff && HSV.s >= options.saturation && HSV.s < 255 && HSV.v >= options.brightness && HSV.v < 255) {
      const preData = [data[i - 4], data[i - 3], data[i - 2]] || [0, 0, 0];
      const preHSV = rgbToHSV(preData[0], preData[1], preData[2]);
      const nextData = [data[i + 4], data[i + 5], data[i + 6]] || [0, 0, 0];
      const nextHSV = rgbToHSV(nextData[0], nextData[1], nextData[2]);
      if ((Math.abs(preHSV.h - options.h) <= options.diff && preHSV.s >= options.saturation && preHSV.s < 255 && preHSV.v >= options.brightness && preHSV.v < 255) &&
        !(Math.abs(nextHSV.h - options.h) <= options.diff && nextHSV.s >= options.saturation && nextHSV.s < 255 && nextHSV.v >= options.brightness && nextHSV.v < 255)) {
        data[i] = 127;
        data[i + 1] = 127;
        data[i + 2] = 127;
        data[i + 3] = 255
      } else {
        data[i + 3] = 0
      }
    }
  }
  const imgData = deepClone(imageData);
  const r = 5;
  for (let w = 0; w < width; w++) {
    for (let h = 0; h < height; h++) {
      if (imgData.data[w * width * 4 + h * 4 + 3] === 0) continue;
      const alphaArr = getAlphaArr(imgData, w, h, 1);
      const sum = getAvg(alphaArr);
      data[w * width * 4 + h * 4 + 3] = sum / (r * 2 + 1);
    }

  }
  return imageData
}



// //纯色抠图
// function drawMatting(imageData, options) {
//   console.log(options);
//   const {
//     data
//   } = imageData;
//   for (let i = 0; i < data.length; i += 4) {
//     if(data[i]===options.r&&data[i+1]===options.g&&data[i+2]===options.b){
//       data[i+3]=0;
//     }
//   }
//   return imageData
// }

function getAvg(arr) {
  let sum = 0;
  arr.map(item => {
    sum += item;
  });
  return sum;
}

function getAlphaArr(imageData, w, h, r) {
  const {
    data,
    width
  } = imageData;
  const arr = [];
  for (let row = -r; row <= r; row++) {
    for (let col = -r; col <= r; col++) {
      arr.push(data[(w + row) * width * 4 + (h + col) * 4 + 3] || 0);
    }
  }
  return arr;
}

function rgbToHSV(r, g, b) {
  r = r / 255
  g = g / 255
  b = b / 255
  let h, s, v
  const min = Math.min(r, g, b)
  const max = v = Math.max(r, g, b)
  const l = (min + max) / 2
  const difference = max - min

  if (max == min) {
    h = 0
  } else {
    switch (max) {
      case r:
        h = (g - b) / difference + (g < b ? 6 : 0)
        break
      case g:
        h = 2.0 + (b - r) / difference
        break
      case b:
        h = 4.0 + (r - g) / difference
        break
    }
    h = h * 60
  }
  if (max == 0) {
    s = 0
  } else {
    s = 1 - min / max
  }
  s = s * 100 * 2.55
  v = v * 100 * 2.55
  return {
    h,
    s,
    v
  }
}

function deepClone(data) {
  var t = type(data),
    o, i, ni;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (i = 0, ni = data.length; i < ni; i++) {
      o.push(deepClone(data[i]));
    }
    return o;
  } else if (t === 'object') {
    for (i in data) {
      o[i] = deepClone(data[i]);
    }
    return o;
  }
}

function type(obj) {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}