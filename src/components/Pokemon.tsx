import { Component } from 'react';
import { IPokemon } from '../api/pokemonApi';
export default class Pokemon extends Component<{ pokemonData: IPokemon }> {
  render() {
    const { pokemonData } = this.props;
    return (
      <div>
        <img src={pokemonData.image} alt={pokemonData.name} />
        <p>{pokemonData.name}</p>
      </div>
    );
  }
}
