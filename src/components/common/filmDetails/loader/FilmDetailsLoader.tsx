import GenreButtonLoader from "../../genreButton/loader/GenreButtonLoader";

function FilmDetailsLoader() {
  return (
    <div className="film-details-loader u__animation--pulse">
      <span className="film-details-loader__tagline"></span>
      <span className="film-details-loader__title"></span>
      <div className="film-details-loader__buttons">
        <div className="film-details-loader__genres">
          <GenreButtonLoader />
          <GenreButtonLoader />
          <GenreButtonLoader />
          <GenreButtonLoader />
        </div>
        <div className="film-details-loader__link"></div>
      </div>
      <div className="film-details-loader__main-details">
        <ul className="film-details-loader__main-details-items">
          <li className="film-details-loader__main-details-item"></li>
          <li className="film-details-loader__main-details-item"></li>
          <li className="film-details-loader__main-details-item"></li>
          <li className="film-details-loader__main-details-item"></li>
          <li className="film-details-loader__main-details-item"></li>
        </ul>
      </div>
      <div className="film-details-loader__2x1">
        <div className="film-details-loader__overview">
          <div className="film-details-loader__overview-header"></div>
          <div className="film-details-loader__overview-body"></div>
          <div className="film-details-loader__overview-body"></div>
          <div className="film-details-loader__overview-body"></div>
          <div className="film-details-loader__overview-body"></div>
          <div className="film-details-loader__overview-body"></div>
        </div>
        <div className="film-details-loader__production">
          <div className="film-details-loader__production-header"></div>
          <div className="film-details-loader__production-body"></div>
          <div className="film-details-loader__production-body"></div>
          <div className="film-details-loader__production-body"></div>
        </div>
        <div className="film-details-loader__casts"></div>
        <div className="film-details-loader__crew"></div>
      </div>
    </div>
  );
}

export default FilmDetailsLoader;
