import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import { tvShowsSelector } from "../../../react-query/selectors";
import IGenre from "../../../models/IGenre";
import ITvShow from "../../../models/ITvShow";
import TvShowDto from "../../../dtos/TvShowDto";
import ResultsDto from "../../../dtos/ResultsDto";
import { useQuery } from "@tanstack/react-query";

const url = "/tv/on_the_air";
const queryString = "&with_original_language=en";

async function getOnAirTvShows(): Promise<ResultsDto<TvShowDto>> {
  const response = await fetch(getFullUrl(url, queryString));
  const data = await response.json();

  return data;
}

export default function useOnAirTvShows(genres: IGenre[]) {
  const fallback: ITvShow[] = [];

  const { data = fallback } = useQuery({
    queryKey: [keys.onAirTvShows],
    queryFn: getOnAirTvShows,
    select: (data) => tvShowsSelector(data, genres),
  });

  return data;
}
