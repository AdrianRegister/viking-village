import { GAME } from "../game/game.mjs"
import { UIGenerator } from "../ui/ui.mjs"
import { UIUpdater } from "../updaters/updater.mjs"
import { NextTurn } from "../updaters/nextTurn.mjs"
import { RandomEvent } from "../random-events/randomEvents.mjs"

export function initGame() {
  GAME.currentYear = Math.floor(800 + GAME.currentTurn * 0.25) + "AD"

  const ui = new UIGenerator()
  ui.renderUI()

  const updater = new UIUpdater()
  updater.updateAll()
}

export function handleNextTurn() {
  GAME.currentTurn += 1

  const turn = new NextTurn()
  turn.calculateSeason()
  turn.calculateYear()
  turn.calculateResources()

  const updater = new UIUpdater()
  updater.updateAll()

  // put before turn.calculateResources() ?
  const eventGenerator = new RandomEvent(GAME.currentSeasonNumber)
  const randomEvent = eventGenerator.getGeneratedEvent()

  const ui = new UIGenerator()
  ui.renderRandomEventPopup(randomEvent)
}
