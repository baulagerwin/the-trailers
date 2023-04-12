import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";

const url = "/movie/top_rated";

async function getTopRatedMovies() {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useTopRatedMovies() {
  const fallback = {};
  const {
    data = fallback,
    isLoading,
    isSuccess,
  } = useQuery(keys.topRatedMovies, getTopRatedMovies);

  return { results: data.results, isLoading, isSuccess };
}
