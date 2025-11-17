import { useState, useEffect } from "react";
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
  const [selected, setSelected] = useState<Movie | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],

    queryFn: () => fetchMovies(query, page),

    enabled: !!query,

    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data.total_pages);

      if (data.results.length === 0 && query.trim() !== "") {
        toast("No movies found", { icon: "🔍" });
      }
    }
  }, [data, query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;
    setPage(newPage);
  };

  const movies = data?.results || [];

  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      <main style={{ padding: "20px" }}>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}

        {/* Відображаємо, лише якщо не завантажується і немає помилки */}
        {!isLoading && !isError && (
          <>
            <MovieGrid movies={movies} onSelect={setSelected} />

            {movies.length > 0 && (
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={handlePageClick}
                pageCount={totalPages}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
              />
            )}
          </>
        )}
      </main>

      {selected && (
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

export default App;
