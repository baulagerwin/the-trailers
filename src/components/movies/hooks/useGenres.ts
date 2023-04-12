import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import IGenre from "../../../models/IGenre";

const url = "/genre/movie/list";

async function getGenres() {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useGenres() {
  const fallback: IGenre[] = [];
  const {
    data = fallback,
    isLoading,
    isSuccess,
  } = useQuery(keys.genres, getGenres);

  return { results: data.genres, isLoading, isSuccess };
}
