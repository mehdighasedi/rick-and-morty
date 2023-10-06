import { HeartIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";

function CharacterDetails({ selectedId, onAddFavourite, ifIsAdded }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        const episodeId = data.episode.map((e) => e.split("/").at(-1));

        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        setEpisodes([episodeData].flat());
      } catch (error) {
        toast.error("There is a Problem With Fetcing Data!");
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fetchData();
  }, [selectedId]);
  if (isLoading)
    return (
      <div style={{ flex: "1" }}>
        <Loader />
      </div>
    );
  if (!character || !selectedId)
    return (
      <div className="character-details">
        <h1 className="loader-text" style={{ flex: "1", margin: "auto" }}>
          Please Select a Character
        </h1>
      </div>
    );
  return (
    <div style={{ flex: 1 }}>
      <CharacterInfo
        character={character}
        onAddFavourite={onAddFavourite}
        ifIsAdded={ifIsAdded}
      />

      <CharacterEpisodes episodes={episodes} />
    </div>
  );
}

export default CharacterDetails;

function CharacterInfo({ character, ifIsAdded, onAddFavourite }) {
  return (
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
          {ifIsAdded ? (
            <div className="added">
              <span className="icon red">
                <CheckCircleIcon />
              </span>
              <span>Added To Favourites</span>
            </div>
          ) : (
            <button
              className="btn btn--primary"
              onClick={() => onAddFavourite(character)}
            >
              <span className="icon red">
                <HeartIcon className="heart" />
              </span>
              Add To Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CharacterEpisodes({ episodes }) {
  const [sortBy, setSortBy] = useState(true);

  let sortedEpisodes;

  sortBy
    ? (sortedEpisodes = [...episodes].sort(
        (a, b) => new Date(a.created) - new Date(b.created)
      ))
    : (sortedEpisodes = [...episodes].sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      ));

  return (
    <div className="character-episodes">
      <div className="title" style={{ marginBottom: "10px" }}>
        <h2>List Of Episodes : </h2>
        <button onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: sortBy ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <div>
        <ul>
          {sortedEpisodes.map((e, index) => (
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
