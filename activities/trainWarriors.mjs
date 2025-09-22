import { GAME } from "../game/game.mjs"

export class TrainWarriors {
  constructor() {
    this.warriorsToTrain = parseInt(
      document.querySelector("#train-warriors").value
    )
    this.foodCost =
      this.warriorsToTrain * GAME.CONSTANTS.warriorTrainingCosts.food
    this.silverCost =
      this.warriorsToTrain * GAME.CONSTANTS.warriorTrainingCosts.silver
    this.weaponsCost =
      this.warriorsToTrain * GAME.CONSTANTS.warriorTrainingCosts.weapons
  }

  // for debugging
  sanityCheck() {
    if (
      this.foodCost > GAME.resources.food ||
      this.silverCost > GAME.resources.silver ||
      this.weaponsCost > GAME.specialResources.weapons
    ) {
      console.log("CHECK YOUR LOGIC")
      return false
    }

    console.log(
      `Food cost: ${this.foodCost}. Silver cost: ${this.silverCost}. Weapons cost: ${this.weaponsCost}`
    )
    return true
  }

  #calculateResources() {
    GAME.resources.food -= this.foodCost
    GAME.resources.silver -= this.silverCost
    GAME.specialResources.weapons -= this.weaponsCost

    GAME.resources.population -= this.warriorsToTrain
    GAME.specialResources.warriors += this.warriorsToTrain
  }

  train() {
    this.#calculateResources()
  }
}
