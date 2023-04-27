import { VscStarFull } from "react-icons/vsc";
import { Link } from "react-router-dom";
import IGenre from "../../../models/IGenre";
import getFullUrl from "../../../tmdb/getFullUrl";
import { IPopUpCategory } from "../popupFilms/PopUpFilms";
import BackgroundFilm from "../backgroundFilm/BackgroundFilm";
import GenreButton from "../genreButton/GenreButton";

export interface IHeaderFilm {
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
  item: IHeaderFilm;
  onPopUpOpen: (e: React.MouseEvent, data: IPopUpCategory) => void;
}

function HeaderFilm({ of, discover, item, onPopUpOpen }: Props) {
  return (
    <BackgroundFilm backgroundImageUrl={item.backgroundImageUrl}>
      <div className="header-film__details">
        <div className="header-film__texts">
          {!!item?.score && !!item?.releaseDate && (
            <div className="header-film__data">
              <VscStarFull className="header-film__star" />
              <span className="header-film__rating">
                {item?.score.toFixed(1)}
              </span>
              |
              <span className="header-film__date">
                {item?.releaseDate.replace(/.{6}$/, "")}
              </span>
            </div>
          )}
          {!!item?.title && (
            <Link to={`/${of}/${item.id}`} className="header-film__title">
              {item?.title}
            </Link>
          )}
          {!!item?.genres.length && (
            <div className="header-film__genres">
              {item?.genres.map((genre) => (
                <GenreButton key={genre.id} genre={genre}>
                  <div
                    className="u__overlay--cover"
                    onClick={(e) =>
                      onPopUpOpen(e, {
                        name: genre.name,
                        url: getFullUrl(
                          `/discover/${discover}`,
                          `&with_genres=${genre.id}`
                        ),
                      })
                    }
                  />
                </GenreButton>
              ))}
            </div>
          )}
        </div>
      </div>
    </BackgroundFilm>
  );
}

export default HeaderFilm;
