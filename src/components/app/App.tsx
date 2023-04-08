import { Route, Routes } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import Movies from "../movies/Movies";
import TvShows from "../tv-shows/TvShows";
import Index from "../../middleware/Index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv-shows" element={<TvShows />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
