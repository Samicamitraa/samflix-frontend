const API_URL = 'http://localhost:5050/api'

export async function getMovies() {
  const res = await fetch(`${API_URL}/movies`)
  if (!res.ok) throw new Error('Failed to fetch movies')
  return res.json()
}

export async function getMovieById(id) {
  const res = await fetch(`${API_URL}/movies/${id}`)
  if (!res.ok) throw new Error('Failed to fetch movie')
  return res.json()
}