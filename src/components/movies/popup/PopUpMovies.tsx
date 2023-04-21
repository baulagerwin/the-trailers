import basePosterURL from "../../../tmdb/basePosterURL";
import getMonthDay from "../../../utils/getMonthDay";
import PopUp from "../../common/popup/PopUp";
import { BsArrowRight } from "react-icons/bs";
import IMovie from "../../../models/IMovie";
import InfiniteScroll from "react-infinite-scroll-component";

export interface IPopUpCategory {
  name: string;
  url: string;
}

interface Props {
  category: IPopUpCategory;
  status: string;
  infiniteMovies: IMovie[][];
  fetchNextPage: () => void;
  onClose: () => void;
}

function usePopUpMovies({
  category,
  status,
  infiniteMovies,
  fetchNextPage,
  onClose,
}: Props) {
  return (
    <PopUp status={status} onClose={onClose}>
      <div className="popup-movies">
        <header className="popup-movies__header">
          <h2>{category.name}</h2>
          <BsArrowRight className="popup-movies__back-icon" onClick={onClose} />
        </header>
        <div id="body" className="popup-movies__body">
          <InfiniteScroll
            next={fetchNextPage}
            hasMore={true}
            loader={null}
            dataLength={infiniteMovies.length}
            scrollableTarget="body"
            scrollThreshold={0.96}
          >
            <ul className="popup-movies__items">
              {infiniteMovies.map((movies, index) => (
                <li key={index}>
                  {movies.map((movie) => (
                    <div key={movie.id} className="popup-movies__item">
                      <div className="popup-movies__image">
                        <img
                          src={basePosterURL + movie.poster_path}
                          alt="Poster"
                        />
                      </div>
                      <div className="popup-movies__title">{movie?.title}</div>
                      <div className="popup-movies__release-date">
                        {getMonthDay(movie?.release_date as string)}
                      </div>
                      <div className="popup-movies__genre">
                        <span
                          style={{
                            border: `1px solid ${
                              movie.genres[movie.genres.length - 1]?.borderColor
                            }`,
                          }}
                        >
                          {movie.genres[movie.genres.length - 1]?.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        </div>
      </div>
    </PopUp>
  );
}

export default usePopUpMovies;
