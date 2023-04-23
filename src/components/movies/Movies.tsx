import Header, { IHeader } from "../common/header/Header";
import { FcFilm, FcFilmReel } from "react-icons/fc";
import { FiTrendingUp } from "react-icons/fi";
import { GiFilmProjector } from "react-icons/gi";
import Slideshow from "../common/slideshow/Slideshow";
import MoviesLoader from "./loader/MoviesLoader";
import Footer from "../common/footer/Footer";
import useMovieGenres from "./hooks/useMovieGenres";
import IMovie from "../../models/IMovie";
import useQueryFilms from "../../hooks/useQueryFilms";
import keys from "../../react-query/keys";
import getTrendingMovies, {
  trendingMoviesUrl,
} from "./services/getTrendingMovies";
import { moviesSelector } from "../../react-query/selectors";
import getKoreanMovies, { koreanMoviesUrl } from "./services/getKoreanMovies";
import getTopRatedMovies, {
  topRatedMoviesUrl,
} from "./services/getTopRatedMovies";
import { animeMoviesUrl, getAnimeMovies } from "./services/getAnimeMovies";
import { useCallback } from "react";
import PopUpFilms from "../common/popupFilms/PopUpFilms";
import useHeaderFilm from "../../hooks/useHeaderFilm";
import useQueryPopUpFilms from "../../hooks/useQueryPopUpFilms";
import MovieDto from "../../dtos/MovieDto";
import { useSearchParams } from "react-router-dom";
import useSearchFilm from "../../hooks/useSearchFilm";
import { getSearchMovies } from "./services/getSearchMovies";
import SearchFilm from "../common/searchFilm/SearchFilm";

function Movies() {
  const [searchParams] = useSearchParams();
  const isSearching = !!searchParams.get("q");
  const query = searchParams.get("q");

  const genres = useMovieGenres();

  const searchedMovies = useSearchFilm<MovieDto, IMovie>(
    query as string,
    genres,
    keys.searchedMovies,
    getSearchMovies,
    moviesSelector
  );

  const popUpMovies = useQueryPopUpFilms<MovieDto, IMovie>(
    keys.popupMovies,
    moviesSelector,
    genres
  );

  const trendingMovies = useQueryFilms(
    genres,
    keys.trendingMovies,
    getTrendingMovies,
    moviesSelector
  );

  const koreanMovies = useQueryFilms(
    genres,
    keys.koreanMovies,
    getKoreanMovies,
    moviesSelector
  );

  const topRatedMovies = useQueryFilms(
    genres,
    keys.topRatedMovies,
    getTopRatedMovies,
    moviesSelector
  );

  const animeMovies = useQueryFilms(
    genres,
    keys.animeMovies,
    getAnimeMovies,
    moviesSelector
  );
  const headerMovie = useHeaderFilm<IMovie>(trendingMovies.data);

  const slideshowSelector = useCallback((movies: IMovie[]) => {
    return movies.map((movie) => ({
      id: movie.id,
      imageUrl: movie.poster_path,
      title: movie.title,
      releaseDate: movie.release_date,
      genres: movie.genres,
    }));
  }, []);

  if (
    trendingMovies.isInitialLoading ||
    koreanMovies.isInitialLoading ||
    topRatedMovies.isInitialLoading ||
    animeMovies.isInitialLoading
  )
    return <MoviesLoader />;

  return (
    <>
      {!!popUpMovies.status && (
        <PopUpFilms
          category={popUpMovies.category}
          infiniteFilms={popUpMovies.infiniteFilms}
          isInitialLoading={popUpMovies.isInitialLoading}
          isFetching={popUpMovies.isFetching}
          fetchNextPage={popUpMovies.fetchNextPage}
          status={popUpMovies.status}
          onClose={popUpMovies.closePopUp}
        />
      )}
      {isSearching && (
        <SearchFilm
          isFetching={searchedMovies.isFetching}
          results={searchedMovies.data}
        />
      )}
      <div className={`movies ${isSearching && "u__animation--search-open"}`}>
        <Header
          of="movie"
          item={headerMovie as IHeader}
          onPopUpOpen={popUpMovies.openPopUp}
        />
        {!isSearching && (
          <div className="movies__body">
            <Slideshow
              of="movie"
              items={slideshowSelector(trendingMovies.data)}
              icon={<FiTrendingUp className="slideshow__type-icon" />}
              type="Trending"
              onPopUpOpen={popUpMovies.openPopUp}
              url={trendingMoviesUrl}
            />
            <Slideshow
              of="movie"
              items={slideshowSelector(koreanMovies.data)}
              icon={<FcFilm className="slideshow__type-icon" />}
              type="K-Movies"
              onPopUpOpen={popUpMovies.openPopUp}
              url={koreanMoviesUrl}
            />
            <Slideshow
              of="movie"
              items={slideshowSelector(animeMovies.data)}
              icon={<FcFilmReel className="slideshow__type-icon" />}
              type="Anime"
              onPopUpOpen={popUpMovies.openPopUp}
              url={animeMoviesUrl}
            />
            <Slideshow
              of="movie"
              items={slideshowSelector(topRatedMovies.data)}
              icon={<GiFilmProjector className="slideshow__type-icon" />}
              type="Highly Rated"
              onPopUpOpen={popUpMovies.openPopUp}
              url={topRatedMoviesUrl}
            />
          </div>
        )}
        {!isSearching && <Footer />}
      </div>
    </>
  );
}

export default Movies;
