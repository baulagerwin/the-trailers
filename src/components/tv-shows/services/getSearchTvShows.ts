import ResultsDto from "../../../dtos/ResultsDto";
import TvShowDto from "../../../dtos/TvShowDto";
import getFullUrl from "../../../tmdb/getFullUrl";

const url = "/search/tv";

export async function getSearchTvShows(
  query: string
): Promise<ResultsDto<TvShowDto>> {
  const queryString = `&query=${query}`;
  const response = await fetch(getFullUrl(url, queryString));
  const data = await response.json();

  return data;
}
