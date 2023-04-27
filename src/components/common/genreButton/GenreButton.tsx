import React from "react";
import IGenre from "../../../models/IGenre";

interface Props {
  children: React.ReactNode;
  genre: IGenre;
}

function GenreButton({ children, genre }: Props) {
  return (
    <span
      className="genre-button"
      style={{
        border: `1px solid ${genre?.borderColor}`,
      }}
    >
      {children}
      {genre?.name}
    </span>
  );
}

export default GenreButton;
