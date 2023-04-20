import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import { tvShowsSelector } from "../../../react-query/selectors";
import IGenre from "../../../models/IGenre";
import ITvShow from "../../../models/ITvShow";
import TvShowDto from "../../../dtos/TvShowDto";
import ResultsDto from "../../../dtos/ResultsDto";
import { useQuery } from "@tanstack/react-query";

const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);

const url = "/discover/tv";
const queryString = `&sort_by=first_air_date.desc&with_original_language=ko&include_adult=false&status=Returning%20Series,In%20Production&vote_count.gte=1&backdrop_path=not_null&poster_path=not_null&air_date.lte=${formattedDate}&with_genres=18`;

export const koreanDramasUrl = getFullUrl(url, queryString);

async function getKoreanDramas(): Promise<ResultsDto<TvShowDto>> {
  const response = await fetch(koreanDramasUrl);
  const data = await response.json();

  return data;
}

export default function useKoreanDramas(genres: IGenre[]) {
  const fallback: ITvShow[] = [];

  const { data = fallback } = useQuery({
    queryKey: [keys.onAirTvShows],
    queryFn: getKoreanDramas,
    select: (data) => tvShowsSelector(data, genres),
  });

  return data;
}
