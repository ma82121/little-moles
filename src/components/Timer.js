export class Timer {
  constructor(option) {
    this.timerId = null
    this.remain = option.remainTime || 10
    this.x = 20
    this.y = 30
    this.width = 10
    this.height = 10
    this.fontSize = 16
    this.onchange = null
  }

  play() {
    this.timerId = setInterval(() => {
      this.remain--
      if (typeof this.onchange === 'function') {
        this.onchange()
      }
    }, 1000)
  }

  draw(context) {
    context.save()
    context.font = this.fontSize * window.devicePixelRatio + 'px "Chathura", sans-serif'
    context.textAlign = 'left'
    if (this.remain < 10) {
      context.fillStyle = 'rgba(255, 0, 0, 1)'
    } else {
      context.fillStyle = 'rgba(255, 255, 255, 1)'
    }
    context.fillText('TIME ' + this.remain, this.x * window.devicePixelRatio, this.y * window.devicePixelRatio)
    context.restore()
  }
}
