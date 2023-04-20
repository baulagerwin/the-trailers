import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import { tvShowsSelector } from "../../../react-query/selectors";
import IGenre from "../../../models/IGenre";
import ITvShow from "../../../models/ITvShow";
import TvShowDto from "../../../dtos/TvShowDto";
import ResultsDto from "../../../dtos/ResultsDto";
import { useQuery } from "@tanstack/react-query";

const url = "/tv/popular";
const queryString = "&with_genres=16&with_original_language=ja";

async function getAnimeTvShows(): Promise<ResultsDto<TvShowDto>> {
  const response = await fetch(getFullUrl(url, queryString));
  const data = await response.json();

  return data;
}

export default function useAnimeTvShows(genres: IGenre[]) {
  const fallback: ITvShow[] = [];

  const { data = fallback } = useQuery({
    queryKey: [keys.animeTvShows],
    queryFn: getAnimeTvShows,
    select: (data) => tvShowsSelector(data, genres),
  });

  return data;
}
