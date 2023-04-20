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
import { useState } from "react";
import TvShowsPopUp, { ITvShowsPopUp } from "./popup/TvShowsPopUp";
import getFullUrl from "../../tmdb/getFullUrl";
import { useIsFetching } from "@tanstack/react-query";

function TvShows() {
  const isFetching = useIsFetching();
  const { status, handleOnOpen, handleOnClose } = useToggleWithAnimation();
  const [popUpData, setPopUpData] = useState<ITvShowsPopUp>();
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

  function openPopUp(e: React.MouseEvent, data: ITvShowsPopUp) {
    setPopUpData(data);
    handleOnOpen(e);
  }

  function closePopUp() {
    handleOnClose();
  }

  if (isFetching) return <TvShowsLoader />;

  return (
    <>
      {!!status && (
        <TvShowsPopUp
          data={popUpData as ITvShowsPopUp}
          status={status}
          onClose={closePopUp}
        />
      )}
      <div className="tv-shows">
        <Header item={headerTvShow as IHeader} onPopUpOpen={openPopUp} />
        <div className="tv-shows__body">
          <Slideshow
            of="tv"
            items={slideshowSelector(trendingTvShows)}
            icon={<FiTrendingUp className="slideshow__type-icon" />}
            type="Trending"
            onPopUpOpen={openPopUp}
            url={getFullUrl("/trending/movie/week")}
          />
          <Slideshow
            of="tv"
            items={slideshowSelector(onAirTvShows)}
            icon={<FcFilm className="slideshow__type-icon" />}
            type="On Air"
            onPopUpOpen={openPopUp}
            url={getFullUrl("/tv/on_the_air", "&with_original_language=en")}
          />
          <Slideshow
            of="tv"
            items={slideshowSelector(animeTvShows)}
            icon={<FcFilmReel className="slideshow__type-icon" />}
            type="Anime"
            onPopUpOpen={openPopUp}
            url={getFullUrl(
              "/tv/popular",
              "&with_genres=16&with_original_language=ja"
            )}
          />
          <Slideshow
            of="tv"
            items={slideshowSelector(topRatedTvShows)}
            icon={<GiFilmProjector className="slideshow__type-icon" />}
            type="Top Rated"
            onPopUpOpen={openPopUp}
            url={getFullUrl("/tv/top_rated")}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default TvShows;
