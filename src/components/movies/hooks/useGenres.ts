import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import GenresDto from "../../../dtos/GenresDto";
import getRandomColor from "../../../utils/getRandomColor";
import GenreDto from "../../../dtos/GenreDto";
import IGenre from "../../../models/IGenre";
import { genresSelector } from "../../../tmdb/selectors";

const url = "/genre/movie/list";

async function getGenres(): Promise<GenresDto> {
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
  } = useQuery(keys.genres, getGenres, {
    select: genresSelector,
  });

  return { results: data, isLoading, isSuccess };
}
