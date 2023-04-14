import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import { tvShowsSelector } from "../../../react-query/selectors";
import IGenre from "../../../models/IGenre";
import ITvShow from "../../../models/ITvShow";
import ResultsWithDateDto from "../../../dtos/ResultsWithDateDto";
import TvShowDto from "../../../dtos/TvShowDto";

const url = "/tv/top_rated";
// const queryString = "&with_original_language=en";

async function getTopRatedTvShows(): Promise<ResultsWithDateDto<TvShowDto>> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useTopRatedTvShows(genres: IGenre[]) {
  const fallback: ITvShow[] = [];
  const { data = fallback } = useQuery(
    keys.topRatedTvShows,
    getTopRatedTvShows,
    {
      select: (data) => tvShowsSelector(data, genres),
    }
  );

  return data;
}
