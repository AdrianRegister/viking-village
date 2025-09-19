import { TrainingUI } from "../ui/trainingUi.mjs"

document.addEventListener("DOMContentLoaded", () => {
  const trainWarriorsRange = document.querySelector("#train-warriors")

  const trainingUI = new TrainingUI()
  trainingUI.initTrainWarriorsSlider()

  trainWarriorsRange.addEventListener("input", (e) => {
    trainingUI.handleTrainWarriorsSliderInput(e, trainWarriorsRange)
  })
})
