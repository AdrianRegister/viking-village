import { GAME } from "../game/game.mjs"

export class RaidingUI {
  constructor() {
    this.longshipRequired = document.querySelectorAll(".longship-required")
    this.hasLongships = GAME.specialResources.longships
  }

  lockTargets() {
    if (!this.hasLongships) {
      for (const target of this.longshipRequired) {
        target.querySelector("button").disabled = true
      }
    }
  }
}
