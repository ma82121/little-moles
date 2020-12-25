import { ComboView } from '@/components/ComboView'
import { ScoreView } from '@/components/ScoreView'

export class Game {
  constructor() {
    this.combo = 0
    this.score = 0
    this.comboView = new ComboView()
    this.scoreView = new ScoreView()
  }

  draw(context) {
    this.comboView.draw(context, this.combo)
    this.scoreView.draw(context, this.score)
  }
}
