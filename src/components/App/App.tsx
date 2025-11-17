import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(false);
      const results = await fetchMovies(query);
      setMovies(results);
      if (results.length === 0) {
        toast("No movies found", { icon: "🔍" });
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
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
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {!loading && !error && (
          <MovieGrid movies={movies} onSelect={handleSelect} />
        )}
      </main>

      {selected && <MovieModal movie={selected} onClose={handleClose} />}
    </div>
  );
}

export default App;
