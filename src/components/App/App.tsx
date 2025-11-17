import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.length > 0,
    staleTime: 1000 * 60, // 1 min cache
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleSelect = (movie: Movie) => {
    setSelected(movie);
  };

  const handleClose = () => {
    setSelected(null);
  };

  return (
    <div>
      <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearch} />

      <main style={{ padding: "20px" }}>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}

        {!isLoading && !isError && (
          <>
            <MovieGrid movies={movies} onSelect={handleSelect} />

            {totalPages > 1 && (
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setPage(selected + 1)}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
              />
            )}
          </>
        )}
      </main>

      {selected && <MovieModal movie={selected} onClose={handleClose} />}
    </div>
  );
}

export default App;
