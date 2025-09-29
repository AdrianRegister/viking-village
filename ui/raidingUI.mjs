import { GAME } from "../game/game.mjs"

export class RaidingUI {
  constructor() {
    this.raidingButtons = document.querySelectorAll(".raiding-button")
    this.longshipRequired = document.querySelectorAll(".longship-required")
    this.hasLongships = GAME.specialResources.longships
    this.hasWarriors = GAME.specialResources.warriors
  }

  toggleLockTargets() {
    if (!this.hasWarriors) {
      for (const button of this.raidingButtons) {
        button.disabled = true
      }
    } else {
      for (const button of this.raidingButtons) {
        button.disabled = false
      }
    }

    if (!this.hasLongships) {
      for (const target of this.longshipRequired) {
        target.querySelector("button").disabled = true
      }
    } else {
      for (const target of this.longshipRequired) {
        target.querySelector("button").disabled = false
      }
    }
  }
}
