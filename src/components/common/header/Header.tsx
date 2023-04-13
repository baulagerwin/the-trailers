import { VscStarFull } from "react-icons/vsc";
import { Link } from "react-router-dom";
import baseBackDropURL from "../../../tmdb/baseBackDropURL";
import IMovie from "../../../models/IMovie";

interface Props {
  movie: IMovie;
}

function Header({ movie }: Props) {
  return (
    <header
      className="header"
      style={{
        backgroundImage: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.3),
            rgba(5, 22, 30, 0.6),
            rgba(5, 22, 30, 1)
          ), url(${movie && baseBackDropURL + movie.backdrop_path})`,
      }}
    >
      <div className="header__movie-details">
        <div className="header__movie-texts">
          <div className="header__movie-data">
            <VscStarFull className="header__movie-star" />
            <span className="header__movie-rating">
              {movie?.vote_average.toFixed(1)}
            </span>
            |
            <span className="header__movie-date">
              {movie?.release_date.replace(/.{6}$/, "")}
            </span>
          </div>
          <Link to="/" className="header__movie-title">
            {movie?.title}
          </Link>
          <div className="header__movie-genres">
            {movie?.genres.map((genre) => (
              <span
                key={genre.id}
                className="header__movie-genre"
                style={{ border: `1px solid ${genre.borderColor}` }}
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
