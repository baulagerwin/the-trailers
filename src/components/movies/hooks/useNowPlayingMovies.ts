import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import MoviesWithoutDateDto from "../../../dtos/MoviesWithoutDateDto";
import IMovie from "../../../models/IMovie";
import { moviesSelector } from "../../../tmdb/selectors";
import IGenre from "../../../models/IGenre";

const url = "/movie/now_playing";

async function getNowPlayingMovies(): Promise<MoviesWithoutDateDto> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useNowPlayingMovies(genres: IGenre[]) {
  const fallback: IMovie[] = [];
  const {
    data = fallback,
    isLoading,
    isSuccess,
  } = useQuery(keys.nowPlayingMovies, getNowPlayingMovies, {
    select: (data) => moviesSelector(data, genres),
  });

  return { results: data, isLoading, isSuccess };
}
