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

  // Each pop consumes 1 food per season
  calculateResources() {
    GAME.resources.food +=
      Math.floor(
        GAME.resourcesPerSeason.foodPS *
          (GAME.seasonResourceModifiers[GAME.currentSeasonNumber].foodSRM +
            GAME.randomEventResourceModifiers.food)
      ) - GAME.resources.population

    GAME.resources.wood += Math.floor(
      GAME.resourcesPerSeason.woodPS *
        (GAME.seasonResourceModifiers[GAME.currentSeasonNumber].woodSRM +
          GAME.randomEventResourceModifiers.wood)
    )

    GAME.resources.silver += Math.floor(
      GAME.resourcesPerSeason.silverPS *
        (GAME.seasonResourceModifiers[GAME.currentSeasonNumber].silverSRM +
          GAME.randomEventResourceModifiers.silver)
    )

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
    GAME.seasonActivityPoints = 2
    GAME.hasForaged = false
  }
}
