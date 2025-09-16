import { GAME } from "../game/game.mjs"
import { UIGenerator } from "../ui/ui.mjs"
import { UIUpdater } from "../updaters/updater.mjs"
import { NextTurn } from "../updaters/nextTurn.mjs"
import { RandomEvent } from "../random-events/randomEvents.mjs"
import { Forage } from "../activities/forage.mjs"

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
  // reset activity points and GAME bools
  // turn.resetActivities()
  turn.calculateSeason()

  const eventGenerator = new RandomEvent(GAME.currentSeasonNumber)
  eventGenerator.resetEventModifiers()
  eventGenerator.applyEventModifiers()

  turn.calculateYear()
  turn.calculateResources()

  const randomEvent = eventGenerator.getGeneratedEvent()
  turn.calculatePopulation(randomEvent)

  const updater = new UIUpdater()
  updater.updateAll()

  const ui = new UIGenerator()
  ui.renderRandomEventPopup(randomEvent)
}

export function handleForage(resourceFocused) {
  const forage = new Forage(resourceFocused)
  const result = forage.modifyResources()

  const updater = new UIUpdater()
  updater.updateResourceBar()

  GAME.seasonActivityPoints -= 1
  GAME.hasForaged = true

  return result
}
