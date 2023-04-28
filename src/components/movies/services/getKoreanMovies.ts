import MovieDto from "../../../dtos/MovieDto";
import ResultsDto from "../../../dtos/ResultsDto";
import getFullUrl from "../../../tmdb/getFullUrl";

const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);

const url = "/discover/movie";
const queryString = `&language=en-US&region=KR&sort_by=popularity.desc&with_original_language=ko&certification_country=KR&certification.lte=12&include_adult=false&without_genres=99&release_date.lte=${formattedDate}`;

export const koreanMoviesUrl = getFullUrl(url, queryString);

export default async function getKoreanMovies(): Promise<ResultsDto<MovieDto>> {
  const response = await fetch(koreanMoviesUrl);
  const data = await response.json();

  return data;
}
