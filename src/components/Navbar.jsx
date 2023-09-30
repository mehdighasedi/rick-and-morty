import { HeartIcon } from "@heroicons/react/24/outline";
import { Children } from "react";
function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />

      {children}
      <Favourite />
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

function Favourite() {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">5</span>
    </button>
  );
}
