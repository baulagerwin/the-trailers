import { useEffect, useState } from "react";
import useUpcomingMovies from "./hooks/useUpcomingMovies";
import IMovie from "../../models/IMovie";
import useGenres from "./hooks/useGenres";
import IGenre from "../../models/IGenre";
import Header from "../common/header/Header";
import HeaderLoader from "../common/header/loader/HeaderLoader";
import getRandomNumber from "../../utils/getRandomBetween";
import { FcFilm, FcFilmReel } from "react-icons/fc";
import { GiFilmProjector } from "react-icons/gi";
import Slideshow from "../common/slideshow/Slideshow";
import usePopularMovies from "./hooks/usePopularMovies";

function Movies() {
  const [upcomingMovie, setUpComingMovie] = useState<IMovie>();
  const [upcomingMovieGenres, setUpcomingMovieGenres] = useState<IGenre[]>();

  const upcomingMovies = useUpcomingMovies();
  const popularMovies = usePopularMovies();
  const genres = useGenres();

  useEffect(() => {
    const firstIndex = getRandomNumber(0, 19);
    if (upcomingMovies.isSuccess) {
      setUpComingMovie(upcomingMovies.results[firstIndex]);
    }
  }, [upcomingMovies.results]);

  useEffect(() => {
    if (upcomingMovies.isSuccess && genres.isSuccess && upcomingMovie) {
      let upcomingMovieGenres: IGenre[] = [];
      const { results } = genres;

      for (let id of upcomingMovie?.genre_ids) {
        for (let genre of results) {
          if (id === genre.id) upcomingMovieGenres.push(genre);
        }
      }

      setUpcomingMovieGenres(upcomingMovieGenres);
    }
  }, [upcomingMovie]);

  if (upcomingMovies.isLoading || popularMovies.isLoading || genres.isLoading)
    return <HeaderLoader />;

  return (
    <div className="movies">
      <Header movie={upcomingMovie} genres={upcomingMovieGenres} />
      <div className="movies__body">
        <Slideshow
          movies={popularMovies.results}
          genres={genres.results}
          icon={<FcFilm className="slideshow__type-icon" />}
          type="Trending"
        />
        <Slideshow
          movies={popularMovies.results}
          genres={genres.results}
          icon={<GiFilmProjector className="slideshow__type-icon" />}
          type="Highly rated"
        />
        <Slideshow
          movies={upcomingMovies.results}
          genres={genres.results}
          icon={<FcFilmReel className="slideshow__type-icon" />}
          type="What's new"
        />
      </div>
      <footer className="movies__footer">footer</footer>
    </div>
  );
}

export default Movies;
