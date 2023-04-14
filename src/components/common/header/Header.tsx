import { VscStarFull } from "react-icons/vsc";
import { Link } from "react-router-dom";
import baseBackDropURL from "../../../tmdb/baseBackDropURL";
import IGenre from "../../../models/IGenre";

export interface IHeader {
  backgroundImageUrl: string;
  score: number;
  releaseDate: string;
  title: string;
  genres: IGenre[];
}

interface Props {
  item: IHeader;
}

function Header({ item }: Props) {
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
          ), url(${item && baseBackDropURL + item.backgroundImageUrl})`,
      }}
    >
      <div className="header__movie-details">
        <div className="header__movie-texts">
          <div className="header__movie-data">
            <VscStarFull className="header__movie-star" />
            <span className="header__movie-rating">
              {item?.score.toFixed(1)}
            </span>
            |
            <span className="header__movie-date">
              {item?.releaseDate.replace(/.{6}$/, "")}
            </span>
          </div>
          <Link to="/" className="header__movie-title">
            {item?.title}
          </Link>
          <div className="header__movie-genres">
            {item?.genres.map((genre) => (
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
