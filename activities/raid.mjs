import { GAME } from "../game/game.mjs"

export class Raid {
  constructor(targetChosen) {
    this.targetID = parseInt(targetChosen)
    this.target = null
    this.warriorsInvolved = GAME.specialResources.warriors
    this.fightingStrength = null
    this.outcome = {
      victory: false,
      casualties: 0,
      lootGained: {
        food: 0,
        wood: 0,
        silver: 0,
        captives: 0,
      },
      leaderExperience: 0,
    }
  }

  setTarget() {
    this.target = GAME.CONSTANTS.raidingTargets.find(
      (target) => target.id === this.targetID
    )
    console.log(this.target)
  }

  addModifiersToFightingStrength() {
    // modifiers will morale
    // later modifiers can be leader skill, blessing of the gods,
    // village reputation etc.
    const moraleModifier = 1 + GAME.resources.morale / 100
    this.fightingStrength = this.warriorsInvolved * moraleModifier
  }

  addModifiersToDefenders() {
    this.target.defenseStrength =
      this.target.defenseStrength * this.target.fortLevel
  }

  calculateSuccessChance() {
    const { defenseStrength } = this.target

    let successChance =
      this.fightingStrength / (this.fightingStrength + defenseStrength)
    successChance = Math.min(Math.max(successChance, 0), 1)

    // console.log(
    //   this.fightingStrength,
    //   defenseStrength,
    //   Math.ceil(successChance * 100) + "%"
    // )

    return successChance
  }

  battle() {
    const successChance = this.calculateSuccessChance()
    const battleRoll = Math.random()

    battleRoll < successChance
      ? (this.outcome.victory = true)
      : (this.outcome.victory = false)

    // console.log(successChance, battleRoll, this.outcome)
  }

  calculateCasualties() {
    const isVictory = this.outcome.victory
    const casualtiesChance = isVictory ? 0.05 : 0.5
    let casualties = 0

    for (let warrior = 0; warrior < this.warriorsInvolved; warrior++) {
      const survivalRoll = Math.random()
      survivalRoll < casualtiesChance ? (casualties += 1) : (casualties += 0)

      // console.log(survivalRoll, casualtiesChance, casualties)
    }

    this.outcome.casualties = casualties
  }

  calculateLoot() {
    if (!this.outcome.victory) return

    // each raid target has base loot set in GAME.CONSTANTS
    // raid leader will add modifiers to this base rate
    const foodLooted = this.target.loot.food
    const woodLooted = this.target.loot.wood
    const silverLooted = this.target.loot.silver
    const captivesLooted = this.target.loot.captives

    this.outcome.lootGained.food = foodLooted
    this.outcome.lootGained.wood = woodLooted
    this.outcome.lootGained.silver = silverLooted
    this.outcome.lootGained.captives = captivesLooted
  }

  // TODO
  // calculateLeaderExperience() {}

  resolveRaid() {
    GAME.resources.food += this.outcome.lootGained.food
    GAME.resources.wood += this.outcome.lootGained.wood
    GAME.resources.silver += this.outcome.lootGained.silver
    GAME.specialResources.thralls += this.outcome.lootGained.captives

    GAME.specialResources.warriors -= this.outcome.casualties

    return this.outcome
  }
}
