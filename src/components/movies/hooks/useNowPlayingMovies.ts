import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import IMovie from "../../../models/IMovie";
import { moviesSelector } from "../../../react-query/selectors";
import IGenre from "../../../models/IGenre";
import ResultsWithoutDateDto from "../../../dtos/ResultsWithoutDateDto";
import MovieDto from "../../../dtos/MovieDto";

const url = "/movie/now_playing";

async function getNowPlayingMovies(): Promise<ResultsWithoutDateDto<MovieDto>> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useNowPlayingMovies(genres: IGenre[]) {
  const fallback: IMovie[] = [];
  const { data = fallback } = useQuery(
    keys.nowPlayingMovies,
    getNowPlayingMovies,
    {
      select: (data) => moviesSelector(data, genres),
    }
  );

  return data;
}
