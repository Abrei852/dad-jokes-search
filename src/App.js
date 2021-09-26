import React from "react";
import "./style/App.css";
import SearchForm from "./components/SearchForm";
import SearchResultList from "./components/SearchResultList";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			searchTerm: "",
			jokes: [],
			isFetchingJokes: false,
		};
		this.onSearchChange = this.onSearchChange.bind(this);
		this.searchJokes = this.searchJokes.bind(this);
	}

	searchJokes(limit = 20) {
		this.setState({ isFetchingJokes: true });
		fetch(
			`https://icanhazdadjoke.com/search?term=${this.state.searchTerm}&limit=${limit}`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((json) => {
				const jokes = json.results;
				this.setState({ jokes, isFetchingJokes: false });
			});
	}

	onSearchChange(value) {
		this.setState({
			searchTerm: value,
		});
	}

	render() {
		return (
			<div>
				<SearchForm
					onFormSubmit={this.searchJokes}
					onSearchValueChange={this.onSearchChange}
					isSearching={this.state.isFetchingJokes}
					onSingleSearchClick={() => this.searchJokes(1)}
				/>
				<SearchResultList
					jokes={this.state.jokes}
					isFetchingJoke={this.state.isFetchingJokes}
				/>
			</div>
		);
	}
}

export default App;
