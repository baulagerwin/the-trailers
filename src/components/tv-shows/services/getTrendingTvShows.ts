import ResultsDto from "../../../dtos/ResultsDto";
import TvShowDto from "../../../dtos/TvShowDto";
import getFullUrl from "../../../tmdb/getFullUrl";

const url = "/trending/tv/week";
export const trendingTvShowsUrl = getFullUrl(url);

export default async function getTrendingTvShows(): Promise<
  ResultsDto<TvShowDto>
> {
  const response = await fetch(trendingTvShowsUrl);
  const data = await response.json();

  return data;
}
