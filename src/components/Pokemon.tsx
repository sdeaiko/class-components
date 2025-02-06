import { Component } from 'react';
import '../index.scss'
import { IPokemon } from '../api/pokemonApi';
export default class Pokemon extends Component<{ pokemonData: IPokemon }> {
  render() {
    const { pokemonData } = this.props;
    return (
      <div className='pokemon__card'>
        <div className="image__wrapper">
          <img src={pokemonData.image} alt={pokemonData.name} />
        </div>
        <p className='pokemon__name'>{pokemonData.name}</p>
        <p className='pokemon__id'>{pokemonData.id}</p>
      </div>
    );
  }
}
