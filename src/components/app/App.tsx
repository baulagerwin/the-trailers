import { Route, Routes } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import Movies from "../movies/Movies";
import TvShows from "../tv-shows/TvShows";
import Index from "../../middleware/Index";
import Movie from "../movie/Movie";
import TvShow from "../tv-show/TvShow";

function App() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="movies">
        <Route index element={<Movies />} />
        <Route path=":movieId" element={<Movie />} />
      </Route>
      <Route path="tv-shows">
        <Route index element={<TvShows />} />
        <Route path=":tvShowId" element={<TvShow />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
