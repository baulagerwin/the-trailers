import HeaderLoader from "../../common/header/loader/HeaderLoader";
import SlideshowLoader from "../../common/slideshow/loader/SlideshowLoader";

function TvShowsLoader() {
  return (
    <div className="tv-shows-loader">
      <HeaderLoader />
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
