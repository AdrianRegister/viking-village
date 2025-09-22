import { GAME } from "../game/game.mjs"

export class TrainingUI {
  constructor() {
    this.slider = document.querySelector("#train-warriors")
    this.sliderLabel = document.querySelector("#train-warriors-label")
    this.trainingCostText = document.querySelector("#train-warriors-cost")
    this.trainingButton = document.querySelector(".training-button")

    this.foodCost = GAME.CONSTANTS.warriorTrainingCosts.food
    this.silverCost = GAME.CONSTANTS.warriorTrainingCosts.silver
    this.weaponsCost = GAME.CONSTANTS.warriorTrainingCosts.weapons
  }

  initTrainWarriorsSlider() {
    const totalPopulation = GAME.resources.population
    const initSliderValue = Math.floor(parseInt(totalPopulation) / 2)

    this.slider.max = totalPopulation
    this.slider.value = initSliderValue

    const totalTrainingCosts = this.#handleTrainWarriorsSliderText()
    this.#checkToDisableTrainingButton(totalTrainingCosts)
  }

  #checkToDisableTrainingButton(totalTrainingCosts) {
    const [totalFoodCost, totalSilverCost, totalWeaponsCost] =
      totalTrainingCosts
    const totalFood = GAME.resources.food
    const totalSilver = GAME.resources.silver
    const totalWeapons = GAME.specialResources.weapons

    if (
      totalFoodCost > totalFood ||
      totalSilverCost > totalSilver ||
      totalWeaponsCost > totalWeapons
    ) {
      this.trainingButton.disabled = true
    } else {
      this.trainingButton.disabled = false
    }
  }

  handleTrainWarriorsSliderInput(event) {
    const totalTrainingCosts = this.#handleTrainWarriorsSliderText(true, event)
    this.#checkToDisableTrainingButton(totalTrainingCosts)
  }

  #handleTrainWarriorsSliderText(isEvent = false, event = {}) {
    if (isEvent) {
      this.slider.value = event.target.value
    }

    const totalTrainingCosts = this.#calculateTotalTrainingCosts()
    const [totalFoodCost, totalSilverCost, totalWeaponsCost] =
      totalTrainingCosts

    this.sliderLabel.innerHTML = `${this.slider.value} warriors`
    this.trainingCostText.innerHTML = `
      Cost to train: ${totalFoodCost} food. ${totalSilverCost} silver. ${totalWeaponsCost} weapons.
    `

    return totalTrainingCosts
  }

  #calculateTotalTrainingCosts() {
    const totalCostArray = []

    const totalFoodCost = this.slider.value * this.foodCost
    totalCostArray.push(totalFoodCost)

    const totalSilverCost = this.slider.value * this.silverCost
    totalCostArray.push(totalSilverCost)

    const totalWeaponsCost = this.slider.value * this.weaponsCost
    totalCostArray.push(totalWeaponsCost)

    return totalCostArray
  }
}
