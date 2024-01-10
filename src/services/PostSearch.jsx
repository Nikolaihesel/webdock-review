// Importing necessary hooks
import { useState, useEffect } from 'react';

// Custom hook for handling post searches
export function usePostSearch() {
	// State variables to manage search input, fetched search results, and the input to send for searching
	const [searchInput, setSearchInput] = useState('');
	const [fetchSearch, setFetchSearch] = useState([]);
	const [inputToSend, setInputToSend] = useState('');

	// Function to fetch search results based on a search term
	const searchPosts = async (searchTerm) => {
		// Making a fetch request to the server's search endpoint
		try {
			const response = await fetch(
				`http://localhost:4000/api/posts/search/?q=${searchTerm}`
			);
			// Parsing the response as JSON
			const data = await response.json();
			 // Converting the data to an array or using an empty array if it's not an array
			const searchData = Array.isArray(data) ? data : [];
			// Setting the fetched search results state
			setFetchSearch(searchData);
		} catch (error) {
			// Handling errors during the fetch process
			console.error('Error fetching search results:', error);
		}
	};

	// Function to handle the search operation
	const handleSearch = () => {
		// Setting the input to send for searching based on the current search input
		setInputToSend(searchInput);
	};

	// Effect to perform the search when the input to send changes
	useEffect(() => {
		// Checking if there is an input to send
		if (inputToSend !== '') {
			// Calling the function to fetch search results
			searchPosts(inputToSend);
		}
	}, [inputToSend]);

	// Returning the state variables and functions as an object
	return {
		searchInput,
		setSearchInput,
		fetchSearch,
		handleSearch,
	};
}
