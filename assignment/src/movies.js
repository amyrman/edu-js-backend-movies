import fetch from "node-fetch";

const API_BASE = 'https://lernia-kino-cms.herokuapp.com/api';

function simplifyMovieObject(movie) {
  return {
    id: movie.id,
    ...movie.attributes,
  };
}

export async function loadAllMovies() {
  const res = await fetch(`${API_BASE}/movies`);
  const payload = await res.json();
  return payload.data.map(simplifyMovieObject);
}

export async function loadSingleMovie(id) {
  const res = await fetch(`${API_BASE}/movies/${id}`);
  const payload = await res.json();
  return simplifyMovieObject(payload.data);
}
