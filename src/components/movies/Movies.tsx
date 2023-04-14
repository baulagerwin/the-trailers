import useAnimeMovies from "./hooks/useAnimeMovies";
import Header, { IHeader } from "../common/header/Header";
import { FcFilm, FcFilmReel } from "react-icons/fc";
import { FiTrendingUp } from "react-icons/fi";
import { GiFilmProjector } from "react-icons/gi";
import Slideshow from "../common/slideshow/Slideshow";
import useTopRatedMovies from "./hooks/useTopRatedMovies";
import useNowPlayingMovies from "./hooks/useNowPlayingMovies";
import useTrendingMovies from "./hooks/useTrendingMovies";
import MoviesLoader from "./loader/MoviesLoader";
import { useIsFetching } from "react-query";
import Footer from "../common/footer/Footer";
import useMovieGenres from "./hooks/useMovieGenres";
import useHeaderMovie from "./hooks/useHeaderMovie";
import IMovie from "../../models/IMovie";
import PopUp from "../common/popup/PopUp";
import useToggleWithAnimation from "../common/hooks/useToggleWithAnimation";

function Movies() {
  const isFetching = useIsFetching();
  const { status, handleOnOpen, handleOnClose } = useToggleWithAnimation();
  const genres = useMovieGenres();
  const trendingMovies = useTrendingMovies(genres);
  const headerMovie = useHeaderMovie(trendingMovies);
  const nowPlayingMovies = useNowPlayingMovies(genres);
  const topRatedMovies = useTopRatedMovies(genres);
  const animeMovies = useAnimeMovies(genres);

  const slideshowSelector = (movies: IMovie[]) => {
    return movies.map((movie) => ({
      id: movie.id,
      imageUrl: movie.poster_path,
      title: movie.title,
      releaseDate: movie.release_date,
      genres: movie.genres,
    }));
  };

  if (isFetching) return <MoviesLoader />;

  return (
    <>
      {!!status && (
        <PopUp status={status} onClose={handleOnClose}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit
          dolore nulla odio itaque incidunt iste laboriosam mollitia commodi
          placeat, perspiciatis, impedit esse. Alias libero eius hic ipsam
          magnam reprehenderit quod architecto ab velit sunt cum illum
          recusandae quasi, porro, dolorem tenetur excepturi optio itaque sed
          adipisci? Deserunt, quibusdam similique ipsa sit molestiae aperiam
          expedita saepe reiciendis necessitatibus dolore rerum, quaerat
          accusamus corrupti autem reprehenderit! Id laudantium a impedit quia
          et, consectetur error quae natus labore sed necessitatibus, eaque
          blanditiis voluptates ea fugit! Ipsum magni similique id aut pariatur
          dicta quos nisi vel dolores. Voluptate rerum expedita laboriosam
          tenetur nesciunt commodi adipisci architecto voluptas illo mollitia
          labore cupiditate, optio cum placeat. Modi doloremque sequi animi
          nesciunt at in. Debitis itaque deleniti vero ipsam porro recusandae,
          cupiditate non esse, eaque at soluta praesentium corporis beatae
          corrupti odio. Atque possimus laudantium nisi officiis dolore quas
          soluta cupiditate ad natus eveniet, maxime iusto quam error quibusdam
          dolorem ut porro, reiciendis quisquam dolores tempora. Doloremque
          possimus, esse sequi quam eaque at amet? Ratione, ut minus pariatur
          laudantium architecto praesentium. Tempore odio expedita maiores
          aperiam. Sapiente eveniet recusandae, maiores magnam distinctio iste
          provident similique est animi quibusdam repudiandae modi vitae
          repellat, sequi odit aperiam illo exercitationem mollitia
          reprehenderit laborum impedit, libero voluptate! Dignissimos non unde
          in molestiae quod! Rem quaerat molestiae porro nihil nam voluptatem
          magnam non asperiores, ex quod, quo laudantium in aliquam. Fugit aut,
          autem aliquid magni dolorem veniam placeat quam temporibus tempore in,
          et ea, ex consequatur animi laborum debitis eos reiciendis. Cum
          cupiditate voluptas obcaecati nobis iure fugiat dicta reprehenderit
          tempora recusandae commodi porro fuga neque possimus ea cumque, ipsam
          vero earum. Ad cupiditate aliquam at vitae debitis alias esse eius
          voluptatem vero! Nostrum ipsa maiores optio natus, voluptatum vero
          esse omnis in libero beatae quisquam! Sint, alias accusamus!
          Voluptatem, porro commodi. Iure, accusantium illum? Veniam odit
          ratione harum tempore possimus assumenda expedita saepe dolore quidem
          dolorum a, ad similique nemo unde quas magnam incidunt amet eum
          asperiores totam, dolores, dicta cum laboriosam. Assumenda laborum
          illo magnam cum saepe, nihil excepturi harum voluptates blanditiis
          non? Illo assumenda sed officia, quo est error modi dolorum voluptate
          ratione debitis obcaecati, maxime id deleniti temporibus deserunt eius
          facilis repellendus nam? Provident ab facere sit ipsam molestias
          perspiciatis voluptatum! Adipisci iure, iste eveniet alias itaque
          recusandae? Vel nostrum commodi aliquam obcaecati voluptatum quasi
          quae libero quia sint iure. Fugit corrupti deserunt praesentium beatae
          repellat impedit provident!
        </PopUp>
      )}
      <div className="movies">
        <Header item={headerMovie as IHeader} onPopUpOpen={handleOnOpen} />
        <div className="movies__body">
          <Slideshow
            items={slideshowSelector(trendingMovies)}
            icon={<FiTrendingUp className="slideshow__type-icon" />}
            type="Trending"
            onPopUpOpen={handleOnOpen}
          />
          <Slideshow
            items={slideshowSelector(nowPlayingMovies)}
            icon={<FcFilm className="slideshow__type-icon" />}
            type="Now showing"
            onPopUpOpen={handleOnOpen}
          />
          <Slideshow
            items={slideshowSelector(animeMovies)}
            icon={<FcFilmReel className="slideshow__type-icon" />}
            type="Anime"
            onPopUpOpen={handleOnOpen}
          />
          <Slideshow
            items={slideshowSelector(topRatedMovies)}
            icon={<GiFilmProjector className="slideshow__type-icon" />}
            type="Highly rated"
            onPopUpOpen={handleOnOpen}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Movies;
