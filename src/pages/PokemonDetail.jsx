import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const baseAPIUrl = "https://pokeapi.co/api/v2/";

const PokemonDetail = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        setStatus("loading");
        fetch(`${baseAPIUrl}pokemon/${id}`)
            .then((rstl) => rstl.json())
            .then((data) => {
                setPokemon(data);
                setStatus("idle");
            })
            .catch(() => setStatus("error"));
    }, [id]);

    if (status === "loading") {
        return <div className="page">Cargando Pokemon...</div>;
    }

    if (status === "error" || !pokemon) {
        return (
            <section className="page">
                <p className="page-text">No se pudo cargar el Pokemon.</p>
                <Link to="/pokemon" className="nav-link">Volver</Link>
            </section>
        );
    }

    const sprite =
        pokemon.sprites?.other?.["official-artwork"]?.front_default ??
        pokemon.sprites?.front_default;

    return (
        <section className="page">
            <Link to="/pokemon" className="nav-link pd-back">← Volver</Link>

            <div className="pd-card">
                <div className="pd-media">
                    <img src={sprite} alt={pokemon.name} className="pd-sprite" />
                </div>

                <div className="pd-info">
                    <span className="page-badge">#{String(pokemon.id).padStart(3, "0")}</span>
                    <h2 className="page-title pd-name">{pokemon.name}</h2>

                    <div className="pd-types">
                        {pokemon.types.map((t) => (
                            <span
                                key={t.type.name}
                                className={`pd-type pd-type-${t.type.name}`}
                            >
                                {t.type.name}
                            </span>
                        ))}
                    </div>

                    <div className="pd-measurements">
                        <div>
                            <strong>{pokemon.height / 10} m</strong>
                            <span>Altura</span>
                        </div>
                        <div>
                            <strong>{pokemon.weight / 10} kg</strong>
                            <span>Peso</span>
                        </div>
                    </div>

                    <div className="pd-stats">
                        {pokemon.stats.map((s) => (
                            <div key={s.stat.name} className="pd-stat-row">
                                <span className="pd-stat-name">{s.stat.name}</span>
                                <div className="pd-stat-bar">
                                    <div
                                        className="pd-stat-fill"
                                        style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                                    />
                                </div>
                                <span className="pd-stat-value">{s.base_stat}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PokemonDetail;