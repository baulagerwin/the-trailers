import useQueryGenres from "../../../hooks/useQueryGenres";
import getMovieGenres from "../services/getMovieGenres";
import useSearchFilm from "../../../hooks/useSearchFilm";
import keys from "../../../react-query/keys";
import { getSearchMovies } from "../services/getSearchMovies";
import { moviesSelector } from "../../../react-query/selectors";
import MovieDto from "../../../dtos/MovieDto";
import IMovie from "../../../models/IMovie";
import useQueryPopUpFilms from "../../../hooks/useQueryPopUpFilms";
import useQueryFilms from "../../../hooks/useQueryFilms";
import getTrendingMovies from "../services/getTrendingMovies";
import getKoreanMovies from "../services/getKoreanMovies";
import getTopRatedMovies from "../services/getTopRatedMovies";
import { getAnimeMovies } from "../services/getAnimeMovies";
import useHeaderFilm from "../../../hooks/useHeaderFilm";
import { useCallback } from "react";

function useMovies() {
  const genres = useQueryGenres(keys.movieGenres, getMovieGenres);

  const searched = useSearchFilm<MovieDto, IMovie>(
    genres,
    keys.searchedMovies,
    getSearchMovies,
    moviesSelector
  );

  const popup = useQueryPopUpFilms<MovieDto, IMovie>(
    keys.popupMovies,
    moviesSelector,
    genres
  );

  const trending = useQueryFilms<MovieDto, IMovie>(
    genres,

    keys.trendingMovies,
    getTrendingMovies,
    moviesSelector
  );

  const korean = useQueryFilms<MovieDto, IMovie>(
    genres,
    keys.koreanMovies,
    getKoreanMovies,
    moviesSelector
  );

  const topRated = useQueryFilms<MovieDto, IMovie>(
    genres,
    keys.topRatedMovies,
    getTopRatedMovies,
    moviesSelector
  );

  const anime = useQueryFilms<MovieDto, IMovie>(
    genres,
    keys.animeMovies,
    getAnimeMovies,
    moviesSelector
  );
  const header = useHeaderFilm<IMovie>(trending.data);

  const slideshowItemsSelector = useCallback((movies: IMovie[]) => {
    return movies.map((movie) => ({
      id: movie.id,
      imageUrl: movie.poster_path,
      title: movie.title,
      releaseDate: movie.release_date,
      genres: movie.genres,
    }));
  }, []);

  return {
    searched,
    popup,
    trending,
    korean,
    topRated,
    anime,
    header,
    slideshowItemsSelector,
  };
}

export default useMovies;
