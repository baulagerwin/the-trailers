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
    <div className="poster">
      <div className="poster__image">
        <img src={basePosterURL + item.poster_path} alt="Poster" />
      </div>
      <div className="poster__title">{item?.title || item?.name}</div>
      {item?.release_date ? (
        <div className="poster__release-date">
          {getMonthDay(item?.release_date as string)}
        </div>
      ) : (
        <div className="poster__release-date">
          {getMonthDay(item?.first_air_date as string)}
        </div>
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
    </div>
  );
}

export default Poster;
