import FooterLoader from "../../common/footer/loader/FooterLoader";
import HeaderFilmLoader from "../../common/headerFilm/loader/HeaderFilmLoader";
import SlideshowLoader from "../../common/slideshow/loader/SlideshowLoader";

function MoviesLoader() {
  return (
    <div className="movies-loader">
      <HeaderFilmLoader />
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
