import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


export default function useCharacters(query) {
    const [character, setCharacter] = useState([]);
    const [isLoading, setIsLoader] = useState(false);
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

    return { character, isLoading }
}