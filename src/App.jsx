import "./App.css";

//icon

//components
import CharacterDetails from "./Components/CharacterDetails";
import CharacterList from "./Components/CharacterList";
import Navbar, { Search } from "./Components/Navbar";
import Loader from "./Components/Loader";
import { useEffect, useState } from "react";
import { SearchResult } from "./Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [character, setCharacter] = useState([]);
  const [isLoading, setIsLoader] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoader(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        setCharacter(data.results.slice(0, 5));
      } catch (err) {
        // setCharacter([]);
        toast.error(err.response.data.error);
      } finally {
        setIsLoader(false);
      }
    }

    fetchData();
  }, [query]);

  return (
    <div className="app">
      <Toaster
        toastOptions={{
          error: {
            style: {
              backgroundColor: "var(--slate-700)",
              color: "var(--slate-200)",
            },
          },
        }}
      />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numbOfResult={character.length} loader={isLoading} />
      </Navbar>
      <div className="main">
        {isLoading ? <Loader /> : <CharacterList characters={character} />}
        <CharacterDetails />
      </div>
    </div>
  );
}

export default App;
