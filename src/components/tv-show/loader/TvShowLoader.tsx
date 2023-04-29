import FilmDetailsLoader from "../../common/filmDetails/loader/FilmDetailsLoader";
import FooterLoader from "../../common/footer/loader/FooterLoader";

function TvShowLoader() {
  return (
    <div className="tv-show-loader">
      <header className="tv-show-loader__header"></header>
      <div className="tv-show-loader__body">
        <FilmDetailsLoader />
      </div>
      <FooterLoader />
    </div>
  );
}

export default TvShowLoader;
