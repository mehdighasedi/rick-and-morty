import { EyeIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
function CharacterList({ characters, onSelectCharacter, selectedId }) {
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character key={item.id} item={item}>
          <button
            className="icon red"
            onClick={() => onSelectCharacter(item.id)}
          >
            {selectedId === item.id ? <XCircleIcon /> : <EyeIcon />}
          </button>
        </Character>
      ))}
    </div>
  );
}

export default CharacterList;

export function Character({ item, children, selectedId }) {
  return (
    <div
      className={selectedId === item.id ? "list__item selected " : "list__item"}
    >
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        {item.gender === "Male" ? "🧑" : "👩"} {item.name}
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${
            item.status === "Dead"
              ? "red"
              : item.status === "unknown"
              ? "alien"
              : ""
          } `}
        ></span>
        <span> {item.status} </span>
        <span> - {item.species}</span>
      </div>
      {children}
    </div>
  );
}
