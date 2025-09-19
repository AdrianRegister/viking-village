import {
  handleNextTurn,
  initGame,
  handleActivity,
  handleTrainingSlider,
} from "./utils/gameUtils.mjs"

document.addEventListener("DOMContentLoaded", () => {
  initGame()

  document
    .querySelector("#next-season-button")
    .addEventListener("click", (e) => {
      e.preventDefault()
      handleNextTurn()
    })

  document.querySelectorAll(".choose-activity-button").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault()
      handleActivity(e.target.dataset)
    })
  )

  document.querySelector("#train-warriors").addEventListener("input", (e) => {
    handleTrainingSlider(e)
  })
})
