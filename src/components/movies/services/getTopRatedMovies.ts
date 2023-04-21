import MovieDto from "../../../dtos/MovieDto";
import ResultsDto from "../../../dtos/ResultsDto";
import getFullUrl from "../../../tmdb/getFullUrl";

const url = "/movie/top_rated";

export const topRatedMoviesUrl = getFullUrl(url);

export default async function getTopRatedMovies(): Promise<
  ResultsDto<MovieDto>
> {
  const response = await fetch(topRatedMoviesUrl);
  const data = await response.json();

  return data;
}
