import { GAME } from "../game/game.mjs"
import { UIGenerator } from "../ui/ui.mjs"
import { UIUpdater } from "../updaters/updater.mjs"
import { NextTurn } from "../updaters/nextTurn.mjs"
import { RandomEvent } from "../random-events/randomEvents.mjs"
import { Forage } from "../activities/forage.mjs"
import { TrainingUI } from "../ui/trainingUi.mjs"

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
  const updater = new UIUpdater()

  turn.resetActivities()
  updater.enableActivityButtons()
  updater.enableForageButtons()

  turn.calculateSeason()

  const eventGenerator = new RandomEvent(GAME.currentSeasonNumber)
  eventGenerator.resetEventModifiers()
  eventGenerator.applyEventModifiers()

  turn.calculateYear()
  turn.calculateResources()

  const randomEvent = eventGenerator.getGeneratedEvent()
  turn.calculatePopulation(randomEvent)

  updater.updateAll()

  const ui = new UIGenerator()
  ui.renderRandomEventPopup(randomEvent)

  const trainingUI = new TrainingUI()
  trainingUI.initTrainWarriorsSlider()
}

export function handleActivity(dataset) {
  const updater = new UIUpdater()

  if (dataset.foraging) {
    const result = handleForage(dataset.foraging)
    updater.updateResourceBar()
    updater.disableForageButtons()

    const ui = new UIGenerator()
    ui.renderActivityPopup("FORAGING", result)
  }

  if (dataset.training) {
    //
    const result = handleTraining()

    // ...
  }

  if (GAME.seasonActivityPoints === 0) {
    updater.disableActivityButtons()
  }
}

export function handleForage(resourceFocused) {
  const forage = new Forage(resourceFocused)
  const result = forage.modifyResources()

  GAME.seasonActivityPoints -= 1
  GAME.hasForaged = true

  return result
}
