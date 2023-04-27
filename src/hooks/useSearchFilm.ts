import { useQuery } from "@tanstack/react-query";
import ResultsDto from "../dtos/ResultsDto";
import IGenre from "../models/IGenre";
import { useSearchParams } from "react-router-dom";

export default function useSearchFilm<T, K>(
  genres: IGenre[],
  key: string,
  service: (query: string) => Promise<ResultsDto<T>>,
  selector: (data: ResultsDto<T>, genres: IGenre[]) => K[]
) {
  const [searchParams] = useSearchParams();
  const isSearching = !!searchParams.get("q");
  const query = searchParams.get("q");

  const fallback: K[] = [];

  const { data = fallback, isFetching } = useQuery({
    queryKey: [key, query],
    queryFn: () => service(query === null ? "" : query),
    select: (data) => selector(data, genres),
    cacheTime: 0,
    enabled: !!query,
  });

  return { data, isFetching, isSearching };
}
