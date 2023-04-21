import { useQuery } from "@tanstack/react-query";
import IGenre from "../models/IGenre";
import ResultsDto from "../dtos/ResultsDto";

export default function useQueryFilms<T, K>(
  genres: IGenre[],
  key: string,
  service: () => Promise<ResultsDto<T>>,
  selector: (data: ResultsDto<T>, genres: IGenre[]) => K[]
) {
  const fallback: K[] = [];

  const { data = fallback, isInitialLoading } = useQuery({
    queryKey: [key],
    queryFn: service,
    select: (data) => selector(data, genres),
  });

  return { data, isInitialLoading };
}
