import { handleNextTurn, initGame, handleForage } from "./utils/gameUtils.mjs"

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

      const resourceFocused = e.target.dataset.foraging
      handleForage(resourceFocused)
    })
  )
})
