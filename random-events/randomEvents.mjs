import { EVENTS } from "../game/events.mjs"
import { GAME } from "../game/game.mjs"

export class RandomEvent {
  constructor(currentSeason) {
    this.currentSeason = currentSeason
    this.generatedEvent = this.#generateEvent()
  }

  #generateEvent() {
    const event =
      EVENTS[this.currentSeason][
        Math.floor(Math.random() * EVENTS[this.currentSeason].length)
      ]

    return event
  }

  getGeneratedEvent() {
    return this.generatedEvent
  }

  applyEventModifiers() {
    const modifiers = this.generatedEvent.effects
    for (const modifier of modifiers) {
      if (modifier.isPercentage) {
        GAME.randomEventResourceModifiers[modifier.resourceAffected] =
          modifier.modifier
      } else {
        GAME.resources[modifier.resourceAffected] += modifier.modifier
      }
    }
    console.log("random event modifiers", GAME.randomEventResourceModifiers)
    console.log("resources after random event", GAME.resources)
  }
}
