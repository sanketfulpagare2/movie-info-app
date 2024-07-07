import axios from "axios";
import { API_KEY } from "../constants";

// https://api.themoviedb.org/3

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/all/day?api_key=${API_KEY}`;
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}`;
const searchMoviesEndPoint = `${apiBaseUrl}/search/movie?api_key=${API_KEY}`;

const personsDetailsEndPoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${API_KEY}`;
const personsMoviesEndPoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${API_KEY}`;

const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${API_KEY}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("Error" + error);
    return {};
  }
};
export const fetchTrendingMovies = async () => {
  return apiCall(trendingMoviesEndPoint);
};

export const fetchUpcomingMovies = async () => {
  return apiCall(upcomingMoviesEndPoint);
};
export const fetchTopRatedMovies = async () => {
  return apiCall(topRatedMoviesEndPoint);
};

export const fetchMovieDetails = async (id) => {
  return apiCall(movieDetailsEndpoint(id));
};
export const fetchMovieCredits = async (id) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = async (id) => {
  return apiCall(similarMoviesEndpoint(id));
};
export const fetchPersonDetails = async (id) => {
  return apiCall(personsDetailsEndPoint(id));
};
export const fetchPersonMovies= async (id) => {
  return apiCall(personsMoviesEndPoint(id));
};
export const searchMovies= async (params) => {
  return apiCall(searchMoviesEndPoint,params);
};

