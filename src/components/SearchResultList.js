import React from "react";

const SearchResultList = (props) => {
	return (
		<ul className="jokes-list">
			{props.isFetchingJoke
				? "fetching joke"
				: props.jokes.map((item) => <li key={item.id}>{item.joke}</li>)}
		</ul>
	);
};

export default SearchResultList;
