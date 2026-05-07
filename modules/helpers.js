export function cleanHTML(text) {
  if (!text) {
    return "Sin descripción disponible.";
  }

  return text
    .replaceAll("<p>", "")
    .replaceAll("</p>", "")
    .replaceAll("<b>", "")
    .replaceAll("</b>", "")
    .replaceAll("<i>", "")
    .replaceAll("</i>", "");
}

export function getImage(show) {
  if (show.image && show.image.medium) {
    return show.image.medium;
  }

  return "https://via.placeholder.com/210x295?text=Sin+Imagen";
}

export function getRating(show) {
  if (show.rating && show.rating.average) {
    return show.rating.average;
  }

  return "No disponible";
}