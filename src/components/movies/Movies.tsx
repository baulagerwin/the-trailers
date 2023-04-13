import { useEffect, useState } from "react";
import useUpcomingMovies from "./hooks/useUpcomingMovies";
import IMovie from "../../models/IMovie";
import useGenres from "./hooks/useGenres";
import Header from "../common/header/Header";
import getRandomNumber from "../../utils/getRandomBetween";
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
import { Link } from "react-router-dom";

function Movies() {
  const [trendingMovie, setTrendingMovie] = useState<IMovie>();
  const isFetching = useIsFetching();

  const genres = useGenres();
  const trendingMovies = useTrendingMovies(genres.results);
  const nowPlayingMovies = useNowPlayingMovies(genres.results);
  const topRatedMovies = useTopRatedMovies(genres.results);
  const upcomingMovies = useUpcomingMovies(genres.results);

  useEffect(() => {
    if (trendingMovies.isSuccess) {
      const index = getRandomNumber(0, 19);
      const randomTrendingMovie = trendingMovies.results[index] as IMovie;
      setTrendingMovie(randomTrendingMovie);
    }
  }, [trendingMovies.results]);

  if (isFetching) return <MoviesLoader />;

  return (
    <div className="movies">
      <Header movie={trendingMovie as IMovie} />
      <div className="movies__body">
        <Slideshow
          movies={trendingMovies.results}
          icon={<FiTrendingUp className="slideshow__type-icon" />}
          type="Trending"
        />
        <Slideshow
          movies={shuffle(nowPlayingMovies.results)}
          icon={<FcFilm className="slideshow__type-icon" />}
          type="Now showing"
        />
        <Slideshow
          movies={topRatedMovies.results}
          icon={<GiFilmProjector className="slideshow__type-icon" />}
          type="Highly rated"
        />
        <Slideshow
          movies={upcomingMovies.results}
          icon={<FcFilmReel className="slideshow__type-icon" />}
          type="What's new"
        />
      </div>
      <footer className="movies__footer">
        <div className="movies__content">
          <Link to="/" className="movies__icon">
            <span className="movies__text">The</span>
            <h3>Trailers</h3>
          </Link>
          <p className="movies__powered">
            Powered by{" "}
            <a href="https://twitter.com/themoviedb?lang=en" target="_blank">
              @themoviedb
            </a>
          </p>
          <p className="movies__creator">Crafted by Gerwin Baula</p>
          <p className="movies__copyright">All rights reserved. &copy; 2023</p>
        </div>
      </footer>
    </div>
  );
}

export default Movies;
