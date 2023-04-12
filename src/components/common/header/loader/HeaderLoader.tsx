function HeaderLoader() {
  return (
    <div className="header-loader">
      <div className="header-loader__details u__animation--pulse">
        <div className="header-loader__movie-texts">
          <div className="header-loader__movie-data"></div>
          <div className="header-loader__movie-title"></div>
          <div className="header-loader__movie-genres">
            <div className="header-loader__movie-genre"></div>
            <div className="header-loader__movie-genre"></div>
            <div className="header-loader__movie-genre"></div>
            <div className="header-loader__movie-genre"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderLoader;
