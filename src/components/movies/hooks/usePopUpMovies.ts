import keys from "../../../react-query/keys";
import IMovie from "../../../models/IMovie";
import MovieDto from "../../../dtos/MovieDto";
import ResultsDto from "../../../dtos/ResultsDto";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import useTransitionAnimation from "../../../hooks/useTransitionAnimation";
import { IPopUpCategory } from "../popup/PopUpMovies";
import IGenre from "../../../models/IGenre";
import { moviesSelector } from "../../../react-query/selectors";

async function getPopUpMovies(url: string): Promise<ResultsDto<MovieDto>> {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

function useQueryPopUpMovies(category: IPopUpCategory) {
  const fallback = {
    pageParams: [],
    pages: [],
  };

  const {
    data = fallback,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [keys.popupMovies, category.name],
    queryFn: ({ pageParam = 1 }) =>
      getPopUpMovies(category.url + `&page=${pageParam}`),
    getNextPageParam: (lastPage, allPages) => lastPage.page + 1 || undefined,
    enabled: !!category.url,
  });

  return { infiniteMovies: data.pages, fetchNextPage };
}

export default function usePopUpMovies(genres: IGenre[]) {
  const { status, handleOnOpen, handleOnClose } = useTransitionAnimation();
  const [category, setCategory] = useState<IPopUpCategory>({
    name: "",
    url: "",
  });

  const { infiniteMovies, fetchNextPage } = useQueryPopUpMovies(category);

  function openPopUp(e: React.MouseEvent, data: IPopUpCategory) {
    setCategory(data);
    handleOnOpen(e);
  }

  function closePopUp() {
    setCategory({
      name: "",
      url: "",
    });
    handleOnClose();
  }
  return {
    infiniteMovies: infiniteMovies.map((page) => moviesSelector(page, genres)),
    fetchNextPage,
    category,
    status,
    openPopUp,
    closePopUp,
  };
}
