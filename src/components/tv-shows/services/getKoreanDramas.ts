import ResultsDto from "../../../dtos/ResultsDto";
import TvShowDto from "../../../dtos/TvShowDto";
import getFullUrl from "../../../tmdb/getFullUrl";

const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);

const url = "/discover/tv";
const queryString = `&sort_by=popularity.desc&with_original_language=ko&include_adult=false&status=Returning%20Series,In%20Production&vote_count.gte=1&backdrop_path=not_null&poster_path=not_null&air_date.lte=${formattedDate}&with_genres=18`;

export const koreanDramasUrl = getFullUrl(url, queryString);

export default async function getKoreanDramas(): Promise<
  ResultsDto<TvShowDto>
> {
  const response = await fetch(koreanDramasUrl);
  const data = await response.json();

  return data;
}
