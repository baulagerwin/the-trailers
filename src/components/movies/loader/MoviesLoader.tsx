import FooterLoader from "../../common/footer/loader/FooterLoader";
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
        <SlideshowLoader />
      </div>
      <FooterLoader />
    </div>
  );
}

export default MoviesLoader;
