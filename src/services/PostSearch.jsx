import { useState, useEffect } from 'react';

export function usePostSearch() {
	const [searchInput, setSearchInput] = useState('');
	const [fetchSearch, setFetchSearch] = useState([]);
	const [inputToSend, setInputToSend] = useState('');

	const searchPosts = async (searchTerm) => {
		try {
			const response = await fetch(
				`/api/posts/search/?q=${searchTerm}`
			);
			const data = await response.json();
			const searchData = Array.isArray(data) ? data : [];
			setFetchSearch(searchData);
		} catch (error) {
			console.error('Error fetching search results:', error);
		}
	};

	const handleSearch = () => {
		setInputToSend(searchInput);
	};

	useEffect(() => {
		if (inputToSend !== '') {
			searchPosts(inputToSend);
		}
	}, [inputToSend]);

	return {
		searchInput,
		setSearchInput,
		fetchSearch,
		handleSearch,
	};
}
