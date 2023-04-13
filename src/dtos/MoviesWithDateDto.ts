import MovieDto from "./MovieDto";

export default interface MoviesWithDateDto {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: MovieDto[];
  total_pages: number;
  total_results: number;
}
