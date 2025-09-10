import { GAME } from "../game/game.mjs"

export class UIUpdater {
  updateAll() {
    this.updateResourceBar()
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
    const foodPsText =
      Math.floor(
        foodPS * GAME.seasonResourceModifiers[nextSeasonNumber].foodSRM
      ) - GAME.resources.population
    FOOD_PS.innerHTML = foodPsText >= 0 ? `+${foodPsText}` : foodPsText

    const woodPsText = Math.floor(
      woodPS * GAME.seasonResourceModifiers[nextSeasonNumber].woodSRM
    )
    WOOD_PS.innerHTML = woodPsText >= 0 ? `+${woodPsText}` : woodPsText

    const silverPsText = Math.floor(
      silverPS * GAME.seasonResourceModifiers[nextSeasonNumber].silverSRM
    )
    SILVER_PS.innerHTML = silverPsText >= 0 ? `+${silverPsText}` : silverPsText

    MORALE_PS.innerHTML = `+${moralePS}`
  }

  updateYear() {
    const CURRENT_YEAR = document.querySelector("#current-year")
    CURRENT_YEAR.innerHTML = GAME.currentYear
  }

  updateSeason() {
    const CURRENT_SEASON = document.querySelector("#current-season")
    CURRENT_SEASON.innerHTML = GAME.currentSeasonName[GAME.currentSeasonNumber]
  }
}
