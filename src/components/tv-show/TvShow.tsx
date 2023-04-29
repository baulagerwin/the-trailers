import { useParams } from "react-router-dom";
import keys from "../../react-query/keys";
import getTvShow from "./services/getTvShow";
import { useQuery } from "@tanstack/react-query";
import getTvShowCasts from "./services/getTvShowCasts";
import getTvShowPosters from "./services/getTvShowPosters";
import getTvShowVideos from "./services/getTvShowVideos";
import getRandomColor from "../../utils/getRandomColor";
import BackgroundFilm from "../common/backgroundFilm/BackgroundFilm";
import Footer from "../common/footer/Footer";
import FilmDetails from "../common/filmDetails/FilmDetails";
import ITvShowDetails from "../../models/ITvShowDetails";
import useQueryGenres from "../../hooks/useQueryGenres";
import getTvShowGenres from "../tv-shows/services/getTvShowGenres";
import useSearchFilm from "../../hooks/useSearchFilm";
import TvShowDto from "../../dtos/TvShowDto";
import ITvShow from "../../models/ITvShow";
import { getSearchTvShows } from "../tv-shows/services/getSearchTvShows";
import { tvShowsSelector } from "../../react-query/selectors";
import SearchFilm from "../common/searchFilm/SearchFilm";
import ICast from "../../models/ICast";
import ICrew from "../../models/ICrew";
import useQueryPopUpFilms from "../../hooks/useQueryPopUpFilms";
import PopUpFilms from "../common/popupFilms/PopUpFilms";
import { useCallback } from "react";
import IGenre from "../../models/IGenre";
import TvShowLoader from "./loader/TvShowLoader";

function TvShow() {
  const { tvShowId } = useParams();

  const genres = useQueryGenres(keys.tvShowGenres, getTvShowGenres);

  const searched = useSearchFilm<TvShowDto, ITvShow>(
    genres,
    keys.searchedMovies,
    getSearchTvShows,
    tvShowsSelector
  );

  const popup = useQueryPopUpFilms<TvShowDto, ITvShow>(
    keys.popupTvShows,
    tvShowsSelector,
    genres
  );

  const genresSelector = useCallback(
    (genre: IGenre) => ({
      ...genre,
      borderColor: getRandomColor(),
    }),
    []
  );

  const transformTvShow = useCallback(
    (tvShow: ITvShowDetails) => ({
      ...tvShow,
      genres: tvShow.genres.map(genresSelector),
    }),
    []
  );

  const tvShow = useQuery({
    queryKey: [keys.tvShow, tvShowId],
    queryFn: () => getTvShow(tvShowId as string),
    select: transformTvShow,
    cacheTime: 0,
  });

  const casts = useQuery({
    queryKey: [keys.movieCasts, tvShowId],
    queryFn: () => getTvShowCasts(tvShowId as string),
    cacheTime: 0,
  });

  const posters = useQuery({
    queryKey: [keys.moviePosters, tvShowId],
    queryFn: () => getTvShowPosters(tvShowId as string),
    cacheTime: 0,
  });

  const videos = useQuery({
    queryKey: [keys.movieVideos, tvShowId],
    queryFn: () => getTvShowVideos(tvShowId as string),
    cacheTime: 0,
  });

  if (
    tvShow.isInitialLoading ||
    casts.isInitialLoading ||
    posters.isInitialLoading ||
    videos.isInitialLoading
  )
    return <TvShowLoader />;

  return (
    <>
      {!!popup.status && (
        <PopUpFilms
          category={popup.category}
          infiniteFilms={popup.infiniteFilms}
          isInitialLoading={popup.isInitialLoading}
          isFetching={popup.isFetching}
          fetchNextPage={popup.fetchNextPage}
          status={popup.status}
          onClose={popup.closePopUp}
          onReset={popup.resetPopUp}
        />
      )}
      {searched.isSearching && (
        <SearchFilm isFetching={searched.isFetching} results={searched.data} />
      )}
      <div
        className={`tv-show ${
          searched.isSearching && "u__animation--search-open"
        }`}
      >
        <BackgroundFilm
          backgroundImageUrl={tvShow.data?.backdrop_path as string}
          children={null}
        />
        <div className="tv-show__body">
          <FilmDetails
            film={tvShow.data as ITvShowDetails}
            discover="tv"
            casts={casts.data?.cast as ICast[]}
            crews={casts.data?.crew as ICrew[]}
            onPopUpOpen={popup.openPopUp}
            trailerKey={videos.data?.results[0].key as string}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default TvShow;
