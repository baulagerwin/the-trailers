import useUpcomingMovies from "./hooks/useUpcomingMovies";
import Header, { IHeader } from "../common/header/Header";
import { FcFilm, FcFilmReel } from "react-icons/fc";
import { FiTrendingUp } from "react-icons/fi";
import { GiFilmProjector } from "react-icons/gi";
import Slideshow from "../common/slideshow/Slideshow";
import useTopRatedMovies from "./hooks/useTopRatedMovies";
import useNowPlayingMovies from "./hooks/useNowPlayingMovies";
import useTrendingMovies from "./hooks/useTrendingMovies";
import { shuffle } from "lodash";
import MoviesLoader from "./loader/MoviesLoader";
import { useIsFetching } from "react-query";
import Footer from "../common/footer/Footer";
import useMovieGenres from "./hooks/useMovieGenres";
import useHeaderMovie from "./hooks/useHeaderMovie";
import IMovie from "../../models/IMovie";

function Movies() {
  const isFetching = useIsFetching();

  const genres = useMovieGenres();
  const trendingMovies = useTrendingMovies(genres);
  const headerMovie = useHeaderMovie(trendingMovies);
  const nowPlayingMovies = useNowPlayingMovies(genres);
  const topRatedMovies = useTopRatedMovies(genres);
  const upcomingMovies = useUpcomingMovies(genres);

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
    <div className="movies">
      <Header item={headerMovie as IHeader} />
      <div className="movies__body">
        <Slideshow
          items={slideshowSelector(trendingMovies)}
          icon={<FiTrendingUp className="slideshow__type-icon" />}
          type="Trending"
        />
        <Slideshow
          items={slideshowSelector(shuffle(nowPlayingMovies))}
          icon={<FcFilm className="slideshow__type-icon" />}
          type="Now showing"
        />
        <Slideshow
          items={slideshowSelector(topRatedMovies)}
          icon={<GiFilmProjector className="slideshow__type-icon" />}
          type="Highly rated"
        />
        <Slideshow
          items={slideshowSelector(upcomingMovies)}
          icon={<FcFilmReel className="slideshow__type-icon" />}
          type="What's new"
        />
      </div>
      <Footer />
    </div>
  );
}

export default Movies;
