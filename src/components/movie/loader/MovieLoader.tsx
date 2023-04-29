import FilmDetailsLoader from "../../common/filmDetails/loader/FilmDetailsLoader";
import FooterLoader from "../../common/footer/loader/FooterLoader";

function MovieLoader() {
  return (
    <div className="movie-loader">
      <header className="movie-loader__header"></header>
      <div className="movie-loader__body">
        <FilmDetailsLoader />
      </div>
      <FooterLoader />
    </div>
  );
}

export default MovieLoader;
