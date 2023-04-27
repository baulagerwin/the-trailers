import HeaderFilm, { IHeaderFilm } from "../common/headerFilm/HeaderFilm";
import { FcFilm, FcFilmReel } from "react-icons/fc";
import { FiTrendingUp } from "react-icons/fi";
import { GiFilmProjector } from "react-icons/gi";
import Slideshow from "../common/slideshow/Slideshow";
import MoviesLoader from "./loader/MoviesLoader";
import Footer from "../common/footer/Footer";
import { trendingMoviesUrl } from "./services/getTrendingMovies";
import { koreanMoviesUrl } from "./services/getKoreanMovies";
import { topRatedMoviesUrl } from "./services/getTopRatedMovies";
import { animeMoviesUrl } from "./services/getAnimeMovies";
import PopUpFilms from "../common/popupFilms/PopUpFilms";
import SearchFilm from "../common/searchFilm/SearchFilm";
import useMovies from "./hooks/useMovies";

function Movies() {
  const movies = useMovies();

  if (
    movies.trending.isInitialLoading ||
    movies.korean.isInitialLoading ||
    movies.topRated.isInitialLoading ||
    movies.anime.isInitialLoading
  )
    return <MoviesLoader />;

  return (
    <>
      {!!movies.popup.status && (
        <PopUpFilms
          category={movies.popup.category}
          infiniteFilms={movies.popup.infiniteFilms}
          isInitialLoading={movies.popup.isInitialLoading}
          isFetching={movies.popup.isFetching}
          fetchNextPage={movies.popup.fetchNextPage}
          status={movies.popup.status}
          onClose={movies.popup.closePopUp}
        />
      )}
      {movies.searched.isSearching && (
        <SearchFilm
          isFetching={movies.searched.isFetching}
          results={movies.searched.data}
        />
      )}
      <div
        className={`movies ${
          movies.searched.isSearching && "u__animation--search-open"
        }`}
      >
        <HeaderFilm
          of="movies"
          discover="movie"
          item={movies.header as IHeaderFilm}
          onPopUpOpen={movies.popup.openPopUp}
        />
        {!movies.searched.isSearching && (
          <div className="movies__body">
            <Slideshow
              of="movies"
              discover="movie"
              items={movies.slideshowItemsSelector(movies.trending.data)}
              icon={<FiTrendingUp className="slideshow__type-icon" />}
              type="Trending"
              onPopUpOpen={movies.popup.openPopUp}
              url={trendingMoviesUrl}
            />
            <Slideshow
              of="movies"
              discover="movie"
              items={movies.slideshowItemsSelector(movies.korean.data)}
              icon={<FcFilm className="slideshow__type-icon" />}
              type="K-Movies"
              onPopUpOpen={movies.popup.openPopUp}
              url={koreanMoviesUrl}
            />
            <Slideshow
              of="movies"
              discover="movie"
              items={movies.slideshowItemsSelector(movies.anime.data)}
              icon={<FcFilmReel className="slideshow__type-icon" />}
              type="Anime"
              onPopUpOpen={movies.popup.openPopUp}
              url={animeMoviesUrl}
            />
            <Slideshow
              of="movies"
              discover="movie"
              items={movies.slideshowItemsSelector(movies.topRated.data)}
              icon={<GiFilmProjector className="slideshow__type-icon" />}
              type="Highly Rated"
              onPopUpOpen={movies.popup.openPopUp}
              url={topRatedMoviesUrl}
            />
          </div>
        )}
        {!movies.searched.isSearching && <Footer />}
      </div>
    </>
  );
}

export default Movies;
