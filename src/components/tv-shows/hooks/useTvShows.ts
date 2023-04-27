import TvShowDto from "../../../dtos/TvShowDto";
import useHeaderFilm from "../../../hooks/useHeaderFilm";
import useQueryFilms from "../../../hooks/useQueryFilms";
import useQueryGenres from "../../../hooks/useQueryGenres";
import useQueryPopUpFilms from "../../../hooks/useQueryPopUpFilms";
import useSearchFilm from "../../../hooks/useSearchFilm";
import ITvShow from "../../../models/ITvShow";
import keys from "../../../react-query/keys";
import { tvShowsSelector } from "../../../react-query/selectors";
import getAnimeTvShows from "../services/getAnimeTvShows";
import getKoreanDramas from "../services/getKoreanDramas";
import { getSearchTvShows } from "../services/getSearchTvShows";
import { getTopRatedTvShows } from "../services/getTopRatedTvShows";
import getTrendingTvShows from "../services/getTrendingTvShows";
import getTvShowGenres from "../services/getTvShowGenres";

function useTvShows() {
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

  const trending = useQueryFilms<TvShowDto, ITvShow>(
    genres,
    keys.trendingTvShows,
    getTrendingTvShows,
    tvShowsSelector
  );

  const korean = useQueryFilms<TvShowDto, ITvShow>(
    genres,
    keys.koreanDramas,
    getKoreanDramas,
    tvShowsSelector
  );

  const topRated = useQueryFilms<TvShowDto, ITvShow>(
    genres,
    keys.topRatedTvShows,
    getTopRatedTvShows,
    tvShowsSelector
  );

  const anime = useQueryFilms<TvShowDto, ITvShow>(
    genres,
    keys.animeTvShows,
    getAnimeTvShows,
    tvShowsSelector
  );

  const header = useHeaderFilm<ITvShow>(trending.data);

  const slideshowItemsSelector = (tvShows: ITvShow[]) => {
    return tvShows.map((tvShow) => ({
      id: tvShow.id,
      imageUrl: tvShow.poster_path,
      title: tvShow.name,
      releaseDate: tvShow.first_air_date,
      genres: tvShow.genres,
    }));
  };

  return {
    searched,
    popup,
    trending,
    korean,
    topRated,
    anime: anime,
    header: header,
    slideshowItemsSelector,
  };
}

export default useTvShows;
