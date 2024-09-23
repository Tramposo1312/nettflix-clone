import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getTrending = () => tmdbApi.get('/trending/all/week');
export const getMoviesByGenre = (genreId) => tmdbApi.get('/discover/movie', {
    params: { with_genres: genreId }
  });
export const getGenres = () => tmdbApi.get('/genre/movie/list');
export const getMovieDetails = (movieId) => tmdbApi.get(`/movie/${movieId}`);
export const searchMovies = (query) => tmdbApi.get('/search/movie', { params: { query } });