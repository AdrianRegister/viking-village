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
    GAME.resources.population += Math.floor(
      GAME.resourcesPerSeason.populationPS *
        (GAME.seasonResourceModifiers[GAME.currentSeasonNumber].population +
          GAME.randomEventResourceModifiers.population)
    )

    GAME.resources.food += Math.floor(
      GAME.resourcesPerSeason.foodPS *
        (GAME.seasonResourceModifiers[GAME.currentSeasonNumber].food +
          GAME.randomEventResourceModifiers.food)
    )

    GAME.resources.wood += Math.floor(
      GAME.resourcesPerSeason.woodPS *
        (GAME.seasonResourceModifiers[GAME.currentSeasonNumber].wood +
          GAME.randomEventResourceModifiers.wood)
    )

    GAME.resources.silver += Math.floor(
      GAME.resourcesPerSeason.silverPS *
        (GAME.seasonResourceModifiers[GAME.currentSeasonNumber].silver +
          GAME.randomEventResourceModifiers.silver)
    )

    GAME.resources.morale += GAME.resourcesPerSeason.moralePS

    console.log("final resources after calculation", GAME.resources)
  }
}
