import useTvShowGenres from "./hooks/useTvShowGenres";
import useTrendingTvShows, {
  trendingTvShowsUrl,
} from "./hooks/useTrendingTvShows";
import Header, { IHeader } from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Slideshow from "../common/slideshow/Slideshow";
import { FiTrendingUp } from "react-icons/fi";
import useHeaderTvShow from "./hooks/useHeaderTvShow";
import ITvShow from "../../models/ITvShow";
import useKoreanDramas, { koreanDramasUrl } from "./hooks/useKoreanDramas";
import useTopRatedTvShows, {
  topRatedTvShowsUrl,
} from "./hooks/useTopRatedTvShows";
import { FcFilm, FcFilmReel } from "react-icons/fc";
import { GiFilmProjector } from "react-icons/gi";
import useAnimeTvShows, { animeTvShowsUrl } from "./hooks/useAnimeTvShows";
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
  const koreanDramas = useKoreanDramas(genres);
  const topRatedTvShows = useTopRatedTvShows(genres);
  const animeTvShows = useAnimeTvShows(genres);
  const headerTvShow = useHeaderTvShow(trendingTvShows);

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
            type="TRENDING"
            onPopUpOpen={openPopUp}
            url={trendingTvShowsUrl}
          />
          <Slideshow
            of="tv"
            items={slideshowSelector(koreanDramas)}
            icon={<FcFilm className="slideshow__type-icon" />}
            type="KDRAMA"
            onPopUpOpen={openPopUp}
            url={koreanDramasUrl}
          />
          <Slideshow
            of="tv"
            items={slideshowSelector(animeTvShows)}
            icon={<FcFilmReel className="slideshow__type-icon" />}
            type="ANIME"
            onPopUpOpen={openPopUp}
            url={animeTvShowsUrl}
          />
          <Slideshow
            of="tv"
            items={slideshowSelector(topRatedTvShows)}
            icon={<GiFilmProjector className="slideshow__type-icon" />}
            type="TOP RATED"
            onPopUpOpen={openPopUp}
            url={topRatedTvShowsUrl}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default TvShows;
