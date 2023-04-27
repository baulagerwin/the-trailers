import { useQuery } from "@tanstack/react-query";
import IGenre from "../models/IGenre";
import GenresDto from "../dtos/GenresDto";
import { genresSelector } from "../react-query/selectors";

export default function useQueryGenres(
  key: string,
  service: () => Promise<GenresDto>
) {
  const fallback: IGenre[] = [];

  const { data = fallback } = useQuery({
    queryKey: [key],
    queryFn: service,
    select: genresSelector,
  });

  return data;
}
