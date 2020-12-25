import '~/src/assets/styles/style.scss'

import { Cursor } from '@/components/Cursor'
import { Game } from '@/components/Game'
import { HitView } from '@/components/HitView'
import { Mole } from '@/components/Mole'
import { Timer } from '@/components/Timer'
import { TimeUp } from '@/components/TimeUp'
import { Touch } from '@/components/Touch'

import { SCREEN_WIDTH, SCREEN_HEIGHT, REMAIN_TIME, LOCAL_STORAGE_ITEM_NAME } from '@/config/index'

const scale = window.devicePixelRatio
const cursor = new Cursor()
const game = new Game()
const timeUp = new TimeUp()
const hits = []
const moles = []
let animationId

const lsScore = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME)
let bestScore = lsScore ? parseInt(lsScore, 10) : 0

const $container = document.querySelector('.canvas-container')
const $canvas = document.querySelector('.canvas-container > .canvas')
const $playbutton = document.getElementById('play-button')
const $newButton = document.querySelector('#newButton')
const $recordValue = document.querySelector('.record-point-value')

const context = $canvas.getContext('2d')
$canvas.style.width = SCREEN_WIDTH + 'px'
$canvas.style.height = SCREEN_HEIGHT + 'px'
$canvas.width = SCREEN_WIDTH * scale
$canvas.height = SCREEN_HEIGHT * scale

// Event
const touch = new Touch()
touch.init($canvas)
touch.onchange = touchEvent

function touchEvent(action) {
  if (action === 'start') {
    cursor.x = touch.x
    cursor.y = touch.y
    collision()
  }
}

// Record
$recordValue.innerHTML = bestScore

// Timerイベント
const timer = new Timer({
  remainTime: REMAIN_TIME
})
timer.onchange = timerEvent

function timerEvent() {
  if (timer.remain === 40) {
    moles.push(createMole(), createMole())
  } else if (timer.remain === 20) {
    moles.push(createMole(), createMole(), createMole(), createMole(), createMole(), createMole())
  } else if (timer.remain === 0) {
    clearInterval(timer)
    cancelAnimationFrame(animationId)
    gameover()
    timeUp.draw(context)
  }
}

$playbutton.addEventListener('click', playButtonTouch, false)

function playButtonTouch() {
  $container.scrollIntoView(true)
  $container.style.display = 'block'
  timer.play()
  animation()
  $playbutton.removeEventListener('click', playButtonTouch, false)
  $playbutton.disabled = true
  moles.push(createMole())
}

const randomInt = (min = 0, max = 9) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function createMole() {
  return new Mole({
    x: randomInt(0 + 50, SCREEN_WIDTH * scale - 50),
    y: randomInt(0 + 50, SCREEN_HEIGHT * scale - 50)
  })
}

const collisionCheck = mole => {
  if (timer.remain <= 0) return false
  if (
    mole.x - mole.width / 2 >= cursor.x - cursor.width / 2 &&
    mole.x + mole.width / 2 <= cursor.x + cursor.width / 2 &&
    mole.y - mole.height / 2 >= cursor.y - cursor.height / 2 &&
    mole.y + mole.height / 2 <= cursor.y + cursor.height / 2
  ) {
    return true
  }
  return false
}

const collision = () => {
  let hitFlag = false

  for (let i = 0; i < moles.length; i++) {
    if (collisionCheck(moles[i])) {
      hitFlag = true

      const hitView = new HitView({
        x: touch.x,
        y: touch.y - 30
      })
      hits.push(hitView)

      moles.splice(i, 1)
      moles.push(createMole())
      game.combo++
      game.score += 10 * game.combo
    }
  }

  if (!hitFlag) game.combo = 0
}

const animation = () => {
  update()
  draw()
  animationId = requestAnimationFrame(animation)
}

const update = () => {
  for (let i = 0; i < moles.length; i++) {
    moles[i].displayTime -= 1
    if (moles[i].displayTime <= 0) {
      moles[i].opacity -= 0.05
    }
    if (moles[i].displayTime <= 0 && moles[i].opacity <= 0) {
      moles.splice(i, 1)
      moles.push(createMole())
    }
  }
  for (let i = 0; i < hits.length; i++) {
    hits[i].displayTime -= 1
    hits[i].y -= 1
    if (hits[i].displayTime <= 0) {
      hits[i].opacity -= 0.05
    }
    if (hits[i].displayTime <= 0 && hits[i].opacity <= 0) {
      hits.splice(i, 1)
    }
  }
}

const draw = () => {
  context.clearRect(0, 0, $canvas.width, $canvas.height)
  game.draw(context)
  timer.draw(context)
  for (let i = 0; i < hits.length; i++) {
    hits[i].draw(context)
  }
  for (let i = 0; i < moles.length; i++) {
    moles[i].draw(context)
  }
  cursor.draw(context)
}

const gameover = () => {
  update()
  draw()
  if (bestScore < game.score) {
    bestScore = game.score
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, String(bestScore))
    $recordValue.innerHTML = bestScore
    updateTweetButton()
  }
}

const updateTweetButton = () => {
  $newButton.innerHTML = ''

  /* eslint-disable no-undef */
  twttr.widgets
    .createShareButton('https://maportf.web.app/little-moles/', document.getElementById('newButton'), {
      lang: 'ja',
      count: 'none',
      text: '「リトルもぐら叩き」私のBestScoreは' + bestScore + 'だぞぃ',
      size: 'large',
      hashtag: 'リトルもぐら叩き'
    })
    .then(el => {})
}

window.onload = () => {
  updateTweetButton()
}
