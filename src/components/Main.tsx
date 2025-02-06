import { Component } from 'react';

import PokemonList from './PokemonList';
import PokemonSearch from './PokemonSearch';
import { IPokemon } from '../api/pokemonApi';

import { fetchData, fetchEachPokemon, fetchSelectedPokemon, URL, LIMIT } from '../api/pokemonApi';
import ErrorButton from './ErrorButton';

interface MainState {
  pokemonData: IPokemon[];
  originalPokemonData: IPokemon[];
  searchText: string;
}

export default class Main extends Component<object, MainState> {
  constructor(props: object) {
    super(props)
    this.state = {
      pokemonData: [],
      originalPokemonData: [],
      searchText: ''
    }
  }

  setPokemonData = async () => {
    const pokemonsURL = await fetchData({url: URL, limit: LIMIT});
    const pokemons = await fetchEachPokemon(pokemonsURL)
    this.setState({
      pokemonData: pokemons,
      originalPokemonData: pokemons
    })
  }

  setSearchText = async (name: string) => {
    if (!name) {
      this.setState(prevState => ({
        searchText: "",
        pokemonData: prevState.originalPokemonData
      }));
      return;
    }
  
    const updatedPokemonData = await fetchSelectedPokemon(name.toLowerCase());
    this.setState({
      searchText: name,
      pokemonData: [updatedPokemonData]
    }, () => {
      console.log("Updated state:", this.state.pokemonData, this.state.searchText); 
    });
  };

  searchPokemon = (name: string) => { 
    this.setSearchText(name)  
  };

  componentDidMount() {
    this.setPokemonData();
  }

  render() {
    return (
      <div>
        <PokemonSearch searchPokemon={this.searchPokemon}/>
        <PokemonList mockPokemonData={this.state.pokemonData} />
        <ErrorButton />
      </div>
    );
  }
}
