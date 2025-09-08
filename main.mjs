import { handleNextTurn, initGame } from "./utils/gameUtils.mjs"

document.addEventListener("DOMContentLoaded", () => {
  initGame()

  document
    .querySelector("#next-season-button")
    .addEventListener("click", (e) => {
      e.preventDefault()
      handleNextTurn()
    })
})
