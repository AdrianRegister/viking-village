export const GAME = {
  currentTurn: 0,
  currentSeasonNumber: 1,
  currentSeasonName: {
    1: "Spring",
    2: "Summer",
    3: "Fall",
    4: "Winter",
  },
  resources: {
    population: 35,
    food: 150,
    wood: 100,
    silver: 75,
    morale: 80,
  },
  resourcesPerSeason: {
    populationPS: 1,
    foodPS: 25,
    woodPS: 15,
    silverPS: 5,
    moralePS: 0,
  },
  seasonResourceModifiers: {
    1: {
      population: 1,
      food: 0.5,
      wood: 1,
      silver: 1,
      morale: 0,
    },
    2: {
      population: 1,
      food: 0.75,
      wood: 1,
      silver: 1,
      morale: 0,
    },
    3: {
      population: 1,
      food: 1.25,
      wood: 0.5,
      silver: 0.5,
      morale: 0,
    },
    4: {
      population: 0,
      food: -1,
      wood: -1,
      silver: 0,
      morale: 0,
    },
  },
}
