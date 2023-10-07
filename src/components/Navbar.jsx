import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Children, useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";
function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />

      {children}
    </nav>
  );
}

export default Navbar;

function Logo() {
  return (
    <div className="navbar__logo">
      <img src="./rick.png" alt="rick--logo" className="img" />
      Rick And Morty
    </div>
  );
}

export function SearchResult({ loader, numbOfResult }) {
  return (
    <div className="navbar__result">
      {" "}
      {loader ? "Loading Data" : `Found ${numbOfResult} Result`}
    </div>
  );
}

export function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="text-field"
      placeholder="search ..."
    />
  );
}

export function Favourite({ favourites, onRemoveFavourite }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal title={"List Of Favourite"} onOpen={setIsOpen} open={isOpen}>
        {!favourites.length ? (
          <p className="name"> 🤷‍♂️ There is no Favourite Character yet</p>
        ) : (
          favourites.map((item) => (
            <Character key={item.id} item={item}>
              <button
                className="icon red"
                onClick={() => onRemoveFavourite(item.id)}
              >
                <TrashIcon />
              </button>
            </Character>
          ))
        )}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
}
