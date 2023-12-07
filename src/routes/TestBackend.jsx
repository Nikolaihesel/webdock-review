import React, { useState, useEffect, useContext } from 'react';
import './testdata.css';
import PostMarkup from '../assets/components/PostMarkup';
import SendPosts from '../services/SendPosts';
import { TokenContext } from '../assets/contexts/TokenContext';
import { sendEmail, fetchPostsFromClient } from '../../backend/postmarkService'; 

const TestBackend = () => {
	const [upvotes, setUpvotes] = useState(0);
	const [isAdmin, setIsAdmin] = useState(false);
	const [fetchedPosts, setFetchedPosts] = useState([]);
	const { token } = useContext(TokenContext);
	
	let user = {};
	if (token) {
		user = {
			id: token.id,
			name: token.name,
			email: token.email,
		};
	}

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch(`http://localhost:4000/api/posts/user/${user.id}`);
				const json = await response.json();

				if (response.ok) {
					setFetchedPosts(json);
					console.log(json); // Logging fetched posts
				}
			} catch (error) {
				console.error('Error fetching posts:', error);
			}
		};

		fetchPosts();
	}, [user.id]); // Include user.id as a dependency

	console.log(user.id);

	const handleLike = async (postId) => {
		try {
			const response = await fetch(
				`http://localhost:4000/api/posts/${postId}/likes`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ userId: user.id }),
				}
			);

			if (response.ok) {
				const updatedPosts = fetchedPosts.map((post) => {
					if (post._id === postId) {
						return { ...post, upvotes: post.likes + 1 };
					}
					return post;
				});
				setFetchedPosts(updatedPosts);
				console.log('Post liked successfully');
			} else if (response.status === 404) {
				console.log('Post not found');
			} else if (response.status === 400) {
				console.log('User already liked the post');
			} else {
				console.log('Failed to like post');
				console.log(response);
			}
		} catch (error) {
			console.error('Error liking post:', error);
		}
	};

	console.log(user);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(
				`http://localhost:4000/api/posts/user/${user.id}`
			);
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

	const handleStatusChange = (newStatus) => {
		if (isAdmin) {
			console.log('Changing status to:', newStatus);
		} else {
			alert('You do not have permission to change the status');
		}
	};

	return (
		<div className='wrapper'>
			<SendPosts />
			<div>
				<div className='test-data'>
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
									BtnFunction={() => handleLike(post._id)}
								/>
							))}
					</div>
				</div>

				{isAdmin && (
					<div>
						<button onClick={() => handleStatusChange('Under review')}>
							Under review
						</button>
						<button onClick={() => handleStatusChange('Planned')}>
							Planned
						</button>
						<button onClick={() => handleStatusChange('In progress')}>
							In progress
						</button>
						<button onClick={() => handleStatusChange('Completed')}>
							Completed
						</button>
						<button onClick={() => handleStatusChange('Closed')}>Closed</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default TestBackend;
