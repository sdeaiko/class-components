const URL: string = 'https://pokeapi.co/api/v2/pokemon';
const LIMIT: number = 20;

interface fetchDataArguments {
  url: string;
  limit: number;
}

interface pokemonURL {
  url: string;
}

export interface IPokemonAbility {
  ability: {
    name: string;
  };
}

export interface IPokemonSkill {
  name: string;
}

export interface IPokemon {
  id: number;
  name: string;
  abilities: IPokemonSkill[];
  height: number;
  weight: number;
  image: string;
}

export interface fetchingPokemon {
  id: number;
  name: string;
  abilities: IPokemonAbility[];
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

interface PokemonApiResponse {
  results: {
    url: string;
  }[];
}

const fetchData = async ({
  url,
  limit,
}: fetchDataArguments): Promise<string[]> => {
  try {
    const response = await fetch(`${url}?limit=${limit}`);
    const data: PokemonApiResponse = await response.json();
    const getResult = data.results;
    const pokemonsList: Array<string> = getResult.map((pokemon: pokemonURL) => {
      const getURL = pokemon.url;
      return getURL;
    });
    return pokemonsList;
  } catch (e) {
    throw new Error('Problem with fetching pokemon-list');
  }
};

const fetchEachPokemon = async (pokemonList: string[]): Promise<IPokemon[]> => {
  try {
    const pokemonsData = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const pokemonUrl = pokemon;
        const response = await fetch(pokemonUrl);
        const data: fetchingPokemon = await response.json();
        const pokemonData: IPokemon = editedPokemon(data);
        return pokemonData;
      })
    );
    return pokemonsData;
  } catch (e) {
    throw new Error('Problem with fetching pokemon-item');
  }
};

const fetchSelectedPokemon = async (pokemonName: string): Promise<IPokemon> => {
  try {
    const response = await fetch(`${URL}/${pokemonName}`);
    const data: fetchingPokemon = await response.json();
    const pokemonData: IPokemon = editedPokemon(data);
    return pokemonData;
  } catch (e) {
    throw new Error('Problem with fetching pokemon-item');
  }
};

function editedPokemon(data: fetchingPokemon): IPokemon {
  return {
    id: data.id,
    name: data.name,
    abilities: data.abilities.map((ability: IPokemonAbility) => ({
      name: ability.ability.name,
    })),
    height: data.height,
    weight: data.weight,
    image: data.sprites.front_default,
  };
}

const mockPokemonData: IPokemon[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    abilities: [{ name: 'Overgrow' }, { name: 'Chlorophyll' }],
    height: 7,
    weight: 69,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    id: 4,
    name: 'Charmander',
    abilities: [{ name: 'Blaze' }, { name: 'Solar Power' }],
    height: 6,
    weight: 85,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  },
  {
    id: 7,
    name: 'Squirtle',
    abilities: [{ name: 'Torrent' }, { name: 'Rain Dish' }],
    height: 5,
    weight: 90,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  },
  {
    id: 25,
    name: 'Pikachu',
    abilities: [{ name: 'Static' }, { name: 'Lightning Rod' }],
    height: 4,
    weight: 60,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
  {
    id: 151,
    name: 'Mew',
    abilities: [{ name: 'Synchronize' }],
    height: 4,
    weight: 40,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png',
  },
  {
    id: 143,
    name: 'Snorlax',
    abilities: [{ name: 'Immunity' }, { name: 'Thick Fat' }],
    height: 21,
    weight: 4600,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
  },
];

export {
  fetchData,
  fetchEachPokemon,
  fetchSelectedPokemon,
  mockPokemonData,
  URL,
  LIMIT,
};
