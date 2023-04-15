import { useIsFetching } from "react-query";
import useTvShowGenres from "./hooks/useTvShowGenres";
import useTrendingTvShows from "./hooks/useTrendingTvShows";
import Header, { IHeader } from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Slideshow from "../common/slideshow/Slideshow";
import { FiTrendingUp } from "react-icons/fi";
import useHeaderTvShow from "./hooks/useHeaderTvShow";
import ITvShow from "../../models/ITvShow";
import useOnAirTvShows from "./hooks/useOnAirTvshows";
import useTopRatedTvShows from "./hooks/useTopRatedTvShows";
import { FcFilm, FcFilmReel } from "react-icons/fc";
import { GiFilmProjector } from "react-icons/gi";
import useAnimeTvShows from "./hooks/useAnimeTvShows";
import TvShowsLoader from "./loader/TvShowsLoader";
import useToggleWithAnimation from "../common/hooks/useToggleWithAnimation";
import PopUp from "../common/popup/PopUp";
import MoviesPopUpContent from "../movies/popup/MoviesPopUpContent";

function TvShows() {
  const isFetching = useIsFetching();
  const { status, handleOnOpen, handleOnClose } = useToggleWithAnimation();
  const genres = useTvShowGenres();
  const trendingTvShows = useTrendingTvShows(genres);
  const headerTvShow = useHeaderTvShow(trendingTvShows);
  const onAirTvShows = useOnAirTvShows(genres);
  const topRatedTvShows = useTopRatedTvShows(genres);
  const animeTvShows = useAnimeTvShows(genres);

  const slideshowSelector = (tvShows: ITvShow[]) => {
    return tvShows.map((tvShow) => ({
      id: tvShow.id,
      imageUrl: tvShow.poster_path,
      title: tvShow.name,
      releaseDate: tvShow.first_air_date,
      genres: tvShow.genres,
    }));
  };

  if (isFetching) return <TvShowsLoader />;

  return (
    <>
      {!!status && (
        <PopUp status={status} onClose={handleOnClose}>
          <MoviesPopUpContent onClose={handleOnClose} />
        </PopUp>
      )}
      <div className="tv-shows">
        <Header item={headerTvShow as IHeader} onPopUpOpen={handleOnOpen} />
        <div className="tv-shows__body">
          <Slideshow
            items={slideshowSelector(trendingTvShows)}
            icon={<FiTrendingUp className="slideshow__type-icon" />}
            type="Trending"
            onPopUpOpen={handleOnOpen}
          />
          <Slideshow
            items={slideshowSelector(onAirTvShows)}
            icon={<FcFilm className="slideshow__type-icon" />}
            type="On air"
            onPopUpOpen={handleOnOpen}
          />
          <Slideshow
            items={slideshowSelector(animeTvShows)}
            icon={<FcFilmReel className="slideshow__type-icon" />}
            type="Anime"
            onPopUpOpen={handleOnOpen}
          />
          <Slideshow
            items={slideshowSelector(topRatedTvShows)}
            icon={<GiFilmProjector className="slideshow__type-icon" />}
            type="Top rated"
            onPopUpOpen={handleOnOpen}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default TvShows;
