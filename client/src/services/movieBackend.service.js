import Axios from 'axios'

const PORT = 4000
const backend = Axios.create({ baseURL: `http://localhost:${PORT}/` })

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'

export const getMovie = async (movieId) => {
  const response = await backend.get(`/movie/${movieId}`)
  return response.data
}

export const getActors = async (movieId) => {
  const response = await backend.get(`/movie/${movieId}/cast`)
  return response.data
}

export const getPopularMovies = async () => {
  const response = await backend.get('/movie/popular')
  return response.data
}

export const getMoviesByQuery = async (searchTerm) => {
  const response = await backend.get('/movie/search', {
    params: {
      query: searchTerm
    }
  })

  return response.data
}

export const getGenres = async () => {
  const response = await backend.get('/genres')
  return response.data
}

export const getMoviesByGenre = async (genreId) => {
  const response = await backend.get('/discover/movie', {
    params: {
      genre: genreId
    }
  })

  return response.data
}
