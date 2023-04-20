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
import Footer from "../common/footer/Footer";
import useMovieGenres from "./hooks/useMovieGenres";
import useHeaderMovie from "./hooks/useHeaderMovie";
import IMovie from "../../models/IMovie";
import useToggleWithAnimation from "../common/hooks/useToggleWithAnimation";
import MoviesPopUp, { IMoviesPopUp } from "./popup/MoviesPopUp";
import { useState } from "react";
import getFullUrl from "../../tmdb/getFullUrl";
import { useIsFetching } from "@tanstack/react-query";

function Movies() {
  const isFetching = useIsFetching();
  const { status, handleOnOpen, handleOnClose } = useToggleWithAnimation();
  const [popUpData, setPopUpData] = useState<IMoviesPopUp>();

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

  function openPopUp(e: React.MouseEvent, data: IMoviesPopUp) {
    setPopUpData(data);
    handleOnOpen(e);
  }

  function closePopUp() {
    handleOnClose();
  }

  if (isFetching) return <MoviesLoader />;

  return (
    <>
      {!!status && (
        <MoviesPopUp
          data={popUpData as IMoviesPopUp}
          status={status}
          onClose={closePopUp}
        />
      )}
      <div className="movies">
        <Header item={headerMovie as IHeader} onPopUpOpen={openPopUp} />
        <div className="movies__body">
          <Slideshow
            of="movie"
            items={slideshowSelector(trendingMovies)}
            icon={<FiTrendingUp className="slideshow__type-icon" />}
            type="Trending"
            onPopUpOpen={openPopUp}
            url={getFullUrl("/trending/movie/week")}
          />
          <Slideshow
            of="movie"
            items={slideshowSelector(nowPlayingMovies)}
            icon={<FcFilm className="slideshow__type-icon" />}
            type="Now Showing"
            onPopUpOpen={openPopUp}
            url={getFullUrl("/movie/now_playing")}
          />
          <Slideshow
            of="movie"
            items={slideshowSelector(animeMovies)}
            icon={<FcFilmReel className="slideshow__type-icon" />}
            type="Anime"
            onPopUpOpen={openPopUp}
            url={getFullUrl(
              "/movie/top_rated",
              "&with_genres=16&with_original_language=ja&with_movie=true"
            )}
          />
          <Slideshow
            of="movie"
            items={slideshowSelector(topRatedMovies)}
            icon={<GiFilmProjector className="slideshow__type-icon" />}
            type="Highly Rated"
            onPopUpOpen={openPopUp}
            url={getFullUrl("/movie/top_rated")}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Movies;
