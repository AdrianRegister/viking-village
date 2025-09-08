export class UIGenerator {
  renderUI() {
    this.#renderResourcesBar()
    this.#renderSeason()
    this.#renderYear()
  }

  renderRandomEventPopup(randomEvent) {
    const container = document.createElement("div")
    container.classList.add("event-popup")

    const html = `
        <div class="event-image">
          <img />
        </div>
        <div class="event-text">EVENT TEXT HERE</div>
        <div>
          <button class="close-event-button">CLOSE</button>
        </div>
    `
    container.innerHTML = html
    document.querySelector("#root").appendChild(container)

    const { name, description } = randomEvent
    document.querySelector(".event-text").innerHTML = `
      <h3>${name}</h3><h5>${description}</h5>
    `

    document
      .querySelector(".close-event-button")
      .addEventListener("click", (e) => {
        e.preventDefault()
        this.closeRandomEventPopup()
      })
  }

  closeRandomEventPopup() {
    document.querySelector(".event-popup").remove()
  }

  #renderYear() {
    const html = `
      <div class="bar-container">
        <span>Year: </span>
        <span id="current-year"></span>
      </div>
    `

    document.querySelector("#year-indicator").innerHTML = html
  }

  #renderSeason() {
    const html = `
      <div class="bar-container">
        <span>Season: </span>
        <span id="current-season"></span>
      </div>
    `

    document.querySelector("#season-indicator").innerHTML = html
  }

  #renderResourcesBar() {
    const html = `
      <div class="bar-container">
        <span>Population: </span>
        <span id="population-count"></span>
        <span id="population-per-season"></span>
      </div>
      <div class="bar-container">
        <span>Food: </span>
        <span id="food-count"></span>
        <span id="food-per-season"></span>
      </div>
      <div class="bar-container">
        <span>Wood: </span>
        <span id="wood-count"></span>
        <span id="wood-per-season"></span>
      </div>
      <div class="bar-container">
        <span>Silver: </span>
        <span id="silver-count"></span>
        <span id="silver-per-season"></span>
      </div>
      <div class="bar-container">
        <span>Morale: </span>
        <span id="morale-count"></span>
        <span id="morale-per-season"></span>
      </div>
    `

    document.querySelector("#resources-bar").innerHTML = html
  }
}
