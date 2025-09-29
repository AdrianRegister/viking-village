export const GAME = {
  currentTurn: 0,
  currentSeasonNumber: 1,
  currentSeasonName: {
    1: "Spring",
    2: "Summer",
    3: "Fall",
    4: "Winter",
  },
  specialResources: {
    warriors: 0,
    thralls: 0,
    weapons: 10,
    jewellery: 0,
    longships: 0,
  },
  resources: {
    population: 35,
    food: 150,
    wood: 100,
    silver: 75,
    morale: 50,
  },
  resourcesPerSeason: {
    populationPS: 1,
    foodPS: 25,
    woodPS: 15,
    silverPS: 5,
    moralePS: 0,
  },
  randomEventResourceModifiers: {
    population: 0,
    food: 0,
    wood: 0,
    silver: 0,
    morale: 0,
  },
  seasonResourceModifiers: {
    1: {
      populationSRM: 1,
      foodSRM: 0.5,
      woodSRM: 1,
      silverSRM: 1,
      moraleSRM: 0,
    },
    2: {
      populationSRM: 1,
      foodSRM: 0.75,
      woodSRM: 1,
      silverSRM: 1,
      moraleSRM: 0,
    },
    3: {
      populationSRM: 1,
      foodSRM: 1.25,
      woodSRM: 0.5,
      silverSRM: 0.5,
      moraleSRM: 0,
    },
    4: {
      populationSRM: 0,
      foodSRM: 0,
      woodSRM: 0,
      silverSRM: 0,
      moraleSRM: 0,
    },
  },
  activities: {
    seasonActivityPoints: 2,
    hasForaged: false,
    hasTrained: false,
    hasRaided: false,
  },
  CONSTANTS: {
    warriorTrainingCosts: {
      food: 5,
      silver: 3,
      weapons: 2,
    },
    upkeep: {
      population: {
        food: 1,
      },
      warriors: {
        food: 3,
        silver: 2,
      },
    },
    raidingTargets: [
      {
        id: 1,
        name: "village",
        defenseStrength: 5,
        fortLevel: 2,
        loot: {
          food: 10,
          wood: 10,
          silver: 10,
          captives: 3,
        },
      },
      // ...add more raid targets
    ],
  },
}
