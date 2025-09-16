import { GAME } from "../game/game.mjs"

export class Forage {
  constructor(resourceFocused) {
    this.resourceFocused = resourceFocused
    this.successModifiers = {
      foodMod: 0,
      woodMod: 0,
      moraleMod: 0,
    }
  }

  #applyModifiers() {
    const currentSeason = GAME.currentSeasonNumber

    switch (currentSeason) {
      case 1:
        this.successModifiers.foodMod = 0.4
        this.successModifiers.woodMod = 0.25
        break
      case 2:
        this.successModifiers.foodMod = 0.25
        this.successModifiers.woodMod = 0.4
        break
      case 3:
        this.successModifiers.foodMod = 0.4
        this.successModifiers.woodMod = 0.4
        break
      case 4:
        this.successModifiers.foodMod = 0.1
        this.successModifiers.woodMod = 0.4
        break
    }
  }

  #applyMoraleModifier() {
    const morale = GAME.resources.morale
    this.successModifiers.moraleMod = morale / 100 / 2
  }

  #calculateSuccessChance() {
    this.#applyModifiers()
    this.#applyMoraleModifier()

    let baseChance = 0.1

    if (this.resourceFocused === "food") {
      baseChance += this.successModifiers.foodMod
    } else if (this.resourceFocused === "wood") {
      baseChance += this.successModifiers.woodMod
    }

    baseChance += this.successModifiers.moraleMod

    // console.log(this.successModifiers)
    // console.log("base chance", baseChance)

    // Clamp between 0 and 1
    const successChance = Math.min(Math.max(baseChance, 0), 1)
    return successChance
  }

  #rollResourcesGained() {
    const roll = Math.random()
    if (roll < 0.5) {
      return 10
    } else if (roll < 0.85) {
      return 15
    } else {
      return 20
    }
  }

  modifyResources() {
    const roll = Math.random()
    // console.log("roll", roll)
    const isSuccessful = this.#calculateSuccessChance() > roll ? true : false
    // console.log("is successful", isSuccessful)
    if (!isSuccessful) return

    const resourcesGained = this.#rollResourcesGained()
    // console.log(resourcesGained)

    GAME.resources[this.resourceFocused] += resourcesGained
  }
}
