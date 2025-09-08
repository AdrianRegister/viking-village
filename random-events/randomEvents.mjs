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

  applyEventModifiers() {}
}
