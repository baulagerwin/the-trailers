import IGenre from "../../../models/IGenre";
import basePosterURL from "../../../tmdb/basePosterURL";
import getMonthDay from "../../../utils/getMonthDay";
import Footer from "../footer/Footer";
import Poster from "../poster/Poster";
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
                <li key={film.id}>{film && <Poster item={film} />}</li>
              ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchFilm;
