import { GAME } from "../game/game.mjs"

// each raid target has base loot set in GAME.CONSTANTS
// raid leader will add modifiers to this base rate

export class Raid {
  constructor(targetChosen) {
    this.targetID = parseInt(targetChosen)
    this.target = null
    this.fightingStrength = GAME.specialResources.warriors
  }

  setTarget() {
    this.target = GAME.CONSTANTS.raidingTargets.find(
      (target) => target.id === this.targetID
    )
    console.log(this.target)
  }

  // TODO
  // battle algorithm
}
