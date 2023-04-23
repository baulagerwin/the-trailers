import { useQuery } from "@tanstack/react-query";
import ResultsDto from "../dtos/ResultsDto";
import IGenre from "../models/IGenre";

export default function useSearchFilm<T, K>(
  query: string,
  genres: IGenre[],
  key: string,
  service: (query: string) => Promise<ResultsDto<T>>,
  selector: (data: ResultsDto<T>, genres: IGenre[]) => K[]
) {
  const fallback: K[] = [];

  const { data = fallback, isFetching } = useQuery({
    queryKey: [key, query],
    queryFn: () => service(query),
    select: (data) => selector(data, genres),
    enabled: !!query,
  });

  return { data, isFetching };
}
