// 滤镜worker
class FiltersWorker {
  constructor(name) {
    this.name = name
    this.worker = new Worker(__webpack_public_path__ + 'worker.js', {
      name: name
    });
  }

  // 向worker线程传递数据，返回数据处理结果的promise
  post(obj) {
    return new Promise((resolve, reject) => {
      this.worker.onmessage = message => {
        this.worker.onmessage = null
        resolve(message)
      }
      this.worker.onerror = error => reject(error)
      this.worker.postMessage(obj)
    })
  }

  // 关闭worker线程
  close() {
    return this.worker.terminate()
  }
}

export default FiltersWorker

// 单帧滤镜多线程，启用多个web worker线程处理单个图片滤镜效果
export class SingleFrameFilterPThread {
  workerList = []
  workerCount = 0

  constructor(count) {
    this.workerCount = count || 2
    for (let i = 0; i < count; i++) {
      this.workerList.push(new FiltersWorker(i))
    }
  }

  post(obj) {
    console.time('worker多线程响应耗时：')
    const {
      imageData,
      actionList
    } = obj
    const dataList = clipImageData(imageData, this.workerCount)
    const {
      width,
      height
    } = imageData
    const list = this.workerList.map((worker, index) => {
      return worker.post({
        actionList,
        imageData: dataList[index]
      })
    })
    return Promise.all(list).then(res => {
      const canvas = new OffscreenCanvas(width, height)
      const context = canvas.getContext('2d')
      let h = 0
      res.forEach(item => {
        const imageData = item.data
        context.putImageData(imageData, 0, h)
        h += imageData.height
      })
      console.timeEnd('worker多线程响应耗时：')
      return context.getImageData(0, 0, width, height)
    })
  }

  // 关闭worker线程
  close(name) {
    const worker = this.workerList.filter(worker => {
      return worker.name === name
    })[0]
    return worker.close()
  }

  closeAll() {
    const list = this.workerList.map(worker => {
      return worker.close()
    })
    return Promise.all(list).then(res => {
      console.log(res)
    })
  }
}

function clipImageData(imageData, clipCount) {
  const dataList = []
  const {
    width,
    height
  } = imageData
  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')
  ctx.putImageData(imageData, 0, 0)
  const step = Math.floor(height / clipCount)
  let sY = 0
  for (let i = 1; i <= clipCount; i++) {
    if (i !== clipCount) {
      dataList.push(ctx.getImageData(0, sY, width, step))
    } else {
      dataList.push(ctx.getImageData(0, sY, width, height - (clipCount - 1) * step))
    }
    sY += step
  }
  return dataList
}