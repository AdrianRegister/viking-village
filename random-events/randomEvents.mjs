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

  resetEventModifiers() {
    for (const k of Object.keys(GAME.randomEventResourceModifiers)) {
      GAME.randomEventResourceModifiers[k] = 0
    }
  }

  applyEventModifiers() {
    const modifiers = this.generatedEvent.effects
    for (const modifier of modifiers) {
      if (modifier.isPercentage) {
        GAME.randomEventResourceModifiers[modifier.resourceAffected] =
          modifier.modifier
      } else {
        console.log("reducing pop in winter...")
        GAME.resources[modifier.resourceAffected] += modifier.modifier
      }
    }
  }
}
