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
import Modal from "./Components/Modal";

function App() {
  const [character, setCharacter] = useState([]);
  const [isLoading, setIsLoader] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourite, setFavourite] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleSelectedCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const handleFavourite = (char) => {
    setFavourite((prevFavourite) => [...prevFavourite, char]);
  };
  console.log(ifexisted);
  console.log(selectedId);
  const handleOpen = () => {
    setIsOpen(false);
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
      <Modal title={"Title Modal Man"} open={isOpen} onOpen={handleOpen} />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numbOfResult={character.length} loader={isLoading} />
        <Favourite numOfFavourites={favourite.length} />
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
