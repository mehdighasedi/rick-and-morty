import "./App.css";

//data
import { allCharacters } from "../data/data";

//components
import CharacterDetails from "./Components/CharacterDetails";
import CharacterList from "./Components/CharacterList";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList characters={allCharacters} />
        <CharacterDetails />
      </div>
    </div>
  );
}

export default App;
