import useAnimeMovies from "./hooks/useAnimeMovies";
import Header, { IHeader } from "../common/header/Header";
import { FcFilm, FcFilmReel } from "react-icons/fc";
import { FiTrendingUp } from "react-icons/fi";
import { GiFilmProjector } from "react-icons/gi";
import Slideshow from "../common/slideshow/Slideshow";
import useTopRatedMovies from "./hooks/useTopRatedMovies";
import useNowPlayingMovies from "./hooks/useNowPlayingMovies";
import useTrendingMovies from "./hooks/useTrendingMovies";
import MoviesLoader from "./loader/MoviesLoader";
import { useIsFetching } from "react-query";
import Footer from "../common/footer/Footer";
import useMovieGenres from "./hooks/useMovieGenres";
import useHeaderMovie from "./hooks/useHeaderMovie";
import IMovie from "../../models/IMovie";
import PopUp from "../common/popup/PopUp";
import useToggleWithAnimation from "../common/hooks/useToggleWithAnimation";
import MoviesPopUpContent from "./popup/MoviesPopUpContent";

function Movies() {
  const isFetching = useIsFetching();
  const { status, handleOnOpen, handleOnClose } = useToggleWithAnimation();
  const genres = useMovieGenres();
  const trendingMovies = useTrendingMovies(genres);
  const headerMovie = useHeaderMovie(trendingMovies);
  const nowPlayingMovies = useNowPlayingMovies(genres);
  const topRatedMovies = useTopRatedMovies(genres);
  const animeMovies = useAnimeMovies(genres);

  const slideshowSelector = (movies: IMovie[]) => {
    return movies.map((movie) => ({
      id: movie.id,
      imageUrl: movie.poster_path,
      title: movie.title,
      releaseDate: movie.release_date,
      genres: movie.genres,
    }));
  };

  if (isFetching) return <MoviesLoader />;

  return (
    <>
      {!!status && (
        <PopUp status={status} onClose={handleOnClose}>
          <MoviesPopUpContent onClose={handleOnClose} />
        </PopUp>
      )}
      <div className="movies">
        <Header item={headerMovie as IHeader} onPopUpOpen={handleOnOpen} />
        <div className="movies__body">
          <Slideshow
            items={slideshowSelector(trendingMovies)}
            icon={<FiTrendingUp className="slideshow__type-icon" />}
            type="Trending"
            onPopUpOpen={handleOnOpen}
          />
          <Slideshow
            items={slideshowSelector(nowPlayingMovies)}
            icon={<FcFilm className="slideshow__type-icon" />}
            type="Now showing"
            onPopUpOpen={handleOnOpen}
          />
          <Slideshow
            items={slideshowSelector(animeMovies)}
            icon={<FcFilmReel className="slideshow__type-icon" />}
            type="Anime"
            onPopUpOpen={handleOnOpen}
          />
          <Slideshow
            items={slideshowSelector(topRatedMovies)}
            icon={<GiFilmProjector className="slideshow__type-icon" />}
            type="Highly rated"
            onPopUpOpen={handleOnOpen}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Movies;
