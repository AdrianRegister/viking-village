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

    POPULATION_PS.innerHTML = `${
      GAME.seasonResourceModifiers[nextSeasonNumber].population >= 0 ? "+" : ""
    }${Math.floor(
      populationPS * GAME.seasonResourceModifiers[nextSeasonNumber].population
    )}`
    FOOD_PS.innerHTML = `${
      GAME.seasonResourceModifiers[nextSeasonNumber].food >= 0 ? "+" : ""
    }${Math.floor(
      foodPS * GAME.seasonResourceModifiers[nextSeasonNumber].food
    )}`
    WOOD_PS.innerHTML = `${
      GAME.seasonResourceModifiers[nextSeasonNumber].wood >= 0 ? "+" : ""
    }${Math.floor(
      woodPS * GAME.seasonResourceModifiers[nextSeasonNumber].wood
    )}`
    SILVER_PS.innerHTML = `${
      GAME.seasonResourceModifiers[nextSeasonNumber].silver >= 0 ? "+" : ""
    }${Math.floor(
      silverPS * GAME.seasonResourceModifiers[nextSeasonNumber].silver
    )}`
    MORALE_PS.innerHTML = `${
      GAME.seasonResourceModifiers[nextSeasonNumber].morale >= 0 ? "+" : ""
    }${moralePS}`
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
