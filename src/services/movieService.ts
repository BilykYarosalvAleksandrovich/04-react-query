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

export async function fetchMovies(query: string, page: number) {
  if (!TOKEN) return { results: [], total_pages: 0 };

  const params = {
    query,
    include_adult: false,
    language: "en-US",
    page,
  };

  const response: AxiosResponse<TmdbSearchResponse> =
    await axiosInstance.get<TmdbSearchResponse>("/search/movie", { params });

  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
}
