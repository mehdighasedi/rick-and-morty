import "./App.css";

//hooks
import useCharacters from "./hooks/useCharacters";
//components
import CharacterDetails from "./Components/CharacterDetails";
import CharacterList from "./Components/CharacterList";
import Navbar, { Favourite, Search } from "./Components/Navbar";
import Loader from "./Components/Loader";
import { useEffect, useState } from "react";
import { SearchResult } from "./Components/Navbar";
import { Toaster } from "react-hot-toast";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { character, isLoading } = useCharacters(query);
  const [selectedId, setSelectedId] = useState(null);
  const [favourite, setFavourite] = useLocalStorage("FAVOURITES ITEM", []);

  const ifexisted = favourite.map((fav) => fav.id).includes(selectedId);

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
