import { GAME } from "../game/game.mjs"

document.addEventListener("DOMContentLoaded", () => {
  const trainWarriorsRange = document.querySelector("#train-warriors")
  initTrainWarriorsSlider()

  trainWarriorsRange.addEventListener("input", (e) => {
    handleTrainWarriorsSliderInput(e, trainWarriorsRange)
  })
})

export function initTrainWarriorsSlider() {
  const slider = document.querySelector("#train-warriors")
  const totalPopulation = getPopulation()
  const initSliderValue = Math.floor(parseInt(totalPopulation) / 2)

  slider.max = totalPopulation
  slider.value = initSliderValue

  document.querySelector(
    "#train-warriors-label"
  ).innerHTML = `${slider.value} warriors`
}

function handleTrainWarriorsSliderInput(event) {
  document.querySelector(
    "#train-warriors-label"
  ).innerHTML = `${event.target.value} warriors`
}

function getPopulation() {
  return GAME.resources.population
}
