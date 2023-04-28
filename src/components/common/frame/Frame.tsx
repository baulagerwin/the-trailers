import basePosterURL from "../../../tmdb/basePosterURL";

interface Props {
  person: {
    profile_path: string;
    character?: string;
    job?: string;
    name: string;
  };
}

function Frame({ person }: Props) {
  return (
    <div className="frame">
      <div className="frame__image">
        <div className="u__overlay--cover"></div>
        <img
          src={`${basePosterURL}/${person.profile_path}`}
          alt="A picture of a person."
        />
      </div>
      {!!person.character && (
        <span className="frame__job">{person.character}</span>
      )}
      {!!person.job && <span className="frame__job">{person.job}</span>}
      <span>{person.name}</span>
    </div>
  );
}

export default Frame;
