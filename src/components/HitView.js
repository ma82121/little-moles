export class HitView {
  constructor(option) {
    this.displayTime = 30 // フレーム経過後に徐々に消える
    this.opacity = 1
    this.x = option.x || 0
    this.y = option.y || 0
    this.fontSize = 16
  }

  draw(context) {
    context.save()
    context.font = this.fontSize * window.devicePixelRatio + 'px "Chathura", sans-serif'
    context.textAlign = 'center'
    context.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')'
    context.fillText('hit', this.x, this.y)
    context.restore()
  }
}
