import getMonthDay from "../../../utils/getMonthDay";
import getGenre from "../../../utils/getGenre";
import { Link } from "react-router-dom";
import IMovie from "../../../models/IMovie";
import IGenre from "../../../models/IGenre";
import basePosterURL from "../../../tmdb/basePosterURL";

interface Props {
  icon: React.ReactNode;
  type: string;
  movies: IMovie[] | undefined;
  genres: IGenre[] | undefined;
}

function Slideshow({ icon, type, movies, genres }: Props) {
  return (
    <div className="slideshow">
      <div className="slideshow__header">
        <div className="slideshow__type">
          {icon}
          <span className="slideshow__type-text">{type}</span>
        </div>
      </div>
      <ul className="slideshow__items">
        {movies?.map((movie) => (
          <li>
            <Link to="/" className="slideshow__item">
              <div className="slideshow__image">
                <img
                  src={movie && basePosterURL + movie.poster_path}
                  alt="Poster"
                />
              </div>
              <div className="slideshow__title">{movie?.title}</div>
              <div className="slideshow__release-date">
                {getMonthDay(movie?.release_date as string)}
              </div>
              <div className="slideshow__genre">
                <Link to="/">
                  {!!genres && getGenre(movie?.genre_ids[0] as number, genres)}
                </Link>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Slideshow;
