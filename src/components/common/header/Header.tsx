import { VscStarFull } from "react-icons/vsc";
import { Link } from "react-router-dom";
import baseBackDropURL from "../../../tmdb/baseBackDropURL";
import IGenre from "../../../models/IGenre";
import getFullUrl from "../../../tmdb/getFullUrl";
import { IPopUpCategory } from "../popupFilms/PopUpFilms";

export interface IHeader {
  id: number;
  backgroundImageUrl: string;
  score: number;
  releaseDate: string;
  title: string;
  genres: IGenre[];
}

interface Props {
  of: string;
  discover: string;
  item: IHeader;
  onPopUpOpen: (e: React.MouseEvent, data: IPopUpCategory) => void;
}

function Header({ of, discover, item, onPopUpOpen }: Props) {
  return (
    <header
      className="header"
      style={{
        backgroundImage: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.2),
            rgba(5, 22, 30, 0.6),
            rgba(5, 22, 30, 1)
          ), url(${item && baseBackDropURL + item.backgroundImageUrl})`,
      }}
    >
      <div className="header__movie-details">
        <div className="header__movie-texts">
          {!!item?.score && !!item?.releaseDate && (
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
          )}
          {!!item?.title && (
            <Link to={`/${of}/${item.id}`} className="header__movie-title">
              {item?.title}
            </Link>
          )}
          <div className="header__movie-genres">
            {item?.genres.map((genre) => (
              <div key={genre.id}>
                {!!genre.id && (
                  <span
                    className="header__movie-genre"
                    style={{
                      border: `1px solid ${genre.borderColor}`,
                    }}
                    onClick={(e) =>
                      onPopUpOpen(e, {
                        name: genre.name,
                        url: getFullUrl(
                          `/discover/${discover}`,
                          `&with_genres=${genre.id}`
                        ),
                      })
                    }
                  >
                    {genre.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
