import { BsArrowRight } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import IGenre from "../../../models/IGenre";
import useDisableMainScrollbar from "../../../hooks/useDisableMainScrollbar";
import PopUpFilmsLoader from "./loader/PopUpFilmsLoader";
import ResultsDto from "../../../dtos/ResultsDto";
import Poster from "../poster/Poster";

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
                <ul className="popup__films">
                  <li>
                    {films.results
                      .filter((r) => r.poster_path)
                      .map((film) => (
                        <Poster key={film.id} item={film} />
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
