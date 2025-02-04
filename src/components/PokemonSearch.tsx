import React, { Component } from 'react'

interface searchProps {
    searchPokemon: (name: string) => void
}

interface searchState {
    searchText: string
}
export default class PokemonSearch extends Component<searchProps, searchState> {
    constructor(props: searchProps) {
        super(props)
        this.state = {
            searchText: ""
        }
    }
    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchText: event.target.value });
    };

    handleSearchClick = () => {
        const { searchPokemon } = this.props;
        const { searchText } = this.state;
        searchPokemon(searchText); 
    };

    render() {
        const { searchText } = this.state;
        return (
            <div>
                <input
                    type="text"
                    placeholder="Enter Pokemon name"
                    value={searchText}
                    onChange={this.handleInputChange} 
                />
                <button onClick={this.handleSearchClick}>Search</button>
            </div>
        );
    }
  }

