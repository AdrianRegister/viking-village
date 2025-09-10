import { GAME } from "./game.mjs"

export const EVENTS = {
  1: [
    {
      name: "Early thaw",
      description:
        "The rivers thaw early, boosting fishing. 15% increased food production this season!",
      effects: [
        {
          resourceAffected: "food",
          isPercentage: true,
          modifier: 0.15,
        },
      ],
    },
    {
      name: "A Wanderer Arrives",
      description: "A lone drifter seeks shelter. +1 population!",
      effects: [
        {
          resourceAffected: "population",
          isPercentage: false,
          modifier: 1,
        },
      ],
    },
  ],
  2: [
    {
      name: "Merchant Fleet",
      description:
        "Foreign traders arrive with exotic goods. 10% increased silver production this season!",
      effects: [
        {
          resourceAffected: "silver",
          isPercentage: true,
          modifier: 0.1,
        },
      ],
    },
    {
      name: "Warrior’s Feast",
      description: "A neighboring clan invites you. +3 morale!",
      effects: [
        {
          resourceAffected: "morale",
          isPercentage: false,
          modifier: 3,
        },
      ],
    },
  ],
  3: [
    {
      name: "Poor Harvest",
      description: "Blight strikes crops. -40% food production this season!",
      effects: [
        {
          resourceAffected: "food",
          isPercentage: true,
          modifier: -0.4,
        },
      ],
    },
    {
      name: "Harvest Festival",
      description: "Villagers rejoice! +5 morale, -15 food",
      effects: [
        {
          resourceAffected: "morale",
          isPercentage: false,
          modifier: 5,
        },
        {
          resourceAffected: "food",
          isPercentage: false,
          modifier: -15,
        },
      ],
    },
  ],
  4: [
    {
      // MODIFIERS TO THIS EVENT MANAGED IN NextTurn.calculatePopulation()
      name: "Harsh Winter",
      description: "Bitter cold. Double food upkeep this season!",
      effects: [
        {
          resourceAffected: "food",
          isPercentage: false,
          modifier: 0,
        },
      ],
    },
    {
      name: "Wolf Pack Attack",
      description: "Wolves raid livestock. -15 food!",
      effects: [
        {
          resourceAffected: "food",
          isPercentage: false,
          modifier: -15,
        },
      ],
    },
  ],
}
