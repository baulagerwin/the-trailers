import ResultsDto from "../../../dtos/ResultsDto";
import TvShowDto from "../../../dtos/TvShowDto";
import getFullUrl from "../../../tmdb/getFullUrl";

const url = "/tv/top_rated";
// const queryString = "&with_original_language=en";

export const topRatedTvShowsUrl = getFullUrl(url);

export async function getTopRatedTvShows(): Promise<ResultsDto<TvShowDto>> {
  const response = await fetch(topRatedTvShowsUrl);
  const data = await response.json();

  return data;
}
