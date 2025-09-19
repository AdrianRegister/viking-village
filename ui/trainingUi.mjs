import { GAME } from "../game/game.mjs"

export class TrainingUI {
  constructor() {
    this.slider = document.querySelector("#train-warriors")
    this.sliderLabel = document.querySelector("#train-warriors-label")
    this.trainingCostText = document.querySelector("#train-warriors-cost")
    this.trainingButton = document.querySelector(".training-button")

    this.foodCost
    this.silverCost
  }

  initTrainWarriorsSlider() {
    const totalPopulation = GAME.resources.population
    const initSliderValue = Math.floor(parseInt(totalPopulation) / 2)

    this.slider.max = totalPopulation
    this.slider.value = initSliderValue

    this.handleTrainWarriorsSliderText()
  }

  checkToDisableTrainingButton() {
    const totalFood = GAME.resources.food
    const totalSilver = GAME.resources.silver

    if (this.foodCost > totalFood || this.silverCost > totalSilver) {
      this.trainingButton.disabled = true
    } else {
      this.trainingButton.disabled = false
    }
  }

  handleTrainWarriorsSliderInput(event) {
    this.handleTrainWarriorsSliderText(true, event)
    this.checkToDisableTrainingButton()
  }

  handleTrainWarriorsSliderText(isEvent = false, event = {}) {
    if (isEvent) {
      this.slider.value = event.target.value
    }

    this.foodCost = this.slider.value * 5
    this.silverCost = this.slider.value * 3

    this.sliderLabel.innerHTML = `${this.slider.value} warriors`
    this.trainingCostText.innerHTML = `Cost to train: ${this.foodCost} food. ${this.silverCost} silver.`
  }
}
