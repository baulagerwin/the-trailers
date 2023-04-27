import HeaderFilmLoader from "../../common/headerFilm/loader/HeaderFilmLoader";
import SlideshowLoader from "../../common/slideshow/loader/SlideshowLoader";

function TvShowsLoader() {
  return (
    <div className="tv-shows-loader">
      <HeaderFilmLoader />
      <div className="tv-shows-loader__body">
        <SlideshowLoader />
        <SlideshowLoader />
        <SlideshowLoader />
        <SlideshowLoader />
      </div>
    </div>
  );
}

export default TvShowsLoader;
