import { useState, useEffect } from 'react';

import './testdata.css';

//components
import PostMarkup from '../assets/components/PostMarkup';
import PostForm from '../assets/components/postform/PostForm';
import SendPosts from '../services/SendPosts';

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

	const handleDelete = async (postId) => {
		try {
			const response = await fetch(
				`http://localhost:4000/api/posts/${postId}`,
				{
					method: 'DELETE',
				}
			);

			if (response.ok) {
				const updatedPosts = fetchedPosts.filter((post) => post._id !== postId);
				setFetchedPosts(updatedPosts);
				console.log('Post deleted successfully');
			} else {
				console.log('Failed to delete post');
			}
		} catch (error) {
			console.error('Error deleting post:', error);
		}
	};

	return (
		<div className='test-data'>
			<SendPosts />
			<div>
				<div className='data-wrapper'>
					{fetchedPosts &&
						fetchedPosts.map((post) => (
							<PostMarkup
								key={post._id}
								title={post.title}
								description={post.bodyText}
								status={post.featureStatus}
								upvotes={post.upvotes}
								DeletePost={() => handleDelete(post._id)}
							/>
						))}
				</div>
			</div>
		</div>
	);
}

export default TestBackend;
