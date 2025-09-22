export class UIGenerator {
  renderUI() {
    this.#renderResourcesBar()
    this.#renderSpecialResourcesBar()
    this.#renderSeason()
    this.#renderYear()
  }

  renderActivityPopup(activityType, activityResult) {
    const container = document.createElement("div")
    container.classList.add("activity-popup")

    const html = `
        <div class="activity-image">
          <img />
        </div>
        <div class="activity-text">ACTIVITY TEXT HERE</div>
        <div>
          <button class="close-activity-button">CLOSE</button>
        </div>
    `

    container.innerHTML = html
    document.querySelector("#root").appendChild(container)

    document.querySelector(".activity-text").innerHTML = `
      <h3>${activityType}</h3><h5>${activityResult}</h5>
    `

    document
      .querySelector(".close-activity-button")
      .addEventListener("click", (e) => {
        e.preventDefault()
        this.closePopup(".activity-popup")
      })
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
        this.closePopup(".event-popup")
      })
  }

  closePopup(cssClass) {
    document.querySelector(cssClass).remove()
  }

  #renderYear() {
    const html = `
      <div class="bar-container">
        <span>Year</span>
        <span id="current-year"></span>
      </div>
    `

    document.querySelector("#year-indicator").innerHTML = html
  }

  #renderSeason() {
    const html = `
      <div class="bar-container">
        <span>Season</span>
        <span id="current-season"></span>
      </div>
    `

    document.querySelector("#season-indicator").innerHTML = html
  }

  #renderResourcesBar() {
    const html = `
      <div class="bar-container">
        <span>Population</span>
        <div>
          <span id="population-count"></span>
          <span id="population-per-season"></span>
        </div>
      </div>
      <div class="bar-container">
        <span>Food</span>
        <div>
          <span id="food-count"></span>
          <span id="food-per-season"></span>
        </div>
      </div>
      <div class="bar-container">
        <span>Wood</span>
        <div>
          <span id="wood-count"></span>
          <span id="wood-per-season"></span>
        </div>
      </div>
      <div class="bar-container">
        <span>Silver</span>
        <div>
          <span id="silver-count"></span>
          <span id="silver-per-season"></span>
        </div>
      </div>
      <div class="bar-container">
        <span>Morale</span>
        <div>
          <span id="morale-count"></span>
          <span id="morale-per-season"></span>
        </div>
      </div>
    `

    document.querySelector("#resources-bar").innerHTML = html
  }

  #renderSpecialResourcesBar() {
    const html = `
      <div class="bar-container">
        <span>Warriors</span>
        <div>
          <span id="warriors-count"></span>
        </div>
      </div>
      <div class="bar-container">
        <span>Weapons</span>
        <div>
          <span id="weapons-count"></span>
        </div>
      </div>
      <div class="bar-container">
        <span>Jewellery</span>
        <div>
          <span id="jewellery-count"></span>
        </div>
      </div>
    `

    document.querySelector("#special-resources-bar").innerHTML = html
  }
}
