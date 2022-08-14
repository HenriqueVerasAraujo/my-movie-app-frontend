// export const urlApi = 'https://watchables-app.herokuapp.com';
export  const urlApi = 'http://localhost:3001';

const apiKey = process.env.REACT_APP_KEY
export const defaultSearchMovie = 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key=c2271adbcffead532490cc4d5ccb496a&query=batman';
export const newSearchMovie = `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key=${apiKey}&query=`;

export const movieById = (movie_id) => `https://api.themoviedb.org/3/movie/${movie_id}?sort_by=popularity.desc&api_key=${apiKey}&language=en-US`;
export const movieCastById = (movie_id) => `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}&language=en-US`;
export const findActorName = (actor_name) => `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=en-US&query=${actor_name}&page=1&include_adult=false`;
export const findMovieByActorId = (actor_id) => `https://api.themoviedb.org/3/discover/movie?with_cast=${actor_id}&sort_by=popularity.desc&api_key=${apiKey}&page=1`;
export const findMovieByGenreId = (genre_id) => `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${genre_id}`;
export const trendingMovies = () => `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
export const popularMovies = () => `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
export const nowPlaying = () => `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
export const recomendById = (movie_id) => `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${apiKey}&language=en-US&page=1`
