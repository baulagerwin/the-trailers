import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import { tvShowsSelector } from "../../../react-query/selectors";
import IGenre from "../../../models/IGenre";
import ITvShow from "../../../models/ITvShow";
import ResultsWithDateDto from "../../../dtos/ResultsWithDateDto";
import TvShowDto from "../../../dtos/TvShowDto";

const url = "/trending/tv/week";

async function getTrendingTvShows(): Promise<ResultsWithDateDto<TvShowDto>> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useTrendingTvShows(genres: IGenre[]) {
  const fallback: ITvShow[] = [];
  const { data = fallback } = useQuery(
    keys.trendingTvShows,
    getTrendingTvShows,
    {
      select: (data) => tvShowsSelector(data, genres),
    }
  );

  return data;
}
