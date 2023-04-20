import { useQuery } from "react-query";
import getFullUrl from "../../../../tmdb/getFullUrl";
import MovieDto from "../../../../dtos/MovieDto";
import IMovie from "../../../../models/IMovie";
import keys from "../../../../react-query/keys";
import ResultsDto from "../../../../dtos/ResultsDto";

const url = "/trending/movie/week";

async function getMoviesPopUp(): Promise<ResultsDto<MovieDto>> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();
  return data;
}

export default function useMoviesPopUp(url: string) {
  const fallback: IMovie[] = [];
  const { data = fallback } = useQuery(keys.popupMovies, getMoviesPopUp);
  return data;
}
