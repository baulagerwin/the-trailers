import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MoviesLoader from "../components/movies/loader/MoviesLoader";

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/tv-shows");
  }, []);

  return <MoviesLoader />;
}

export default Index;
