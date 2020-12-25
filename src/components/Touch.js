export class Touch {
  constructor() {
    this.element = null
    this.isTouchDevice = 'ontouchstart' in window
    this.x = 0
    this.y = 0
    this.onchange = null
  }

  init(element) {
    this.element = element
    this.addEvent()
  }

  addEvent() {
    const TOUCHSTART = this.isTouchDevice ? 'touchstart' : 'mousedown'
    this.element.addEventListener(TOUCHSTART, e => this.start(e), false)
  }

  start(e) {
    e.preventDefault()
    const pos = this.getBoundingClientRect(e)
    this.x = pos.x * window.devicePixelRatio
    this.y = pos.y * window.devicePixelRatio
    this.update('start')
  }

  getBoundingClientRect(e) {
    const rect = e.target.getBoundingClientRect()
    return {
      x: this.isTouchDevice ? e.changedTouches[0].clientX - rect.left : e.clientX - rect.left,
      y: this.isTouchDevice ? e.changedTouches[0].clientY - rect.top : e.clientY - rect.top
    }
  }

  update(string) {
    if (typeof this.onchange === 'function') {
      this.onchange(string)
    }
  }
}
