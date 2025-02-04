import { Component } from 'react';

import PokemonList from './PokemonList';
import PokemonSearch from './PokemonSearch';

import { IPokemon } from '../api/pokemonApi';

import { fetchData, fetchEachPokemon, URL, LIMIT } from '../api/pokemonApi';

interface MainState {
  pokemonData: IPokemon[];
  searchText: string;
}

export default class Main extends Component<object, MainState> {
  constructor(props: object) {
    super(props)
    this.state = {
      pokemonData: [],
      searchText: ''
    }
  }


  setPokemonData = async () => {
    const pokemonsURL = await fetchData({url: URL, limit: LIMIT});
    const pokemons = await fetchEachPokemon(pokemonsURL)
    this.setState({
      pokemonData: pokemons
    })
  }

  setSearchText = (name: string) => {
    this.setState(prevState => {
      const updatedPokemonData = prevState.pokemonData.filter(pokemon =>
        pokemon.name.toLowerCase() === name.toLowerCase()
      );
      return {
        searchText: name, 
        pokemonData: updatedPokemonData
      };
    }, () => {
      console.log("Updated state:", this.state.pokemonData, this.state.searchText); 
    });
  };

  searchPokemon = (name: string) => { 
    this.setSearchText(name)  
  };

  componentDidMount(): void {
    this.setPokemonData();
  }


  render() {
    return (
      <div>
        <PokemonSearch searchPokemon={this.searchPokemon}/>
        <PokemonList mockPokemonData={this.state.pokemonData} />
      </div>
    );
  }
}
