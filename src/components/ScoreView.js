export class ScoreView {
  constructor() {
    this.x = 300
    this.y = 30
    this.fontSize = 16
  }

  draw(context, score) {
    context.save()
    context.font = this.fontSize * window.devicePixelRatio + 'px "Chathura", sans-serif'
    context.textAlign = 'right'
    context.fillStyle = 'rgba(255, 255, 255, 1)'
    context.fillText('SCORE ' + score, this.x * window.devicePixelRatio, this.y * window.devicePixelRatio)
    context.restore()
  }
}
