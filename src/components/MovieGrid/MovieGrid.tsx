import type { FC } from "react";
import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid: FC<MovieGridProps> = ({ movies, onSelect }) => {
  if (movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div className={styles.grid}>
      {movies.map((m) => (
        <div key={m.id} onClick={() => onSelect(m)} className={styles.card}>
          <img
            className={styles.image}
            src={
              m.poster_path
                ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
                : "/placeholder.png"
            }
            alt={m.title}
          />
          <h3 className={styles.title}>{m.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
