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

    handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') { 
            this.handleSearchClick(); 
        }
    };

    render() {
        const { searchText } = this.state;
        return (
            <div className='pokemon__search'>
                <input
                    type="text"
                    placeholder="Enter Pokemon name or number"
                    value={searchText}
                    onChange={this.handleInputChange} 
                    onKeyDown={this.handleKeyDown}
                />
                <button onClick={this.handleSearchClick}>Search</button>
            </div>
        );
    }
  }

