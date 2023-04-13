import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import IGenre from "../../../models/IGenre";
import MoviesWithoutDateDto from "../../../dtos/MoviesWithoutDateDto";
import IMovie from "../../../models/IMovie";
import { moviesSelector } from "../../../tmdb/selectors";

const url = "/movie/top_rated";

async function getTopRatedMovies(): Promise<MoviesWithoutDateDto> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useTopRatedMovies(genres: IGenre[]) {
  const fallback: IMovie[] = [];
  const {
    data = fallback,
    isLoading,
    isSuccess,
  } = useQuery(keys.topRatedMovies, getTopRatedMovies, {
    select: (data) => moviesSelector(data, genres),
  });

  return { results: data, isLoading, isSuccess };
}
