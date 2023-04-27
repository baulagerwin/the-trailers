import Footer from "../common/footer/Footer";
import Slideshow from "../common/slideshow/Slideshow";
import { FiTrendingUp } from "react-icons/fi";
import { FcFilm, FcFilmReel } from "react-icons/fc";
import { GiFilmProjector } from "react-icons/gi";
import TvShowsLoader from "./loader/TvShowsLoader";
import { trendingTvShowsUrl } from "./services/getTrendingTvShows";
import { koreanDramasUrl } from "./services/getKoreanDramas";
import { topRatedTvShowsUrl } from "./services/getTopRatedTvShows";
import { animeTvShowsUrl } from "./services/getAnimeTvShows";
import PopUpFilms from "../common/popupFilms/PopUpFilms";
import SearchFilm from "../common/searchFilm/SearchFilm";
import useTvShows from "./hooks/useTvShows";
import HeaderFilm, { IHeaderFilm } from "../common/headerFilm/HeaderFilm";

function TvShows() {
  const tvShows = useTvShows();

  if (
    tvShows.trending.isInitialLoading ||
    tvShows.korean.isInitialLoading ||
    tvShows.topRated.isInitialLoading ||
    tvShows.anime.isInitialLoading
  )
    return <TvShowsLoader />;

  return (
    <>
      {!!tvShows.popup.status && (
        <PopUpFilms
          category={tvShows.popup.category}
          infiniteFilms={tvShows.popup.infiniteFilms}
          isInitialLoading={tvShows.popup.isInitialLoading}
          isFetching={tvShows.popup.isFetching}
          fetchNextPage={tvShows.popup.fetchNextPage}
          status={tvShows.popup.status}
          onClose={tvShows.popup.closePopUp}
        />
      )}
      {tvShows.searched.isSearching && (
        <SearchFilm
          isFetching={tvShows.searched.isFetching}
          results={tvShows.searched.data}
        />
      )}
      <div
        className={`tv-shows ${
          tvShows.searched.isSearching && "u__animation--search-open"
        }`}
      >
        <HeaderFilm
          of="tv-shows"
          discover="tv"
          item={tvShows.header as IHeaderFilm}
          onPopUpOpen={tvShows.popup.openPopUp}
        />
        {!tvShows.searched.isSearching && (
          <div className="tv-shows__body">
            <Slideshow
              of="tv-shows"
              discover="tv"
              items={tvShows.slideshowItemsSelector(tvShows.trending.data)}
              icon={<FiTrendingUp className="slideshow__type-icon" />}
              type="Trending"
              onPopUpOpen={tvShows.popup.openPopUp}
              url={trendingTvShowsUrl}
            />
            <Slideshow
              of="tv-shows"
              discover="tv"
              items={tvShows.slideshowItemsSelector(tvShows.korean.data)}
              icon={<FcFilm className="slideshow__type-icon" />}
              type="K-Drama"
              onPopUpOpen={tvShows.popup.openPopUp}
              url={koreanDramasUrl}
            />
            <Slideshow
              of="tv-shows"
              discover="tv"
              items={tvShows.slideshowItemsSelector(tvShows.anime.data)}
              icon={<FcFilmReel className="slideshow__type-icon" />}
              type="Anime"
              onPopUpOpen={tvShows.popup.openPopUp}
              url={animeTvShowsUrl}
            />
            <Slideshow
              of="tv-shows"
              discover="tv"
              items={tvShows.slideshowItemsSelector(tvShows.topRated.data)}
              icon={<GiFilmProjector className="slideshow__type-icon" />}
              type="Top Rated"
              onPopUpOpen={tvShows.popup.openPopUp}
              url={topRatedTvShowsUrl}
            />
          </div>
        )}
        {!tvShows.searched.isSearching && <Footer />}
      </div>
    </>
  );
}

export default TvShows;
