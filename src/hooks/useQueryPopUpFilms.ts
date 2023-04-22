import { useInfiniteQuery } from "@tanstack/react-query";
import { IPopUpCategory } from "../components/common/popupFilms/PopUpFilms";
import ResultsDto from "../dtos/ResultsDto";
import IGenre from "../models/IGenre";
import useTransitionAnimation from "./useTransitionAnimation";
import { useState } from "react";

async function getPopUpFilms<T>(url: string): Promise<ResultsDto<T>> {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

function useQueryPopUpFilms<T>(key: string, category: IPopUpCategory) {
  const fallback = {
    pageParams: [],
    pages: [],
  };

  const {
    data = fallback,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [key, category.name],
    queryFn: ({ pageParam = 1 }) =>
      getPopUpFilms<T>(category.url + `&page=${pageParam}`),
    getNextPageParam: (lastPage, allPages) => lastPage.page + 1 || undefined,
    cacheTime: 0,
    enabled: !!category.url,
  });

  return { infiniteFilms: data.pages, fetchNextPage };
}

export default function usePopUpFilms<T, K>(
  key: string,
  selector: (data: ResultsDto<T>, genres: IGenre[]) => K[],
  genres: IGenre[]
) {
  const { status, handleOnOpen, handleOnClose } = useTransitionAnimation();
  const [category, setCategory] = useState<IPopUpCategory>({
    name: "",
    url: "",
  });

  const { infiniteFilms, fetchNextPage } = useQueryPopUpFilms<T>(key, category);

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
    infiniteFilms: infiniteFilms.map((page) => selector(page, genres)),
    fetchNextPage,
    category,
    status,
    openPopUp,
    closePopUp,
  };
}