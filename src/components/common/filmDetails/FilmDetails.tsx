import { TiArrowForwardOutline } from "react-icons/ti";
import GenreButton from "../genreButton/GenreButton";
import IGenre from "../../../models/IGenre";
import { BsFillPlayFill } from "react-icons/bs";
import getMonthDayYear from "../../../utils/getMonthDayYear";
import getSeparatedNumber from "../../../utils/getSeparatedNumber";
import Swiper from "../swiper/Swiper";
import SwiperItem from "../swiper/SwiperItem";
import ICast from "../../../models/ICast";
import Frame from "../frame/Frame";
import ICrew from "../../../models/ICrew";

interface IFilm {
  tagline: string;
  title?: string;
  name?: string;
  genres: IGenre[];
  homepage: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  revenue?: number;
  runtime?: number;
  overview: string;
  production_companies?: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
}

interface Props<T extends IFilm> {
  film: T;
  casts: ICast[];
  crews: ICrew[];
}

function FilmDetails<T extends IFilm>({ film, casts, crews }: Props<T>) {
  const isEmptyImage = crews.every((crew) => !Boolean(crew.profile_path));

  return (
    <div className="film-details">
      {!!film?.tagline && (
        <span className="film-details__tagline">{film?.tagline}</span>
      )}
      <h1>{film?.title || film?.name}</h1>
      <div className="film-details__buttons">
        <div className="film-details__genres">
          {film?.genres.map((genre) => (
            <GenreButton key={genre.id} children={null} genre={genre} />
          ))}
        </div>
        <a
          href={
            !!film?.homepage
              ? film?.homepage
              : "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
          }
          target="_blank"
          className="film-details__link"
        >
          <TiArrowForwardOutline />
        </a>
      </div>
      <Swiper>
        <ul className="film-details__main-details">
          <SwiperItem whenClick={() => {}}>
            <div className="film-details__main-details-item film-details__trailer-button">
              <BsFillPlayFill className="film-details__trailer-icon" />
            </div>
          </SwiperItem>
          <SwiperItem whenClick={() => {}}>
            <div className="film-details__main-details-item">
              <span>Rating</span>
              {film?.vote_average.toFixed(1)}
            </div>
          </SwiperItem>
          {!!film?.release_date && (
            <SwiperItem whenClick={() => {}}>
              <div className="film-details__main-details-item">
                <span>Release</span>
                {getMonthDayYear(film?.release_date)}
              </div>
            </SwiperItem>
          )}
          {!!film?.first_air_date && (
            <SwiperItem whenClick={() => {}}>
              <div className="film-details__main-details-item">
                <span>Release</span>
                {getMonthDayYear(film?.first_air_date)}
              </div>
            </SwiperItem>
          )}
          {!!film?.revenue && (
            <SwiperItem whenClick={() => {}}>
              <div className="film-details__main-details-item">
                <span>Revenue</span>
                {`$${getSeparatedNumber(film?.revenue)}`}
              </div>
            </SwiperItem>
          )}
          {!!film?.runtime && (
            <SwiperItem whenClick={() => {}}>
              <div className="film-details__main-details-item">
                <span>Runtime</span>
                {`${film?.runtime} min`}
              </div>
            </SwiperItem>
          )}
          {!!film?.number_of_seasons && (
            <SwiperItem whenClick={() => {}}>
              <div className="film-details__main-details-item">
                <span>Seasons</span>
                {film?.number_of_seasons}
              </div>
            </SwiperItem>
          )}
          {!!film?.number_of_episodes && (
            <SwiperItem whenClick={() => {}}>
              <div className="film-details__main-details-item">
                <span>Episodes</span>
                {film?.number_of_episodes}
              </div>
            </SwiperItem>
          )}
        </ul>
      </Swiper>
      <div className="film-details__2x1">
        <div className="film-details__overview">
          <h5>Overview</h5>
          <p className="film-details__overview-body">{film?.overview}</p>
        </div>

        <div className="film-details__production">
          <h5>Production Company</h5>
          <ul className="film-details__production-body">
            {film?.production_companies?.map((pc) => (
              <li key={pc.id}>{pc.name}</li>
            ))}
            {!!!film?.production_companies?.length && <li>{`(unknown)`}</li>}
          </ul>
        </div>

        <div className="film-details__casts">
          <h5>Casts</h5>
          <Swiper>
            <ul className="film-details__casts-body">
              {casts
                ?.filter((cast) => cast.profile_path)
                .map((cast) => (
                  <SwiperItem key={cast.id} whenClick={() => {}}>
                    <Frame person={cast} />
                  </SwiperItem>
                ))}
            </ul>
          </Swiper>
        </div>
        {!!crews.length && !isEmptyImage && (
          <div className="film-details__crews">
            <h5>Crews</h5>
            <Swiper>
              <ul className="film-details__crews-body">
                {crews
                  ?.filter((crew) => crew.profile_path)
                  .map((crew) => (
                    <SwiperItem key={crew.id} whenClick={() => {}}>
                      <Frame person={crew} />
                    </SwiperItem>
                  ))}
              </ul>
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilmDetails;