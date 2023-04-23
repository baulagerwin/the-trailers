import IGenre from "../../../models/IGenre";
import basePosterURL from "../../../tmdb/basePosterURL";
import getMonthDay from "../../../utils/getMonthDay";
import Footer from "../footer/Footer";
import SearchFilmLoader from "./loader/SearchFilmLoader";

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
  isFetching: boolean;
  results: T[];
}

function SearchFilm<T extends IFilm>({ isFetching, results }: Props<T>) {
  return (
    <div className="search-film">
      <div className="search-film__body">
        {isFetching ? (
          <SearchFilmLoader />
        ) : (
          <ul className="search-film__results">
            {results
              .filter((r) => r.poster_path)
              .map((film) => (
                <li key={film.id}>
                  {film && (
                    <div className="search-film__result">
                      <div className="search-film__image">
                        <img
                          src={basePosterURL + film.poster_path}
                          alt="Poster of the Film"
                        />
                      </div>
                      <div className="search-film__title">
                        {film?.title || film?.name}
                      </div>
                      {film?.release_date ? (
                        <div className="search-film__release-date">
                          {getMonthDay(film?.release_date as string)}
                        </div>
                      ) : (
                        <div className="search-film__release-date">
                          {getMonthDay(film?.first_air_date as string)}
                        </div>
                      )}
                      {!!film.genres[film.genres.length - 1] && (
                        <div className="search-film__genre">
                          <span
                            style={{
                              border: `1px solid ${
                                film.genres[film.genres.length - 1]?.borderColor
                              }`,
                            }}
                          >
                            {film.genres[film.genres.length - 1]?.name}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchFilm;
