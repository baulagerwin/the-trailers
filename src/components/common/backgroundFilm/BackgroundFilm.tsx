import React from "react";
import baseBackDropURL from "../../../tmdb/baseBackDropURL";

interface Props {
  children: React.ReactNode;
  backgroundImageUrl: string;
}

function BackgroundFilm({ children, backgroundImageUrl }: Props) {
  return (
    <header
      className="background-film"
      style={{
        backgroundImage: `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.8),
        rgba(0, 0, 0, 0.2),
        rgba(5, 22, 30, 0.6),
        rgba(5, 22, 30, 1)
      ), url(${!!backgroundImageUrl && baseBackDropURL + backgroundImageUrl})`,
      }}
    >
      {children}
    </header>
  );
}

export default BackgroundFilm;
