import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string | undefined;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
  },
});

export async function fetchMovies(
  query: string,
  page: number
): Promise<MoviesResponse> {
  if (!TOKEN) return { results: [], total_pages: 1, page: 1, total_results: 0 };

  const params = {
    query,
    include_adult: false,
    language: "en-US",
    page,
  };

  const response: AxiosResponse<MoviesResponse> =
    await axiosInstance.get<MoviesResponse>("/search/movie", { params });

  return response.data;
}
