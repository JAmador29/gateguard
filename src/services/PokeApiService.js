import { useCallback, useEffect, useState } from "react"
const baseAPIUrl = 'https://pokeapi.co/api/v2/'
const usePokemonApi = ()=>{
    const [pokemonsLoaded, setPokemonsLoaded] = useState({});
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(0);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState({});

    const setOffsetAndLimit = (offset = 0, limit = 20) => {
        setOffset(offset);
        setLimit(limit);
    }

    useEffect( ()=>{
        if( status === "idle") {
            setStatus("loading");
            fetch(`${baseAPIUrl}pokemon?offset=${offset}&limit=${limit}`)
                .then(rstl=>rstl.json())
                .then(data=>{
                    console.log(data);
                    setPokemonsLoaded(data);
                    setStatus("idle");
                })
                .catch(err=>{
                    setPokemonsLoaded([]);
                    setError(err);
                    setStatus("idle")
                })
        }
    } , [offset, limit]);
    return {
        pokemonsLoaded,
        offset,
        limit,
        status,
        setOffsetAndLimit
    }
}

export default usePokemonApi;