import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";

const url = "/movie/now_playing";

async function getNowPlayingMovies() {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useNowPlayingMovies() {
  const fallback = {};
  const {
    data = fallback,
    isLoading,
    isSuccess,
  } = useQuery(keys.nowPlayingMovies, getNowPlayingMovies);

  return { results: data.results, isLoading, isSuccess };
}
