import { searchShows, getFullShowDetails } from "./modules/api.js";

import {
  renderShows,
  renderShowDetails,
  renderLoading,
  renderError
} from "./modules/ui.js";

const app = document.querySelector(".app");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const showsContainer = document.querySelector("#shows-container");
const detailsContainer = document.querySelector("#details-container");

let currentShows = [];

async function loadInitialShows() {
  try {
    renderLoading(showsContainer);

    currentShows = await searchShows("girls");
    renderShows(currentShows, showsContainer);

    detailsContainer.innerHTML = "";
    detailsContainer.classList.add("hidden");
    app.classList.remove("details-active");
  } catch (error) {
    renderError(showsContainer, "No se pudieron cargar las series.");
  }
}

searchForm.addEventListener("submit", async event => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query === "") {
    renderError(showsContainer, "Debes escribir el nombre de una serie.");
    return;
  }

  try {
    renderLoading(showsContainer);

    detailsContainer.innerHTML = "";
    detailsContainer.classList.add("hidden");
    app.classList.remove("details-active");

    currentShows = await searchShows(query);
    renderShows(currentShows, showsContainer);
  } catch (error) {
    renderError(showsContainer, "Ocurrió un error al buscar la serie.");
  }
});

showsContainer.addEventListener("click", async event => {
  const card = event.target.closest(".show-card");

  if (!card) return;

  const showId = Number(card.dataset.id);
  const selectedShow = currentShows.find(show => show.id === showId);

  try {
    app.classList.add("details-active");
    renderLoading(detailsContainer);

    const seasons = await getFullShowDetails(showId);
    renderShowDetails(selectedShow, seasons, detailsContainer);
  } catch (error) {
    renderError(detailsContainer, "No se pudieron cargar las temporadas y episodios.");
  }
});

detailsContainer.addEventListener("click", event => {
  const backButton = event.target.closest("#back-btn");

  if (!backButton) return;

  detailsContainer.innerHTML = "";
  detailsContainer.classList.add("hidden");
  app.classList.remove("details-active");
});

loadInitialShows();