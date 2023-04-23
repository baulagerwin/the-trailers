import MovieDto from "../../../dtos/MovieDto";
import ResultsDto from "../../../dtos/ResultsDto";
import getFullUrl from "../../../tmdb/getFullUrl";

const url = "/search/movie";

export async function getSearchMovies(
  query: string
): Promise<ResultsDto<MovieDto>> {
  const queryString = `&query=${query}`;
  const response = await fetch(getFullUrl(url, queryString));
  const data = await response.json();

  return data;
}
