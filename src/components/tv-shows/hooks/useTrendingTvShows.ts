import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import { tvShowsSelector } from "../../../react-query/selectors";
import IGenre from "../../../models/IGenre";
import ITvShow from "../../../models/ITvShow";
import TvShowDto from "../../../dtos/TvShowDto";
import ResultsDto from "../../../dtos/ResultsDto";
import { useQuery } from "@tanstack/react-query";

const url = "/trending/tv/week";

async function getTrendingTvShows(): Promise<ResultsDto<TvShowDto>> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useTrendingTvShows(genres: IGenre[]) {
  const fallback: ITvShow[] = [];

  const { data = fallback } = useQuery({
    queryKey: [keys.trendingTvShows],
    queryFn: getTrendingTvShows,
    select: (data) => tvShowsSelector(data, genres),
  });

  return data;
}
