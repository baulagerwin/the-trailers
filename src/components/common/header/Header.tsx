import { VscStarFull } from "react-icons/vsc";
import { Link } from "react-router-dom";
import baseBackDropURL from "../../../tmdb/baseBackDropURL";
import IMovie from "../../../models/IMovie";
import IGenre from "../../../models/IGenre";

interface Props {
  movie: IMovie | undefined;
  genres: IGenre[] | undefined;
}

function Header({ movie, genres }: Props) {
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
            <span className="header__movie-rating">{movie?.vote_average}</span>|
            <span className="header__movie-date">
              {movie?.release_date.replace(/.{6}$/, "")}
            </span>
          </div>
          <Link to="/" className="header__movie-title">
            {movie?.title}
          </Link>
          <div className="header__movie-genres">
            {genres?.map((genre) => (
              <Link key={genre.id} to="/" className="header__movie-genre">
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
