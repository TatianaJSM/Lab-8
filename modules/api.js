const BASE_URL = "https://api.tvmaze.com";

export async function searchShows(query) {
  const response = await fetch(`${BASE_URL}/search/shows?q=${query}`);

  if (!response.ok) {
    throw new Error("Error al buscar series");
  }

  const data = await response.json();
  return data.map(item => item.show);
}

export async function getSeasons(showId) {
  const response = await fetch(`${BASE_URL}/shows/${showId}/seasons`);

  if (!response.ok) {
    throw new Error("Error al obtener temporadas");
  }

  return await response.json();
}

export async function getEpisodesBySeason(seasonId) {
  const response = await fetch(`${BASE_URL}/seasons/${seasonId}/episodes`);

  if (!response.ok) {
    throw new Error("Error al obtener episodios");
  }

  return await response.json();
}

export async function getFullShowDetails(showId) {
  const seasons = await getSeasons(showId);

  const seasonsWithEpisodes = await Promise.all(
    seasons.map(async season => {
      const episodes = await getEpisodesBySeason(season.id);

      return {
        ...season,
        episodes
      };
    })
  );

  return seasonsWithEpisodes;
}