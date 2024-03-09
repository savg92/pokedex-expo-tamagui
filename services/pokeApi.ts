import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

export const getPokemons = async (limit = 151, offset = 0) => {
    try {
        const res = await axios.get(`${baseUrl}?limit=${limit}&offset=${offset}`);
        const pokemons = await Promise.all(
            res.data.results.map(async (pokemon: any) => {
                const pokemonResponse = await axios.get(pokemon.url);
                return {
                    id: pokemonResponse.data.id,
                    name: pokemonResponse.data.name,
                    img: pokemonResponse.data.sprites.front_default,
                    type: pokemonResponse.data.types[0].type.name,
                };
            })
        );
        return pokemons;
    } catch (e) {
        return [
            {
                name: 'Not Found',
                img: 'https://via.placeholder.com/150',
                id: 0,
                type: 'none',
            },
        ];
    }
}

export const getPokemon = async (name: string | number | undefined) => {
    try {
        const res = await axios.get(`${baseUrl}/${name}`);
        return {
            id: res.data.id,
            name: res.data.name,
            img: res.data.sprites.other['official-artwork'].front_default,
            type: res.data.types,
            avilities: res.data.abilities,
            height: res.data.height,
            weight: res.data.weight,
        };
    } catch (e) {
        return {
            name: 'Not Found',
            img: 'https://via.placeholder.com/150',
            id: 0,
            type: [],
            avilities: ['none'],
            height: 0,
            weight: 0,
        };
    }
}