import { useQuery } from "@tanstack/react-query";
import keys from "../../react-query/keys";
import getMovie from "./services/getMovie";
import { useParams } from "react-router-dom";
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

function Movie() {
  const { movieId } = useParams();
  const genres = useQueryGenres(keys.movieGenres, getMovieGenres);

  const searched = useSearchFilm<MovieDto, IMovie>(
    genres,
    keys.searchedMovies,
    getSearchMovies,
    moviesSelector
  );

  const movie = useQuery({
    queryKey: [keys.movie, movieId],
    queryFn: () => getMovie(movieId as string),
    select: (movie) => ({
      ...movie,
      genres: movie.genres.map((genre) => ({
        ...genre,
        borderColor: getRandomColor(),
      })),
    }),
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
    return <div>Loading...</div>;

  console.log(movie.data);

  return (
    <>
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
        <div className="movie__body">
          <FilmDetails film={movie.data as IMovieDetails} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Movie;
