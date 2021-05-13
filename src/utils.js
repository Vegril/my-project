// 三次bezier曲线类,参数为4个控制点坐标
class CubicBezier {
  constructor(p0, p1, p2, p3) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }
  
  cal(t, a, b, c, d) {
    var k = 1 - t;
    return k * k * k * a + 3 * k * k * t * b + 3 * (1 - t) * t * t * c + t * t * t * d;
  }

  // 根据t获取曲线点坐标
  get(t) {
    return {
      x: this.cal(t, this.p0.x, this.p1.x, this.p2.x, this.p3.x),
      y: this.cal(t, this.p0.y, this.p1.y, this.p2.y, this.p3.y)
    }
  }
}

function CubicBezierLut(p0, p1, p2, p3, count) {
  this.bezier = new CubicBezier(p0, p1, p2, p3);
  this.lut = [];

  count = count || 100;

  var step = 1 / count;
  var t = 0;

  for (var i = 0; i < count; i++) {
    this.lut.push(this.bezier.get(t));
    t += step;
  }
}
CubicBezierLut.prototype = {
  getYbyX: function (x) {
    // 找一个最接近的点
    for (var i = 0; i < this.lut.length - 1; i++) {
      var point = this.lut[i];
      var nextPoint = this.lut[i + 1];
      if (Math.abs(x - point.x) <= Math.abs(x - nextPoint.x)) {
        return point.y;
      }
    }
    return null;
  }
}
// getDrawImageInfo，用于获取画布和图片宽高、比例不一致时，图片在画布中完整并居中显示时的位置与宽高
export const getDrawImageInfo = (canvasWidth, canvasHeight, imageWidth, imageHeight) => {
  const imageRate = imageWidth / imageHeight
  const canvasRate = canvasWidth / canvasHeight
  let dx = 0
  let dy = 0
  let dWidth = 0
  let dHeight = 0
  if (imageRate > canvasRate) {
    dWidth = canvasWidth
    dHeight = canvasWidth / imageRate
    dy = (canvasHeight - dHeight) / 2
  } else if (imageRate < canvasRate) {
    dHeight = canvasHeight
    dWidth = canvasHeight * imageRate
    dx = (canvasWidth - dWidth) / 2
  } else {
    dWidth = canvasWidth
    dHeight = canvasHeight
  }
  return {
    x: dx,
    y: dy,
    width: dWidth,
    height: dHeight
  }
}

export const putImageDataAndAdaptiveCanvas = (context, imageData) => {
  if (!context.canvas) return
  const {
    width: canvasWidth,
    height: canvasHeight
  } = context.canvas
  const {
    width: imageWidth,
    height: imageHeight
  } = imageData
  const {
    x: dx,
    y: dy,
    width: dWidth,
    height: dHeight
  } = getDrawImageInfo(canvasWidth, canvasHeight, imageWidth, imageHeight)
  const offscreenCanvas = new OffscreenCanvas(imageWidth, imageHeight)
  const ctx = offscreenCanvas.getContext('2d')
  ctx.putImageData(imageData, 0, 0)
  context.drawImage(offscreenCanvas, 0, 0, imageWidth, imageHeight, dx, dy, dWidth, dHeight)
}

export {
  CubicBezierLut,
  CubicBezier
}