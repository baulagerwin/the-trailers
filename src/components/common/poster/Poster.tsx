import { Link } from "react-router-dom";
import IGenre from "../../../models/IGenre";
import basePosterURL from "../../../tmdb/basePosterURL";
import getMonthDay from "../../../utils/getMonthDay";

interface IPoster {
  id: number;
  poster_path: string;
  title?: string;
  release_date?: string;
  name?: string;
  first_air_date?: string;
  genres: IGenre[];
}

interface Props {
  item: IPoster;
}

function Poster({ item }: Props) {
  let lastGenre = item.genres[item.genres.length - 1];

  return (
    <Link
      to={`${
        item?.release_date ? `/movies/${item.id}` : `/tv-shows/${item.id}`
      }`}
      className="poster"
    >
      <div className="poster__image">
        <img src={basePosterURL + item.poster_path} alt="Poster" />
      </div>
      <div className="poster__title">{item?.title || item?.name}</div>
      {item?.release_date ? (
        <span className="poster__release-date">
          {getMonthDay(item?.release_date as string)}
        </span>
      ) : (
        <span className="poster__release-date">
          {getMonthDay(item?.first_air_date as string)}
        </span>
      )}
      <div className="poster__genre">
        {lastGenre?.borderColor && (
          <span
            style={{
              border: `1px solid ${lastGenre?.borderColor}`,
            }}
          >
            {lastGenre?.name}
          </span>
        )}
      </div>
    </Link>
  );
}

export default Poster;
