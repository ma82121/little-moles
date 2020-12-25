export class ComboView {
  constructor() {
    this.x = 160
    this.y = 460
    this.fontSize = 16
  }

  draw(context, combo) {
    if (combo > 1) {
      context.save()
      context.font = this.fontSize * window.devicePixelRatio + 'px "Chathura", sans-serif'
      context.textAlign = 'center'
      if (combo >= 10) {
        context.fillStyle = 'rgba(255, 255, 0, 1)'
      } else {
        context.fillStyle = 'rgba(255, 255, 0, ' + (combo * 0.05 + 0.5) + ')'
      }
      context.fillText(combo - 1 + 'Combo', this.x * window.devicePixelRatio, this.y * window.devicePixelRatio)
      context.restore()
    }
  }
}
