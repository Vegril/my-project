import {
  random
} from "lodash";
const randomBlockOptions = {
  row: 15,
  col: 20,
  randomBlockOrder: [144, 193, 89, 23, 138, 139, 292, 282, 115, 47, 8, 291, 155, 219, 284, 257, 210, 32, 234, 164, 214, 267, 73, 146, 175, 243, 148, 203, 245, 182, 53, 224, 41, 261, 9, 276, 11, 48, 57, 0, 215, 231, 140, 168, 129, 153, 88, 192, 275, 212, 29, 207, 130, 75, 217, 58, 18, 150, 221, 3, 51, 82, 167, 213, 290, 277, 211, 67, 1, 294, 209, 81, 110, 80, 274, 46, 121, 220, 22, 111, 278, 97, 60, 28, 96, 264, 238, 54, 103, 197, 6, 74, 178, 160, 259, 100, 258, 30, 56, 76, 239, 21, 177, 44, 20, 173, 190, 156, 281, 5, 7, 72, 237, 285, 262, 229, 171, 17, 101, 242, 298, 62, 205, 34, 123, 268, 104, 99, 157, 119, 77, 250, 254, 253, 127, 35, 102, 235, 283, 297, 195, 170, 181, 118, 68, 31, 299, 296, 98, 49, 176, 240, 196, 10, 191, 198, 161, 194, 43, 255, 108, 189, 38, 179, 55, 187, 149, 188, 27, 265, 271, 125, 71, 289, 158, 136, 260, 132, 280, 166, 112, 223, 174, 120, 87, 91, 186, 286, 222, 50, 122, 154, 126, 241, 42, 152, 172, 233, 247, 270, 159, 266, 200, 201, 143, 218, 180, 116, 79, 165, 33, 246, 202, 16, 39, 2, 169, 236, 232, 84, 13, 106, 69, 252, 137, 208, 147, 4, 134, 135, 66, 105, 52, 269, 25, 15, 248, 92, 279, 90, 226, 113, 263, 61, 272, 45, 70, 14, 141, 256, 244, 206, 163, 185, 114, 199, 86, 19, 225, 36, 183, 133, 228, 107, 59, 249, 24, 204, 216, 230, 293, 26, 95, 162, 78, 37, 12, 288, 287, 64, 273, 131, 109, 124, 142, 145, 128, 227, 85, 151, 63, 93, 251, 295, 40, 94, 65, 184, 117, 83],
};
// getRandomBlock();
/**绘制转场
 * @method drawTransition
 * @param {Object} outCanvas:出场背景图(canvas或img)
 * @param {Object} openCanvas:进场背景图(canvas或img)
 * @param {Number} scale:进场进度(0~1);
 * @param {Number} width:需要生成的转场canvas的宽度
 * @param {Number} height:需要生成的转场canvas的高度
 * @param {Number} type:转场类型
 * @return 生成的OffscreenCanvas
 */
function drawTransition(outCanvas, openCanvas, scale, width, height, type) {
  switch (type) {
    case 1: // 旋转
      return drawRotate(outCanvas, openCanvas, scale, width, height);
    case 2: // 缩放
      return drawScale(outCanvas, openCanvas, scale, width, height);
    case 3: // 划入
      return drawSlide(outCanvas, openCanvas, scale, width, height);
    case 4: // 淡入
      return drawFade(outCanvas, openCanvas, scale, width, height);
    case 5: // 百叶窗
      return drawWindowShades(outCanvas, openCanvas, scale, width, height);
    case 7: // 镜头拉近
      return drawZoom(outCanvas, openCanvas, scale, width, height);
    case 8: // 下拉替换
      return drawDropDown(outCanvas, openCanvas, scale, width, height);
    case 9: // 螺旋替换
      return drawScrew(outCanvas, openCanvas, scale, width, height);
    case 15: // 翻页
      return drawPageDown(outCanvas, openCanvas, scale, width, height);
    case 17: // 伸展
      return drawStretch(outCanvas, openCanvas, scale, width, height);
    case 18: // 随机块
      return drawRandomBlock(outCanvas, openCanvas, scale, width, height);
    case 19: // 随机块
      return drawCenterPull(outCanvas, openCanvas, scale, width, height);
    default:
      break;
  }
}
/**绘制旋转转场
 * @method drawRotate
 * @param {*} 同上
 */
function drawRotate(outCanvas, openCanvas, scale, width, height) {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(outCanvas, 0, 0, width, height);
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(width / 2, height / 2);
  ctx.lineTo(width / 2, height / 2 - 1000);
  ctx.arc(
    width / 2,
    height / 2,
    1000,
    -Math.PI / 2,
    -Math.PI / 2 + Math.PI * 2 * scale
  );
  ctx.lineTo(width / 2, height / 2);
  ctx.clip();
  ctx.drawImage(openCanvas, 0, 0, width, height);
  ctx.restore();
  return canvas;
}
/**绘制缩放转场
 * @method drawScale
 * @param {*} 同上
 */
function drawScale(outCanvas, openCanvas, scale, width, height) {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const radius = Math.sqrt(
    width * width + height * height
  ); //半径
  ctx.drawImage(outCanvas, 0, 0, width, height);
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(
    width / 2,
    height / 2,
    (1 - scale) * radius,
    (1 - scale) * radius,
    Math.PI * 2,
    0,
    Math.PI * 2
  );
  ctx.moveTo(0, 0);
  ctx.lineTo(0, height);
  ctx.lineTo(width, height);
  ctx.lineTo(width, 0);
  ctx.lineTo(0, 0);
  ctx.clip();
  ctx.drawImage(openCanvas, 0, 0, width, height);
  ctx.restore();
  return canvas;
}
/**绘制划入转场
 * @method drawSlide
 * @param {*} 同上
 */
function drawSlide(outCanvas, openCanvas, scale, width, height) {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const transitionWidth = scale * width;
  ctx.drawImage(outCanvas, 0, 0, width, height);
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(transitionWidth, 0);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, height);
  ctx.lineTo(transitionWidth, height);
  ctx.lineTo(transitionWidth, 0);
  ctx.clip();
  ctx.drawImage(openCanvas, 0, 0, width, height);
  ctx.restore();
  return canvas;
}
/**绘制淡入转场
 * @method drawFade
 * @param {*} 同上
 */
function drawFade(outCanvas, openCanvas, scale, width, height) {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(outCanvas, 0, 0, width, height);
  ctx.save();
  ctx.globalAlpha = scale;
  ctx.drawImage(openCanvas, 0, 0, width, height);
  ctx.restore();
  return canvas;
}
/**绘制百叶窗转场
 * @method drawWindowShades
 * @param {*} 同上
 */
function drawWindowShades(outCanvas, openCanvas, scale, width, height) {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(outCanvas, 0, 0, width, height);
  ctx.save();
  const transitionHeight = height / 8;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    ctx.moveTo(0, 0 + i * transitionHeight);
    ctx.lineTo(width, 0 + i * transitionHeight);
    ctx.lineTo(width, scale * transitionHeight + i * transitionHeight);
    ctx.lineTo(0, scale * transitionHeight + i * transitionHeight);
    ctx.lineTo(0, 0 + i * transitionHeight);
  }
  ctx.clip();
  ctx.drawImage(openCanvas, 0, 0, width, height);
  ctx.restore();
  return canvas;
}
/**绘制镜头拉近转场
 * @method drawZoom
 * @param {*} 同上
 */
function drawZoom(outCanvas, openCanvas, scale, width, height) {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const multiple = 30;
  ctx.save();
  if (scale <= 0.5) {
    ctx.translate(
      (-(width * scale) * (multiple - 1)) / 2,
      (-(height * scale) * (multiple - 1)) / 2
    );
    ctx.scale(1 + scale * (multiple - 1), 1 + scale * (multiple - 1));
    ctx.drawImage(outCanvas, 0, 0, width, height);
  } else {
    ctx.translate(
      -((width * (1 - scale) * (multiple - 1)) / 2),
      -((height * (1 - scale) * (multiple - 1)) / 2)
    );
    ctx.scale(
      multiple - scale * (multiple - 1),
      multiple - scale * (multiple - 1)
    );
    ctx.drawImage(openCanvas, 0, 0, width, height);
  }
  ctx.restore();
  return canvas;
}
/**绘制下拉替换转场
 * @method drawDropDown
 * @param {*} 同上
 */
function drawDropDown(outCanvas, openCanvas, scale, width, height) {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  let sourceImage = outCanvas;
  let devHeight;
  if (scale >= 0.5) sourceImage = openCanvas;
  ctx.save();
  if (scale <= 0.5) {
    devHeight = easeInBounce(scale * 2) * height;
  } else {
    devHeight = -(1 - easeOutBounce((scale - 0.5) * 2)) * height;
  }
  ctx.translate(0, devHeight);
  if (scale <= 0.1 || scale >= 0.9) {
    ctx.drawImage(sourceImage, 0, 0, width, height);
  } else {
    const deviation = 0.5 - Math.abs(0.5 - scale) * 5;
    for (let i = 0; i < 31; i++) {
      const y = (-30 + i * 2) * deviation;
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.translate(0, y);
      ctx.drawImage(sourceImage, 0, 0, width, height);
      ctx.restore();
    }
  }
  ctx.restore();
  return canvas;
}
/**绘制螺旋转换转场
 * @method drawScrew
 * @param {*} 同上
 */
function drawScrew(outCanvas, openCanvas, scale, width, height) {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.save();
  const value = easeInOutElastic(scale);
  const deg = value * 2 * Math.PI;
  ctx.translate(width / 2, height / 2);
  ctx.rotate(deg);
  ctx.translate(-width / 2, -height / 2);
  if (scale <= 0.25) {
    ctx.drawImage(outCanvas, 0, 0, width, height);
  } else if (scale <= 0.75) {
    let overlayCanvas;
    if (scale <= 0.5) {
      overlayCanvas = drawOverlayFrame(outCanvas, width, height);
    } else {
      overlayCanvas = drawOverlayFrame(openCanvas, width, height);
    }
    const dev = Math.abs(0.5 - value) * 2;
    const interFrame = new OffscreenCanvas(
      overlayCanvas.width,
      overlayCanvas.height
    );
    const frameCtx = interFrame.getContext("2d");
    frameCtx.translate(
      ((1 - dev) * overlayCanvas.width) / 2,
      ((1 - dev) * overlayCanvas.height) / 2
    );
    frameCtx.scale(dev, dev);
    frameCtx.drawImage(
      overlayCanvas,
      0,
      0,
      overlayCanvas.width,
      overlayCanvas.height
    );
    ctx.drawImage(
      interFrame,
      (width - overlayCanvas.width) / 2,
      (height - overlayCanvas.height) / 2,
      overlayCanvas.width,
      overlayCanvas.height
    );
  } else {
    ctx.drawImage(openCanvas, 0, 0, width, height);
  }
  ctx.restore();
  return canvas;
}
/**绘制翻页转场
 * @method drawPageDown
 * @param {*} 同上
 */
function drawPageDown(outCanvas, openCanvas, scale, width, height) {
  const length = width + height;
  //创建一个canvas,用以返回最终结果
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(openCanvas, 0, 0, width, height);
  //绘制翻页效果使用到clip,故此处先保存状态
  ctx.save();
  //获取翻页竖直翻转帧
  const verticalCanvas = drawVertical(outCanvas, width, height);
  //抠掉指定区域
  ctx.beginPath();
  ctx.moveTo(length * scale, 0);
  ctx.lineTo(length, 0);
  ctx.lineTo(length, length);
  ctx.lineTo(0, length);
  ctx.lineTo(0, length * scale);
  ctx.lineTo(length * scale, 0);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(outCanvas, 0, 0, width, height);
  ctx.drawImage(verticalCanvas, length * scale - height, length * scale - width, height, width);
  ctx.restore();
  return canvas;
}

/**绘制伸展转场
 * @method drawStretch
 * @param {*} 同上
 */
function drawStretch(outCanvas, openCanvas, scale, width, height) {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const zoomMultiple = 3;
  ctx.save();
  if (scale < 0.5) {
    ctx.translate(-width * (zoomMultiple - 1) * scale, 0);
    ctx.scale(1 + (zoomMultiple - 1) * scale * 2, 1);
    ctx.drawImage(outCanvas, 0, 0, width, height);
  } else {
    ctx.translate(-width * (zoomMultiple - 1) * (1 - scale) / 2, 0);
    ctx.scale(1 + (zoomMultiple - 1) * (1 - scale), 1);
    ctx.drawImage(openCanvas, 0, 0, width, height);
  }
  ctx.restore();
  return canvas;
}
//获取随机块随机顺序
function getRandomBlock() {
  const total = randomBlockOptions.row * randomBlockOptions.col;
  const arr = [];
  for (let i = 0; i < total; i++) {
    arr.push(i);
  }
  for (let i = 0; i < total; i++) {
    const index = random(0, arr.length - 1);
    randomBlockOptions.randomBlockOrder.push(arr[index]);
    arr.splice(index, 1);
  }
}

/**绘制随机块转场
 * @method drawRandomBlock
 * @param {*} 同上
 */
function drawRandomBlock(outCanvas, openCanvas, scale, width, height) {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const blocksNum = Math.floor(randomBlockOptions.randomBlockOrder.length * scale);
  const unitWidth = width / randomBlockOptions.col;
  const unitHeight = height / randomBlockOptions.row;
  ctx.drawImage(outCanvas, 0, 0, width, height);
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < blocksNum; i++) {
    const startPointX = randomBlockOptions.randomBlockOrder[i] % randomBlockOptions.col * unitWidth;
    const startPointY = Math.floor(randomBlockOptions.randomBlockOrder[i] / randomBlockOptions.col) * unitHeight;
    ctx.moveTo(startPointX, startPointY);
    ctx.lineTo(startPointX + unitWidth, startPointY);
    ctx.lineTo(startPointX + unitWidth, startPointY + unitHeight);
    ctx.lineTo(startPointX, startPointY + unitHeight);
    ctx.lineTo(startPointX, startPointY);
  }
  ctx.closePath()
  ctx.clip();
  ctx.drawImage(openCanvas, 0, 0, width, height);
  ctx.restore();
  return canvas;
}

/**绘制中心拉动转场
 * @method drawCenterPull
 * @param {*} 同上
 */
 function drawCenterPull(outCanvas, openCanvas, scale, width, height) {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.save();
  if (scale <= 0.5) {
    const multiple = 30*easeInBounce(scale*2);
    ctx.translate(
      (-(width * scale) * (multiple - 1)) / 2,
      (-(height * scale) * (multiple - 1)) / 2
    );
    ctx.scale(1 + scale * (multiple - 1), 1 + scale * (multiple - 1));
    ctx.drawImage(outCanvas, 0, 0, width, height);
  } else {
    const multiple = 30*easeOutBounce(1-(scale-0.5)*2);
    ctx.translate(
      -((width * (1 - scale) * (multiple - 1)) / 2),
      -((height * (1 - scale) * (multiple - 1)) / 2)
    );
    ctx.scale(
      multiple - scale * (multiple - 1),
      multiple - scale * (multiple - 1)
    );
    ctx.drawImage(openCanvas, 0, 0, width, height);
  }
  ctx.restore();
  return canvas;
}

/**绘制叠图
 * @method drawOverlayFrame
 * @param {Object} image 需要叠图的图片
 */
function drawOverlayFrame(image, width, height) {
  const num = 90;
  const length = Math.sqrt(
    width * width + height * height
  );
  const tempCanvas = new OffscreenCanvas(length, length);
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.globalAlpha = 0.05;
  for (let i = num; i > 0; i--) {
    tempCtx.save();
    tempCtx.translate(length / 2, length / 2);
    tempCtx.rotate(((i * 2) / 180) * Math.PI);
    tempCtx.translate(-width / 2, -height / 2);
    tempCtx.drawImage(image, 0, 0, width, height);
    tempCtx.restore();
  }
  return tempCanvas;
}

function drawVertical(image, width, height) {
  const temp = height;
  height = width;
  width = temp;
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const tempCanvas = new OffscreenCanvas(width, height);
  const context = tempCanvas.getContext("2d");
  context.save();
  context.translate(width / 2, height / 2);
  context.rotate(-Math.PI / 2);
  context.translate(-width / 2, -height / 2);
  context.drawImage(image, (width - height) / 2, (height - width) / 2, height, width);
  context.restore();
  ctx.save();
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(tempCanvas, 0, 0, width, height);
  ctx.restore();
  return canvas;
}

/**
 * 自由落体缓动函数
 * @param {Number} x 进度
 * @returns 当前进度x下的值
 */

function easeOutBounce(x) {
  if (x < 0.6) {
    return 2.78 * x * x;
  } else {
    x = (x - 0.6) * 2.5;
    return (4 * x * x - 4 * x + 1) / 8 + 0.875;
  }
}

function easeInBounce(x) {
  return 1 - easeOutBounce(1 - x);
}

function easeInOutElastic(x) {
  if (x < 0.25) {
    x *= 1.8
  } else if (x < 0.75) {
    x = 0.45 + (x - 0.25) / 0.5 * 0.1
  } else {
    x = 0.55 + (x - 0.75) / 0.25 * 0.45
  }
  const c5 = (2 * Math.PI) / 4.5;
  return x === 0 ?
    0 :
    x === 1 ?
    1 :
    x < 0.5 ?
    -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2 :
    (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}

function easeInElastic(x) {
  const c4 = (2 * Math.PI) / 3;

  return x === 0 ?
    0 :
    x === 1 ?
    1 :
    -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
}

function easeOutElastic(x) {
  const c4 = (2 * Math.PI) / 3;

  return x === 0 ?
    0 :
    x === 1 ?
    1 :
    Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

export {
  drawTransition,
  drawRotate,
  drawScale,
  drawSlide,
  drawFade,
  drawWindowShades,
  drawZoom,
  drawDropDown,
  drawScrew,

}