import fetch from "node-fetch";

const API_BASE = 'https://lernia-kino-cms.herokuapp.com/api';

function simplifyMovieObject(movie) {
  return {
    id: movie.id,
    ...movie.attributes,
  };
}

export async function loadAllMovies() {
  const response = await fetch(`${API_BASE}/movies`);
  const payload = await response.json();
  return payload.data.map(simplifyMovieObject);
}

export async function loadSingleMovie(id) {
  const response = await fetch(`${API_BASE}/movies/${id}`);
  if (response.ok) {
  const payload = await response.json();
  return simplifyMovieObject(payload.data);
  }
  return;
}
