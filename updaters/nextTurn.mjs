import { GAME } from "../game/game.mjs"

export class NextTurn {
  calculateSeason() {
    if (GAME.currentSeasonNumber === 4) {
      GAME.currentSeasonNumber = 1
    } else GAME.currentSeasonNumber += 1
  }

  calculateYear() {
    GAME.currentYear = Math.floor(800 + GAME.currentTurn * 0.25) + "AD"
  }

  calculateResources() {
    // Each pop consumes 1 food per season
    // Each warrior consumes 3 food and 2 silver per season
    const populationFoodUpkeep =
      GAME.CONSTANTS.upkeep.population.food * GAME.resources.population
    const warriorsFoodUpkeep =
      GAME.CONSTANTS.upkeep.warriors.food * GAME.specialResources.warriors
    const warriorsSilverUpkeep =
      GAME.CONSTANTS.upkeep.warriors.silver * GAME.specialResources.warriors

    GAME.resources.food +=
      Math.floor(
        GAME.resourcesPerSeason.foodPS *
          (GAME.seasonResourceModifiers[GAME.currentSeasonNumber].foodSRM +
            GAME.randomEventResourceModifiers.food)
      ) -
      populationFoodUpkeep -
      warriorsFoodUpkeep

    GAME.resources.wood += Math.floor(
      GAME.resourcesPerSeason.woodPS *
        (GAME.seasonResourceModifiers[GAME.currentSeasonNumber].woodSRM +
          GAME.randomEventResourceModifiers.wood)
    )

    GAME.resources.silver +=
      Math.floor(
        GAME.resourcesPerSeason.silverPS *
          (GAME.seasonResourceModifiers[GAME.currentSeasonNumber].silverSRM +
            GAME.randomEventResourceModifiers.silver)
      ) - warriorsSilverUpkeep

    GAME.resources.morale += GAME.resourcesPerSeason.moralePS
  }

  calculatePopulation(randomEvent) {
    GAME.resources.population += Math.floor(
      GAME.resourcesPerSeason.populationPS *
        (GAME.seasonResourceModifiers[GAME.currentSeasonNumber].populationSRM +
          GAME.randomEventResourceModifiers.population)
    )

    if (randomEvent.name === "Harsh Winter") {
      GAME.resources.food -= GAME.resources.population
      GAME.resources.wood -= GAME.resources.population
    }
  }

  resetActivities() {
    GAME.activities.seasonActivityPoints = 2
    GAME.activities.hasForaged = false
    GAME.activities.hasTrained = false
  }
}
