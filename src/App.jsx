import "./App.css";

//icon

//components
import CharacterDetails from "./Components/CharacterDetails";
import CharacterList from "./Components/CharacterList";
import Navbar, { Favourite, Search } from "./Components/Navbar";
import Loader from "./Components/Loader";
import { useEffect, useState } from "react";
import { SearchResult } from "./Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [character, setCharacter] = useState([]);
  const [isLoading, setIsLoader] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourite, setFavourite] = useState(
    () => JSON.parse(localStorage.getItem("FAVOURITES ITEM")) || []
  );

  const ifexisted = favourite.map((fav) => fav.id).includes(selectedId);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoader(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        setCharacter(data.results.slice(0, 5));
      } catch (err) {
        // setCharacter([]);
        if (!axios.isCancel()) {
          setCharacter([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoader(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("FAVOURITES ITEM", JSON.stringify(favourite));
  }, [favourite]);

  const handleSelectedCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const handleFavourite = (char) => {
    setFavourite((prevFavourite) => [...prevFavourite, char]);
  };
  console.log(ifexisted);
  console.log(selectedId);

  const handleRemoveFavourite = (id) => {
    setFavourite((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };
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
        <Favourite
          favourites={favourite}
          onRemoveFavourite={handleRemoveFavourite}
        />
      </Navbar>
      <div className="main">
        {isLoading ? (
          <Loader />
        ) : (
          <CharacterList
            characters={character}
            selectedId={selectedId}
            onSelectCharacter={handleSelectedCharacter}
          />
        )}
        <CharacterDetails
          selectedId={selectedId}
          onAddFavourite={handleFavourite}
          ifIsAdded={ifexisted}
        />
      </div>
    </div>
  );
}

export default App;
