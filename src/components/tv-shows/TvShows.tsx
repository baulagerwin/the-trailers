import useTvShowGenres from "./hooks/useTvShowGenres";
import Header, { IHeader } from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Slideshow from "../common/slideshow/Slideshow";
import { FiTrendingUp } from "react-icons/fi";
import ITvShow from "../../models/ITvShow";
import { FcFilm, FcFilmReel } from "react-icons/fc";
import { GiFilmProjector } from "react-icons/gi";
import TvShowsLoader from "./loader/TvShowsLoader";
import useQueryFilms from "../../hooks/useQueryFilms";
import keys from "../../react-query/keys";
import getTrendingTvShows, {
  trendingTvShowsUrl,
} from "./services/getTrendingTvShows";
import { tvShowsSelector } from "../../react-query/selectors";
import getKoreanDramas, { koreanDramasUrl } from "./services/getKoreanDramas";
import getAnimeTvShows from "./services/getAnimeTvShows";
import {
  getTopRatedTvShows,
  topRatedTvShowsUrl,
} from "./services/getTopRatedTvShows";
import { animeTvShowsUrl } from "./services/getAnimeTvShows";
import useHeaderFilm from "../../hooks/useHeaderFilm";
import useQueryPopUpFilms from "../../hooks/useQueryPopUpFilms";
import PopUpFilms from "../common/popupFilms/PopUpFilms";
import TvShowDto from "../../dtos/TvShowDto";
import Search from "../common/search/Search";
import { useSearchParams } from "react-router-dom";
import useSearchFilm from "../../hooks/useSearchFilm";
import { getSearchTvShows } from "./services/getSearchTvShows";

function TvShows() {
  const [searchParams] = useSearchParams();
  const isSearching = !!searchParams.get("q");
  const query = searchParams.get("q");

  const genres = useTvShowGenres();

  const searchedTvShows = useSearchFilm<TvShowDto, ITvShow>(
    query as string,
    genres,
    keys.searchedMovies,
    getSearchTvShows,
    tvShowsSelector
  );

  const popupTvShows = useQueryPopUpFilms<TvShowDto, ITvShow>(
    keys.popupTvShows,
    tvShowsSelector,
    genres
  );

  const trendingTvShows = useQueryFilms(
    genres,
    keys.trendingTvShows,
    getTrendingTvShows,
    tvShowsSelector
  );

  const koreanDramas = useQueryFilms(
    genres,
    keys.koreanDramas,
    getKoreanDramas,
    tvShowsSelector
  );

  const topRatedTvShows = useQueryFilms(
    genres,
    keys.topRatedTvShows,
    getTopRatedTvShows,
    tvShowsSelector
  );

  const animeTvShows = useQueryFilms(
    genres,
    keys.animeTvShows,
    getAnimeTvShows,
    tvShowsSelector
  );

  const headerTvShow = useHeaderFilm<ITvShow>(trendingTvShows.data);

  const slideshowSelector = (tvShows: ITvShow[]) => {
    return tvShows.map((tvShow) => ({
      id: tvShow.id,
      imageUrl: tvShow.poster_path,
      title: tvShow.name,
      releaseDate: tvShow.first_air_date,
      genres: tvShow.genres,
    }));
  };

  if (
    trendingTvShows.isInitialLoading ||
    koreanDramas.isInitialLoading ||
    topRatedTvShows.isInitialLoading ||
    animeTvShows.isInitialLoading
  )
    return <TvShowsLoader />;

  return (
    <>
      {!!popupTvShows.status && (
        <PopUpFilms
          category={popupTvShows.category}
          infiniteFilms={popupTvShows.infiniteFilms}
          isInitialLoading={popupTvShows.isInitialLoading}
          isFetching={popupTvShows.isFetching}
          fetchNextPage={popupTvShows.fetchNextPage}
          status={popupTvShows.status}
          onClose={popupTvShows.closePopUp}
        />
      )}
      {isSearching && <Search results={searchedTvShows.data} />}
      <div className={`tv-shows ${isSearching && "u__animation--search-open"}`}>
        <Header
          of="tv"
          item={headerTvShow as IHeader}
          onPopUpOpen={popupTvShows.openPopUp}
        />
        {!isSearching && (
          <div className="tv-shows__body">
            <Slideshow
              of="tv"
              items={slideshowSelector(trendingTvShows.data)}
              icon={<FiTrendingUp className="slideshow__type-icon" />}
              type="Trending"
              onPopUpOpen={popupTvShows.openPopUp}
              url={trendingTvShowsUrl}
            />
            <Slideshow
              of="tv"
              items={slideshowSelector(koreanDramas.data)}
              icon={<FcFilm className="slideshow__type-icon" />}
              type="K-Drama"
              onPopUpOpen={popupTvShows.openPopUp}
              url={koreanDramasUrl}
            />
            <Slideshow
              of="tv"
              items={slideshowSelector(animeTvShows.data)}
              icon={<FcFilmReel className="slideshow__type-icon" />}
              type="Anime"
              onPopUpOpen={popupTvShows.openPopUp}
              url={animeTvShowsUrl}
            />
            <Slideshow
              of="tv"
              items={slideshowSelector(topRatedTvShows.data)}
              icon={<GiFilmProjector className="slideshow__type-icon" />}
              type="Top Rated"
              onPopUpOpen={popupTvShows.openPopUp}
              url={topRatedTvShowsUrl}
            />
          </div>
        )}
        {!isSearching && <Footer />}
      </div>
    </>
  );
}

export default TvShows;
