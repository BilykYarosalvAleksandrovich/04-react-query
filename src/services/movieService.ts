import axios from "axios";
import type { AxiosResponse } from "axios";
import type { MoviesResponse } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string | undefined;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
  },
});

export async function fetchMovies(query: string, page: number) {
  if (!TOKEN) return { results: [], total_pages: 1 };

  const params = {
    query,
    include_adult: false,
    language: "en-US",
    page,
  };

  const response: AxiosResponse<MoviesResponse> =
    await axiosInstance.get<MoviesResponse>("/search/movie", { params });

  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
}
