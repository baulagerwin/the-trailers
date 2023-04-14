import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import { tvShowsSelector } from "../../../react-query/selectors";
import IGenre from "../../../models/IGenre";
import ITvShow from "../../../models/ITvShow";
import ResultsWithDateDto from "../../../dtos/ResultsWithDateDto";
import TvShowDto from "../../../dtos/TvShowDto";

const url = "/tv/popular";
const queryString = "&with_genres=16&with_original_language=ja";

async function getAnimeTvShows(): Promise<ResultsWithDateDto<TvShowDto>> {
  const response = await fetch(getFullUrl(url, queryString));
  const data = await response.json();

  return data;
}

export default function useAnimeTvShows(genres: IGenre[]) {
  const fallback: ITvShow[] = [];
  const { data = fallback } = useQuery(keys.animeTvShows, getAnimeTvShows, {
    select: (data) => tvShowsSelector(data, genres),
  });

  return data;
}
