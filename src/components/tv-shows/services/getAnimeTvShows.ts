import ResultsDto from "../../../dtos/ResultsDto";
import TvShowDto from "../../../dtos/TvShowDto";
import getFullUrl from "../../../tmdb/getFullUrl";

const url = "/tv/popular";
const queryString = "&with_genres=16&with_original_language=ja";

export const animeTvShowsUrl = getFullUrl(url, queryString);

export default async function getAnimeTvShows(): Promise<
  ResultsDto<TvShowDto>
> {
  const response = await fetch(animeTvShowsUrl);
  const data = await response.json();

  return data;
}
