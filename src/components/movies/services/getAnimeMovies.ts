import MovieDto from "../../../dtos/MovieDto";
import ResultsDto from "../../../dtos/ResultsDto";
import getFullUrl from "../../../tmdb/getFullUrl";

const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);

const url = "/discover/movie";
const queryString = `&with_genres=16&sort_by=popularity.desc&include_adult=false&primary_release_date.lte=${formattedDate}&with_original_language=ja`;

export const animeMoviesUrl = getFullUrl(url, queryString);

export async function getAnimeMovies(): Promise<ResultsDto<MovieDto>> {
  const response = await fetch(animeMoviesUrl);
  const data = await response.json();

  return data;
}
