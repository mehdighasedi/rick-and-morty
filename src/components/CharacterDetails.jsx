import { character, episodes } from "../../data/data";
import { HeartIcon } from "@heroicons/react/24/solid";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
function CharacterDetails() {
  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img
          className="character-detail__img "
          src={character.image}
          alt={character.name}
        />
        <div className="character-detail__info">
          <h3 className="name">
            <span>{character.gender === "Male" ? "🧑" : "👩"}</span>
            <span> {character.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${character.status === "Dead" ? "red" : ""}`}
            ></span>
            <span> {character.status} -</span>
            <span> {character.species}</span>
          </div>
          <div className="location">
            <p>Last Known Places : </p>
            <p>{character.location.name}</p>
          </div>
          <div className="actions">
            <button className="btn btn--primary">
              <span className="icon red">
                <HeartIcon className="heart" />
              </span>
              Add To Favorite
            </button>
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2>List Of Episodes : </h2>
          <button>
            <ArrowUpCircleIcon className="icon" />
          </button>
        </div>
        <ul>
          {episodes.map((e, index) => (
            <li key={e.id}>
              <div>
                {String(index + 1).padStart("2", 0)} - {e.episode} :
                <strong> {e.name}</strong>
              </div>
              <div className="badge badge--secondary">{e.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetails;
