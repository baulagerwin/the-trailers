import { useEffect, useState } from "react";
import useUpcomingMovies from "./hooks/useUpcomingMovies";
import IMovie from "../../models/IMovie";
import useGenres from "./hooks/useGenres";
import IGenre from "../../models/IGenre";
import Header from "../common/header/Header";
import HeaderLoader from "../common/header/loader/HeaderLoader";
import getRandomNumber from "../../utils/getRandomBetween";
import { FcFilm, FcFilmReel } from "react-icons/fc";
import { FiTrendingUp } from "react-icons/fi";
import { GiFilmProjector } from "react-icons/gi";
import Slideshow from "../common/slideshow/Slideshow";
import usePopularMovies from "./hooks/usePopularMovies";
import useTopRatedMovies from "./hooks/useTopRatedMovies";
import useNowPlayingMovies from "./hooks/useNowPlayingMovies";
import useTrendingMovies from "./hooks/useTrendingMovies";
import { shuffle } from "lodash";
import getRandomColor from "../../utils/getRandomColor";

function Movies() {
  const [genresWithColor, setGenresWithColor] = useState<IGenre[]>();
  const [trendingMovie, setTrendingMovie] = useState<IMovie>();
  const [trendingMovieGenres, setTrendingMovieGenres] = useState<IGenre[]>();

  const upcomingMovies = useUpcomingMovies();
  const popularMovies = usePopularMovies();
  const topRatedMovies = useTopRatedMovies();
  const nowPlayingMovies = useNowPlayingMovies();
  const trendingMovies = useTrendingMovies();
  const genres = useGenres();

  useEffect(() => {
    const firstIndex = getRandomNumber(0, 19);
    if (trendingMovies.isSuccess) {
      setTrendingMovie(trendingMovies.results[firstIndex]);
    }
  }, [trendingMovies.results]);

  useEffect(() => {
    if (trendingMovies.isSuccess && genres.isSuccess && trendingMovie) {
      let trendingMovieGenres: IGenre[] = [];
      const { results } = genres;

      for (let id of trendingMovie?.genre_ids) {
        for (let genre of results) {
          if (id === genre.id) trendingMovieGenres.push(genre);
        }
      }

      setTrendingMovieGenres(trendingMovieGenres);
    }
  }, [trendingMovie]);

  useEffect(() => {
    if (genres.isSuccess) {
      let genresWithBorderColor: IGenre[] = [];

      for (let genre of genres.results) {
        genresWithBorderColor.push({
          ...genre,
          borderColor: getRandomColor(),
        });
      }

      setGenresWithColor(genresWithBorderColor);
    }
  }, [genres.results]);

  if (
    upcomingMovies.isLoading ||
    popularMovies.isLoading ||
    topRatedMovies.isLoading ||
    trendingMovies.isLoading ||
    genres.isLoading
  )
    return <HeaderLoader />;

  return (
    <div className="movies">
      <Header movie={trendingMovie} genres={trendingMovieGenres} />
      <div className="movies__body">
        <Slideshow
          movies={trendingMovies.results}
          genres={genresWithColor}
          icon={<FiTrendingUp className="slideshow__type-icon" />}
          type="Trending"
        />
        <Slideshow
          movies={shuffle(nowPlayingMovies.results)}
          genres={genresWithColor}
          icon={<FcFilm className="slideshow__type-icon" />}
          type="In theaters"
        />
        <Slideshow
          movies={topRatedMovies.results}
          genres={genresWithColor}
          icon={<GiFilmProjector className="slideshow__type-icon" />}
          type="Highly rated"
        />
        <Slideshow
          movies={upcomingMovies.results}
          genres={genresWithColor}
          icon={<FcFilmReel className="slideshow__type-icon" />}
          type="What's new"
        />
      </div>
      <footer className="movies__footer">footer</footer>
    </div>
  );
}

export default Movies;
