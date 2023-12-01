import { useState, useEffect } from 'react';

import './testdata.css';

//components
import PostMarkup from '../assets/components/PostMarkup';
import PostForm from '../services/PostForm';

function TestBackend() {
	// get posts
	const [fetchedPosts, setFetchedPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('http://localhost:4000/api/posts');
			const json = await response.json();

			if (response.ok) {
				setFetchedPosts(json);
				console.log(fetchedPosts);
			}
		};

		fetchPosts();
	}, []);

	return (
		<div className='test-data'>
			<div>
				<div className='data-wrapper'>
					{fetchedPosts &&
						fetchedPosts.map((post) => (
							<PostMarkup
								key={post.id}
								title={post.title}
								description={post.bodyText}
								status={post.featureStatus}
								upvotes={post.upvotes}
							/>
						))}
				</div>
			</div>
		</div>
	);
}

export default TestBackend;
