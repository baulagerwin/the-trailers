import HeaderLoader from "../../common/header/loader/HeaderLoader";
import SlideshowLoader from "../../common/slideshow/loader/SlideshowLoader";

function MoviesLoader() {
  return (
    <div className="movies-loader">
      <HeaderLoader />
      <div className="movies-loader__body">
        <SlideshowLoader />
        <SlideshowLoader />
        <SlideshowLoader />
      </div>
    </div>
  );
}

export default MoviesLoader;
