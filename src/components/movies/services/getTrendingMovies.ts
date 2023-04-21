import MovieDto from "../../../dtos/MovieDto";
import ResultsDto from "../../../dtos/ResultsDto";
import getFullUrl from "../../../tmdb/getFullUrl";

const url = "/trending/movie/week";
export const trendingMoviesUrl = getFullUrl(url);

export default async function getTrendingMovies(): Promise<
  ResultsDto<MovieDto>
> {
  const response = await fetch(trendingMoviesUrl);
  const data = await response.json();

  return data;
}
