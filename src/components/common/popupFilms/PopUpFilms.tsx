import { BsArrowRight } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import basePosterURL from "../../../tmdb/basePosterURL";
import getMonthDay from "../../../utils/getMonthDay";
import IGenre from "../../../models/IGenre";
import useDisableMainScrollbar from "../../../hooks/useDisableMainScrollbar";
import PopUpFilmsLoader from "./loader/PopUpFilmsLoader";
import ResultsDto from "../../../dtos/ResultsDto";

export interface IPopUpCategory {
  name: string;
  url: string;
}

interface IFilm {
  id: number;
  poster_path: string;
  title?: string;
  release_date?: string;
  name?: string;
  first_air_date?: string;
  genres: IGenre[];
}

interface Props<T extends IFilm> {
  category: IPopUpCategory;
  infiniteFilms: ResultsDto<T>[];
  isInitialLoading: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
  status: string;
  onClose: () => void;
}

function PopUpFilms<T extends IFilm>({
  category,
  status,
  infiniteFilms,
  isInitialLoading,
  isFetching,
  fetchNextPage,
  onClose,
}: Props<T>) {
  useDisableMainScrollbar(status);

  return (
    <div
      className={`popup ${status === "open" && "u__animation--popup-open"} ${
        status === "close" && "u__animation--popup-close"
      }`}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
    >
      <div
        className={`popup__content ${
          status === "open" && "u__animation--popup-content-open"
        } ${status === "close" && "u__animation--popup-content-close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="popup__header">
          <h2>{category.name}</h2>
          <BsArrowRight className="popup__back-icon" onClick={onClose} />
        </header>
        {isInitialLoading ? (
          <PopUpFilmsLoader />
        ) : (
          <div id="body" className="popup__body">
            {infiniteFilms.map((films, index) => (
              <InfiniteScroll
                key={index}
                next={fetchNextPage}
                hasMore={films.page <= films.total_pages}
                loader={isFetching && <PopUpFilmsLoader />}
                dataLength={infiniteFilms.length}
                scrollableTarget="body"
                scrollThreshold={0.9}
              >
                <ul className="popup__items">
                  <li>
                    {films.results
                      .filter((r) => r.poster_path)
                      .map((film) => (
                        <div key={film.id} className="popup__item">
                          <div className="popup__image">
                            <img
                              src={basePosterURL + film.poster_path}
                              alt="Poster"
                            />
                          </div>
                          <div className="popup__title">
                            {film?.title || film?.name}
                          </div>
                          {film?.release_date ? (
                            <div className="popup__release-date">
                              {getMonthDay(film?.release_date as string)}
                            </div>
                          ) : (
                            <div className="popup__release-date">
                              {getMonthDay(film?.first_air_date as string)}
                            </div>
                          )}
                          <div className="popup__genre">
                            <span
                              style={{
                                border: `1px solid ${
                                  film.genres[film.genres.length - 1]
                                    ?.borderColor
                                }`,
                              }}
                            >
                              {film.genres[film.genres.length - 1]?.name}
                            </span>
                          </div>
                        </div>
                      ))}
                  </li>
                </ul>
              </InfiniteScroll>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PopUpFilms;
