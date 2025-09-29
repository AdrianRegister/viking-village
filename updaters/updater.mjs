import { GAME } from "../game/game.mjs"

export class UIUpdater {
  updateAll() {
    this.updateResourceBar()
    this.updateSpecialResourcesBar()
    this.updateSeason()
    this.updateYear()
  }

  updateResourceBar() {
    const POPULATION_COUNT = document.querySelector("#population-count")
    const FOOD_COUNT = document.querySelector("#food-count")
    const WOOD_COUNT = document.querySelector("#wood-count")
    const SILVER_COUNT = document.querySelector("#silver-count")
    const MORALE_COUNT = document.querySelector("#morale-count")

    const { population, food, wood, silver, morale } = GAME.resources

    POPULATION_COUNT.innerHTML = Math.floor(population)
    FOOD_COUNT.innerHTML = Math.floor(food)
    WOOD_COUNT.innerHTML = Math.floor(wood)
    SILVER_COUNT.innerHTML = Math.floor(silver)
    MORALE_COUNT.innerHTML = Math.floor(morale)

    const POPULATION_PS = document.querySelector("#population-per-season")
    const FOOD_PS = document.querySelector("#food-per-season")
    const WOOD_PS = document.querySelector("#wood-per-season")
    const SILVER_PS = document.querySelector("#silver-per-season")
    const MORALE_PS = document.querySelector("#morale-per-season")

    const { populationPS, foodPS, woodPS, silverPS, moralePS } =
      GAME.resourcesPerSeason

    const nextSeasonNumber =
      GAME.currentSeasonNumber === 4 ? 1 : GAME.currentSeasonNumber + 1

    const popPsText = Math.floor(
      populationPS *
        GAME.seasonResourceModifiers[nextSeasonNumber].populationSRM
    )
    POPULATION_PS.innerHTML = popPsText >= 0 ? `+${popPsText}` : popPsText

    // Each pop consumes 1 food per season
    // Each warrior consumes 3 food and 2 silver per season
    const populationFoodUpkeep =
      GAME.CONSTANTS.upkeep.population.food * GAME.resources.population
    const warriorsFoodUpkeep =
      GAME.CONSTANTS.upkeep.warriors.food * GAME.specialResources.warriors
    const warriorsSilverUpkeep =
      GAME.CONSTANTS.upkeep.warriors.silver * GAME.specialResources.warriors

    const foodPsText =
      Math.floor(
        foodPS * GAME.seasonResourceModifiers[nextSeasonNumber].foodSRM
      ) -
      populationFoodUpkeep -
      warriorsFoodUpkeep
    FOOD_PS.innerHTML = foodPsText >= 0 ? `+${foodPsText}` : foodPsText

    const woodPsText = Math.floor(
      woodPS * GAME.seasonResourceModifiers[nextSeasonNumber].woodSRM
    )
    WOOD_PS.innerHTML = woodPsText >= 0 ? `+${woodPsText}` : woodPsText

    const silverPsText =
      Math.floor(
        silverPS * GAME.seasonResourceModifiers[nextSeasonNumber].silverSRM
      ) - warriorsSilverUpkeep
    SILVER_PS.innerHTML = silverPsText >= 0 ? `+${silverPsText}` : silverPsText

    MORALE_PS.innerHTML = `+${moralePS}`
  }

  updateSpecialResourcesBar() {
    const WARRIORS_COUNT = document.querySelector("#warriors-count")
    const THRALLS_COUNT = document.querySelector("#thralls-count")
    const WEAPONS_COUNT = document.querySelector("#weapons-count")
    const JEWELLERY_COUNT = document.querySelector("#jewellery-count")
    const LONGSHIPS_COUNT = document.querySelector("#longships-count")

    const { warriors, thralls, weapons, jewellery, longships } =
      GAME.specialResources

    WARRIORS_COUNT.innerHTML = Math.floor(warriors)
    THRALLS_COUNT.innerHTML = Math.floor(thralls)
    WEAPONS_COUNT.innerHTML = Math.floor(weapons)
    JEWELLERY_COUNT.innerHTML = Math.floor(jewellery)
    LONGSHIPS_COUNT.innerHTML = Math.floor(longships)
  }

  updateYear() {
    const CURRENT_YEAR = document.querySelector("#current-year")
    CURRENT_YEAR.innerHTML = GAME.currentYear
  }

  updateSeason() {
    const CURRENT_SEASON = document.querySelector("#current-season")
    CURRENT_SEASON.innerHTML = GAME.currentSeasonName[GAME.currentSeasonNumber]
  }

  disableActivityButtons() {
    const activityButtons = document.querySelectorAll(".choose-activity-button")
    activityButtons.forEach((b) => (b.disabled = true))
  }

  disableForageButtons() {
    const forageButtons = document.querySelectorAll(".foraging-button")
    if (GAME.activities.hasForaged) {
      forageButtons.forEach((b) => (b.disabled = true))
    }
  }

  disableRaidingButtons() {
    const raidingButtons = document.querySelectorAll(".raiding-button")
    if (GAME.activities.hasRaided) {
      raidingButtons.forEach((b) => (b.disabled = true))
    }
  }

  disableTrainingButton() {
    const trainingButton = document.querySelector(".training-button")
    if (GAME.activities.hasTrained) {
      trainingButton.disabled = true
    }
  }

  enableActivityButtons() {
    const activityButtons = document.querySelectorAll(".choose-activity-button")
    activityButtons.forEach((b) => (b.disabled = false))
  }
}
