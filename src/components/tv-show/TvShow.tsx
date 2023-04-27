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

function TvShow() {
  const { tvShowId } = useParams();

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
  });

  const casts = useQuery({
    queryKey: [keys.movieCasts, tvShowId],
    queryFn: () => getTvShowCasts(tvShowId as string),
  });

  const posters = useQuery({
    queryKey: [keys.moviePosters, tvShowId],
    queryFn: () => getTvShowPosters(tvShowId as string),
  });

  const videos = useQuery({
    queryKey: [keys.movieVideos, tvShowId],
    queryFn: () => getTvShowVideos(tvShowId as string),
  });

  if (
    tvShow.isInitialLoading ||
    casts.isInitialLoading ||
    posters.isInitialLoading ||
    videos.isInitialLoading
  )
    return <div>Loading...</div>;

  console.log(tvShow.data);

  return (
    <div className="tv-show">
      <BackgroundFilm
        backgroundImageUrl={tvShow.data?.backdrop_path as string}
        children={null}
      />
      <div className="tv-show__body">
        <FilmDetails film={tvShow.data as ITvShowDetails} />
      </div>
      <Footer />
    </div>
  );
}

export default TvShow;
