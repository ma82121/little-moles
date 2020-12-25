export class Cursor {
  constructor() {
    this.x = -100
    this.y = -100
    this.width = 50 * window.devicePixelRatio
    this.height = 50 * window.devicePixelRatio
    this.alpha = 1
    this.lineWidth = 1
  }

  draw(context) {
    context.save()
    context.translate(this.x - this.width / 2, this.y - this.height / 2)
    // context.scale(
    //   window.devicePixelRatio,
    //   window.devicePixelRatio
    // )
    context.lineWidth = this.lineWidth
    context.strokeStyle = 'rgba(255, 255, 255, 1)'
    context.beginPath()
    context.rect(0, 0, this.width, this.height)
    context.closePath()
    context.stroke()
    context.restore()
  }
}
