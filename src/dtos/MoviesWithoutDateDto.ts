import MovieDto from "./MovieDto";

export default interface MoviesWithoutDateDto {
  page: number;
  results: MovieDto[];
  total_pages: number;
  total_results: number;
}
