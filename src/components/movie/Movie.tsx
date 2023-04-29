import { useQuery } from "@tanstack/react-query";
import keys from "../../react-query/keys";
import getMovie from "./services/getMovie";
import { useNavigate, useParams } from "react-router-dom";
import getMovieCasts from "./services/getMovieCasts";
import getMoviePosters from "./services/getMoviePosters";
import getMovieVideos from "./services/getMovieVideos";
import getRandomColor from "../../utils/getRandomColor";
import Footer from "../common/footer/Footer";
import BackgroundFilm from "../common/backgroundFilm/BackgroundFilm";
import FilmDetails from "../common/filmDetails/FilmDetails";
import IMovieDetails from "../../models/IMovieDetails";
import useQueryGenres from "../../hooks/useQueryGenres";
import getMovieGenres from "../movies/services/getMovieGenres";
import useSearchFilm from "../../hooks/useSearchFilm";
import MovieDto from "../../dtos/MovieDto";
import IMovie from "../../models/IMovie";
import { getSearchMovies } from "../movies/services/getSearchMovies";
import { moviesSelector } from "../../react-query/selectors";
import SearchFilm from "../common/searchFilm/SearchFilm";
import ICast from "../../models/ICast";
import ICrew from "../../models/ICrew";
import useQueryPopUpFilms from "../../hooks/useQueryPopUpFilms";
import PopUpFilms from "../common/popupFilms/PopUpFilms";
import { useCallback } from "react";
import IGenre from "../../models/IGenre";
import MovieLoader from "./loader/MovieLoader";

function Movie() {
  const navigate = useNavigate();
  const { movieId } = useParams();
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

  const genresSelector = useCallback(
    (genre: IGenre) => ({
      ...genre,
      borderColor: getRandomColor(),
    }),
    []
  );

  const transformMovie = useCallback(
    (movie: IMovieDetails) => ({
      ...movie,
      genres: movie.genres.map(genresSelector),
    }),
    []
  );

  const movie = useQuery({
    queryKey: [keys.movie, movieId],
    queryFn: () => getMovie(movieId as string),
    select: transformMovie,
    cacheTime: 0,
  });

  const casts = useQuery({
    queryKey: [keys.movieCasts, movieId],
    queryFn: () => getMovieCasts(movieId as string),
    cacheTime: 0,
  });

  const posters = useQuery({
    queryKey: [keys.moviePosters, movieId],
    queryFn: () => getMoviePosters(movieId as string),
    cacheTime: 0,
  });

  const videos = useQuery({
    queryKey: [keys.movieVideos, movieId],
    queryFn: () => getMovieVideos(movieId as string),
    cacheTime: 0,
  });

  if (
    movie.isInitialLoading ||
    casts.isInitialLoading ||
    posters.isInitialLoading ||
    videos.isInitialLoading
  )
    return <MovieLoader />;

  if (movie.error) navigate("/404");

  const trailerKey = videos.data?.results.find(
    (r) => r.type === "Trailer"
  )?.key;

  return (
    <>
      {!!popup.status && (
        <PopUpFilms
          category={popup.category}
          infiniteFilms={popup.infiniteFilms}
          isInitialLoading={popup.isInitialLoading}
          isFetching={popup.isFetching}
          fetchNextPage={popup.fetchNextPage}
          status={popup.status}
          onClose={popup.closePopUp}
        />
      )}
      {searched.isSearching && (
        <SearchFilm isFetching={searched.isFetching} results={searched.data} />
      )}
      <div
        className={`movie ${
          searched.isSearching && "u__animation--search-open"
        }`}
      >
        <BackgroundFilm
          backgroundImageUrl={movie.data?.backdrop_path as string}
          children={null}
        />
        {!!!searched.isSearching && (
          <div className="movie__body">
            <FilmDetails
              film={movie.data as IMovieDetails}
              discover="movie"
              casts={casts.data?.cast as ICast[]}
              crews={casts.data?.crew as ICrew[]}
              onPopUpOpen={popup.openPopUp}
              trailerKey={trailerKey || ""}
            />
          </div>
        )}
        {!!!searched.isSearching && <Footer />}
      </div>
    </>
  );
}

export default Movie;
