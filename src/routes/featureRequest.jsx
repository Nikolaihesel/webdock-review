import { useState, useEffect } from 'react';
import DropdownMenu from '../assets/components/dropDown/Dropdown';
import PostMarkup from '../assets/components/PostMarkup';

//css
import '../index.css';
import '../assets/stylesheet/featureRequest.css';

function FeatureRequest() {
	const [searchInput, setSearchInput] = useState('');
	const [fetchSearch, setFetchSearch] = useState([]);
	const [inputToSend, setInputToSend] = useState('');

	const handleClick = () => {
		setInputToSend(searchInput);
	};

	useEffect(() => {
		const searchPosts = async (searchTerm) => {
			try {
				const response = await fetch(
					`http://localhost:4000/api/posts/search/?q=${searchTerm}`
				);
				const data = await response.json();
				const searchData = Array.isArray(data) ? data : [];
				setFetchSearch(searchData);
			} catch (error) {
				console.error('Error fetching search results:', error);
			}
		};
		if (inputToSend !== '') {
			searchPosts(inputToSend);
		}
	}, [inputToSend]);

	return (
		<div className='fr-req-container'>
			<div className='filter-nav'>
				<div className='filter'>
					<div className=''>
						<p className=''>Sort By</p>
						<DropdownMenu
							option1='Progress'
							option2='Planned'
							option3='Complete'
						/>
					</div>
					<div className=''>
						<p className=''>posts with</p>
						<DropdownMenu
							option1='DNS'
							option2='VPN'
							option3='Server'
						/>
					</div>
				</div>
				<div className='searchContainer'>
					<input
						type='search'
						className=''
						placeholder='Search'
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
					/>

					<button onClick={() => handleClick()}>Search</button>
				</div>
			</div>
			<div className='card-post'>
				{Array.isArray(fetchSearch) && fetchSearch.length === 0 ? (
					<p>No results found</p>
				) : (
					fetchSearch.map((post) => (
						<PostMarkup
							key={post._id}
							title={post.title}
							// Add other props you need for the PostMarkup component
						/>
					))
				)}

				{/* {fetchedFromSearch &&
					fetchedFromSearch.map((post) => (
						<PostMarkup
							key={post._id}
							title={post.title}
							description={post.bodyText}
							status={post.featureStatus}
							upvotes={post.upvotes}
							DeletePost={() => handleDelete(post._id)}
							BtnFunction={() => handleLike(post._id)}
						/>
					))} */}
			</div>
		</div>
	);
}

export default FeatureRequest;
