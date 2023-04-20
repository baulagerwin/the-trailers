import getFullUrl from "../../../../tmdb/getFullUrl";
import MovieDto from "../../../../dtos/MovieDto";
import IMovie from "../../../../models/IMovie";
import ResultsDto from "../../../../dtos/ResultsDto";

const url = "/trending/movie/week";

async function getMoviesPopUp(): Promise<ResultsDto<MovieDto>> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();
  return data;
}

export default function useMoviesPopUp(url: string) {
  const fallback: IMovie[] = [];
  return;
}
