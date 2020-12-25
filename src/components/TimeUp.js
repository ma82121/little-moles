export class TimeUp {
  constructor() {
    this.x = 160
    this.y = 240
    this.fontSize = 24
  }

  draw(context, score) {
    context.save()
    context.font = this.fontSize * window.devicePixelRatio + 'px "Chathura", sans-serif'
    context.textAlign = 'center'
    context.fillStyle = 'rgba(255, 0, 0, 1)'
    context.fillText('TimeUp!', this.x * window.devicePixelRatio, this.y * window.devicePixelRatio)
    context.restore()
  }
}
