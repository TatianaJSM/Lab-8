import { cleanHTML, getImage, getRating } from "./helpers.js";

export function renderShows(shows, container) {
  container.innerHTML = "";

  if (shows.length === 0) {
    container.innerHTML = "<p class='message'>No se encontraron series.</p>";
    return;
  }

  shows.forEach(show => {
    const card = document.createElement("article");
    card.classList.add("show-card");
    card.dataset.id = show.id;

    card.innerHTML = `
      <img src="${getImage(show)}" alt="${show.name}" />

      <div class="show-info">
        <h2>${show.name}</h2>
        <p>${show.genres.length > 0 ? show.genres.join(", ") : "Sin género"}</p>
        <p>⭐ Rating: ${getRating(show)}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

export function renderLoading(container) {
  container.classList.remove("hidden");
  container.innerHTML = "<p class='message'>Cargando información...</p>";
}

export function renderError(container, message) {
  container.classList.remove("hidden");
  container.innerHTML = `<p class='message'>${message}</p>`;
}

export function renderShowDetails(show, seasons, container) {
  container.classList.remove("hidden");

  container.innerHTML = `
    <button id="back-btn" class="back-btn">← Atrás</button>

    <div class="details-layout">
      <div>
        <img src="${getImage(show)}" alt="${show.name}" />
      </div>

      <div class="details-info">
        <h2>${show.name}</h2>

        <div class="rating-box">
          ⭐ Rating: ${getRating(show)}
        </div>

        <p>${cleanHTML(show.summary)}</p>
        <p><strong>Idioma:</strong> ${show.language || "No disponible"}</p>
        <p><strong>Estado:</strong> ${show.status || "No disponible"}</p>
        <p><strong>Géneros:</strong> ${show.genres.length > 0 ? show.genres.join(", ") : "No disponible"}</p>

        <h2>Temporadas y episodios</h2>

        ${seasons.map(season => `
          <section class="season">
            <h3>
             Temporada ${season.number}
             <span class="season-rating">⭐ ${season.rating && season.rating.average ? season.rating.average : "Sin rating"}</span>
            </h3>

            ${season.episodes.map(episode => `
              <div class="episode">
                <strong>${episode.number || "Especial"}. ${episode.name}</strong>
                <p>${cleanHTML(episode.summary)}</p>
              </div>
            `).join("")}
          </section>
        `).join("")}
      </div>
    </div>
  `;
}