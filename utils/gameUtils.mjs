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

  const eventGenerator = new RandomEvent(GAME.currentSeasonNumber)
  eventGenerator.applyEventModifiers()

  turn.calculateYear()
  turn.calculateResources()

  const updater = new UIUpdater()
  updater.updateAll()

  const ui = new UIGenerator()
  const randomEvent = eventGenerator.getGeneratedEvent()
  ui.renderRandomEventPopup(randomEvent)
}
