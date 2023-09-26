import { HeartIcon } from "@heroicons/react/24/outline";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="./rick.png" alt="rick--logo" className="img" />
        Rick And Morty
      </div>
      <input type="text" className="text-field" placeholder="search ..." />
      <div className="navbar__result"> Found X Result</div>
      <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">5</span>
      </button>
    </nav>
  );
}

export default Navbar;
