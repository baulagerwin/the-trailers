import GenreDto from "../dtos/GenreDto";
import GenresDto from "../dtos/GenresDto";
import MovieDto from "../dtos/MovieDto";
import NowPlayingMoviesDto from "../dtos/MoviesWithoutDateDto";
import TrendingMoviesDto from "../dtos/MoviesWithDateDto";
import IGenre from "../models/IGenre";
import IMovie from "../models/IMovie";
import getRandomColor from "../utils/getRandomColor";

export const genresSelector = (data: GenresDto) =>
  data.genres.map((genre: GenreDto) => ({
    ...genre,
    borderColor: getRandomColor(),
  }));

export const moviesSelector = (
  data: TrendingMoviesDto | NowPlayingMoviesDto,
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
