import IGenre from "../../../models/IGenre";
import Footer from "../footer/Footer";

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
  results: T[];
}

function Search<T extends IFilm>({ results }: Props<T>) {
  return (
    <div className="search">
      <div className="search__body">
        <ul className="search__results">
          {results.map((film) => (
            <li className="search__result">{film.name || film.title}</li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Search;
