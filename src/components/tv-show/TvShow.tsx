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

function TvShow() {
  const { tvShowId } = useParams();

  const genres = useQueryGenres(keys.tvShowGenres, getTvShowGenres);

  const searched = useSearchFilm<TvShowDto, ITvShow>(
    genres,
    keys.searchedMovies,
    getSearchTvShows,
    tvShowsSelector
  );

  const tvShow = useQuery({
    queryKey: [keys.tvShow, tvShowId],
    queryFn: () => getTvShow(tvShowId as string),
    select: (tvShow) => ({
      ...tvShow,
      genres: tvShow.genres.map((genre) => ({
        ...genre,
        borderColor: getRandomColor(),
      })),
    }),
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
    return <div>Loading...</div>;

  console.log(casts.data);

  return (
    <>
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
            casts={casts.data?.cast as ICast[]}
            crews={casts.data?.crew as ICrew[]}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default TvShow;
