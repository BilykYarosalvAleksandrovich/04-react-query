import React from "react";
import type { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div
      className="movie-card"
      onClick={() => onSelect(movie)}
      style={{
        cursor: "pointer",
        textAlign: "center",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#222",
        color: "#fff",
      }}
    >
      <img
        src={imageUrl}
        alt={movie.title}
        style={{ width: "100%", borderBottom: "2px solid #444" }}
      />
      <h3 style={{ fontSize: "1rem", margin: "0.5rem" }}>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
