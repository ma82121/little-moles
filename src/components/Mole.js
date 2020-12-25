export class Mole {
  constructor(option) {
    this.displayTime = 240 // 指定したフレーム経過後に徐々に消える
    this.x = option.x || 0
    this.y = option.y || 0
    this.width = 1
    this.height = 1
    this.rgb = '255, 255, 255'
    this.opacity = 1
  }

  draw(context) {
    context.save()
    context.fillStyle = 'rgba(' + this.rgb + ', ' + this.opacity + ')'
    context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    context.restore()
  }
}
