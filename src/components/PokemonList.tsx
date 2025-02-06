import { Component } from 'react';
import { IPokemon } from '../api/pokemonApi';
import Pokemon from './Pokemon';

export default class PokemonList extends Component<{
  mockPokemonData: IPokemon[];
}> {
  render() {
    const { mockPokemonData } = this.props;
    return (
      <div>
        <div className="pokemon__list">
          {mockPokemonData.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemonData={pokemon} />
          ))}
        </div>
      </div>
    );
  }
}
