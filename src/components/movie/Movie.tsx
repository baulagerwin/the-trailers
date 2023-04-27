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

function Movie() {
  const { movieId } = useParams();

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
  });

  const casts = useQuery({
    queryKey: [keys.movieCasts, movieId],
    queryFn: () => getMovieCasts(movieId as string),
  });

  const posters = useQuery({
    queryKey: [keys.moviePosters, movieId],
    queryFn: () => getMoviePosters(movieId as string),
  });

  const videos = useQuery({
    queryKey: [keys.movieVideos, movieId],
    queryFn: () => getMovieVideos(movieId as string),
  });

  if (
    movie.isInitialLoading ||
    casts.isInitialLoading ||
    posters.isInitialLoading ||
    videos.isInitialLoading
  )
    return <div>Loading...</div>;

  return (
    <div className="movie">
      <BackgroundFilm
        backgroundImageUrl={movie.data?.backdrop_path as string}
        children={null}
      />
      <div className="movie__body">
        <FilmDetails film={movie.data as IMovieDetails} />
      </div>
      <Footer />
    </div>
  );
}

export default Movie;
