import "./App.css";

//icon

//components
import CharacterDetails from "./Components/CharacterDetails";
import CharacterList from "./Components/CharacterList";
import Navbar from "./Components/Navbar";
import Loader from "./Components/Loader";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [character, setCharacter] = useState([]);
  const [isLoading, setIsLoader] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoader(true);
        const res = await fetch("https://rickandmortyapi.com/api/character");
        if (!res.ok) throw new Error("SomeThing Went Wrong!!");
        const data = await res.json();
        setCharacter(data.results.slice(0, 7));
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setIsLoader(false);
      }
    }

    fetchData();
  }, []);

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
      <Navbar numbOfResult={character.length} loader={isLoading} />
      <div className="main">
        {isLoading ? <Loader /> : <CharacterList characters={character} />}
        <CharacterDetails />
      </div>
    </div>
  );
}

export default App;
