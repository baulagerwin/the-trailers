import GenreDto from "../dtos/GenreDto";
import GenresDto from "../dtos/GenresDto";
import MovieDto from "../dtos/MovieDto";
import ResultsDto from "../dtos/ResultsDto";
import TvShowDto from "../dtos/TvShowDto";
import IGenre from "../models/IGenre";
import IMovie from "../models/IMovie";
import ITvShow from "../models/ITvShow";
import getRandomColor from "../utils/getRandomColor";

export const genresSelector = (data: GenresDto) =>
  data.genres.map((genre: GenreDto) => ({
    ...genre,
    borderColor: getRandomColor(),
  }));

// Try object keys here
export const moviesSelector = (
  data: ResultsDto<MovieDto>,
  genres: IGenre[]
): IMovie[] =>
  data.results.map((movie: MovieDto) => ({
    adult: movie.adult,
    backdrop_path: movie.backdrop_path,
    genres: movie.genre_ids.map((genreId) =>
      genres.find((genre) => genre.id === genreId)
    ) as IGenre[],
    id: movie.id,
    media_type: movie.media_type,
    original_language: movie.original_language,
    original_title: movie.original_title,
    overview: movie.overview,
    popularity: movie.popularity,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    title: movie.title,
    video: movie.video,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
  }));

export const tvShowsSelector = (
  data: ResultsDto<TvShowDto>,
  genres: IGenre[]
): ITvShow[] =>
  data.results.map((tvShow: TvShowDto) => ({
    adult: tvShow.adult,
    backdrop_path: tvShow.backdrop_path,
    first_air_date: tvShow.first_air_date,
    genres: tvShow.genre_ids.map((genreId) =>
      genres.find((genre) => genre.id === genreId)
    ) as IGenre[],
    id: tvShow.id,
    name: tvShow.name,
    origin_country: tvShow.origin_country,
    original_language: tvShow.original_language,
    original_name: tvShow.original_name,
    overview: tvShow.overview,
    popularity: tvShow.popularity,
    poster_path: tvShow.poster_path,
    media_type: tvShow.media_type,
    vote_average: tvShow.vote_average,
    vote_count: tvShow.vote_count,
  }));
