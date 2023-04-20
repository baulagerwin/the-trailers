import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import IMovie from "../../../models/IMovie";
import { moviesSelector } from "../../../react-query/selectors";
import IGenre from "../../../models/IGenre";
import MovieDto from "../../../dtos/MovieDto";
import ResultsDto from "../../../dtos/ResultsDto";
import { useQuery } from "@tanstack/react-query";

const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);

const url = "/discover/movie";
const queryString = `&language=en-US&region=KR&sort_by=popularity.desc&with_original_language=ko&certification_country=KR&certification.lte=18&include_adult=false&without_genres=99&release_date.lte=${formattedDate}`;

export const koreanMoviesUrl = getFullUrl(url, queryString);

async function getKoreanMovies(): Promise<ResultsDto<MovieDto>> {
  const response = await fetch(koreanMoviesUrl);
  const data = await response.json();

  return data;
}

export default function useKoreanMovies(genres: IGenre[]) {
  const fallback: IMovie[] = [];

  const { data = fallback } = useQuery({
    queryKey: [keys.koreanMovies],
    queryFn: getKoreanMovies,
    select: (data) => moviesSelector(data, genres),
  });

  return data;
}
