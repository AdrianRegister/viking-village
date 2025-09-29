import { GAME } from "../game/game.mjs"
import { UIGenerator } from "../ui/ui.mjs"
import { UIUpdater } from "../updaters/updater.mjs"
import { NextTurn } from "../updaters/nextTurn.mjs"
import { RandomEvent } from "../random-events/randomEvents.mjs"
import { Forage } from "../activities/forage.mjs"
import { TrainingUI } from "../ui/trainingUi.mjs"
import { TrainWarriors } from "../activities/trainWarriors.mjs"
import { Raid } from "../activities/raid.mjs"
import { RaidingUI } from "../ui/raidingUI.mjs"

export function initGame() {
  GAME.currentYear = Math.floor(800 + GAME.currentTurn * 0.25) + "AD"

  const ui = new UIGenerator()
  ui.renderUI()

  const updater = new UIUpdater()
  updater.updateAll()

  const trainingUI = new TrainingUI()
  trainingUI.initTrainWarriorsSlider()

  const raidingUI = new RaidingUI()
  raidingUI.lockTargets()
}

export function handleNextTurn() {
  GAME.currentTurn += 1

  const turn = new NextTurn()
  const updater = new UIUpdater()

  turn.resetActivities()
  updater.enableActivityButtons()

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

  const raidingUI = new RaidingUI()
  raidingUI.lockTargets()
}

export function handleActivity(dataset) {
  const updater = new UIUpdater()

  if (dataset.foraging) {
    const result = handleForage(dataset.foraging)
    updater.disableForageButtons()

    const ui = new UIGenerator()
    ui.renderActivityPopup("FORAGING", result)
  }

  if (dataset.training) {
    handleTraining()
    updater.disableTrainingButton()
  }

  if (dataset.raiding) {
    const outcome = handleRaiding(dataset.raiding)
    const formattedOutcome = formatRaidingOutcome(outcome)

    const ui = new UIGenerator()
    ui.renderActivityPopup("RAIDING", formattedOutcome)
  }

  updater.updateResourceBar()
  updater.updateSpecialResourcesBar()
  GAME.activities.seasonActivityPoints -= 1

  if (GAME.activities.seasonActivityPoints === 0) {
    updater.disableActivityButtons()
  }

  console.log(GAME)
}

export function handleRaiding(targetChosen) {
  const raid = new Raid(targetChosen)
  raid.setTarget()
  raid.addModifiersToFightingStrength()
  raid.addModifiersToDefenders()
  raid.battle()
  raid.calculateCasualties()
  raid.calculateLoot()

  // TODO
  // raid.calculateLeaderExperience()

  const raidOutcome = raid.resolveRaid()

  GAME.activities.hasRaided = true

  return raidOutcome
}

export function handleForage(resourceFocused) {
  const forage = new Forage(resourceFocused)
  const result = forage.modifyResources()

  GAME.activities.hasForaged = true

  return result
}

export function handleTraining() {
  const train = new TrainWarriors()
  const isSane = train.sanityCheck()
  if (!isSane) return

  train.train()

  GAME.activities.hasTrained = true
}

export function handleTrainingSlider(event) {
  const trainingUI = new TrainingUI()
  trainingUI.handleTrainWarriorsSliderInput(event)
}

export function formatRaidingOutcome(formattedOutcome) {
  const { victory, casualties, lootGained, leaderExperience } = formattedOutcome

  let outcomeText
  const warriorsWithS = casualties === 1 ? "warrior" : "warriors"
  const captivesWithS = lootGained.captives === 1 ? "thrall" : "thralls"
  const hasOrHave = casualties === 1 ? "has" : "have"

  if (!victory) {
    outcomeText = `Your warriors have been driven back! The raid has failed. 
    ${casualties} ${warriorsWithS} ${hasOrHave} fallen in battle!`
  } else {
    outcomeText = `Glorious victory! The raid has been a successful demonstration of your clan's strength!<br>
    Your warriors have looted ${lootGained.food} food, ${lootGained.wood} wood, and ${lootGained.silver} silver from
    their feeble adversaries. `
    if (lootGained.captives) {
      outcomeText += `They have also captured ${lootGained.captives} ${captivesWithS}!`
    }
    if (casualties) {
      outcomeText += `<br><br>However, ${casualties} ${warriorsWithS} ${hasOrHave} fallen in battle!`
    } else {
      outcomeText += `<br><br>Your raid was truly blessed by the gods! Not a single warrior has fallen!`
    }
  }

  return outcomeText
}
