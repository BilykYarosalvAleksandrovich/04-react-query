import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string | undefined;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
  },
});

interface TmdbSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  if (!TOKEN) {
    // Без токена — безпечне повернення пустого масиву
    return [];
  }

  const params = {
    query,
    include_adult: false,
    language: "en-US",
    page: 1,
  };

  const response: AxiosResponse<TmdbSearchResponse> =
    await axiosInstance.get<TmdbSearchResponse>("/search/movie", { params });

  return response.data.results;
}
