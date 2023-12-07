import React, { useState, useEffect, useContext } from 'react';
import './testdata.css';
import PostMarkup from '../assets/components/PostMarkup';
import SendPosts from '../services/SendPosts';
import { TokenContext } from '../assets/contexts/TokenContext';

const TestBackend = () => {
	const [upvotes, setUpvotes] = useState(0);
	const [isAdmin, setIsAdmin] = useState(false);
	const [fetchedPosts, setFetchedPosts] = useState([]);
	const { token } = useContext(TokenContext);
	const [newStatus, setNewStatus] = useState('');
	const [newTags, setNewTags] = useState('');


	let user = {};
	if (token) {
		user = {
			id: token.id,
			name: token.name,
			email: token.email,
		};
	}

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
			const response = await fetch(`http://localhost:4000/api/posts/`);
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

	// update tags
	const handleTagsChange = async () => {
		try {
		  const response = await fetch(`http://localhost:4000/api/posts/${postId}/tags`, {
			method: 'PATCH',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({ tags }),
		  });
	
		  if (response.ok) {
			const updatedPosts = fetchedPosts.map((post) => {
			  if (post._id === postId) {
				return { ...post, tags: tags };
			  }
			  return post;
			});
			setFetchedPosts(updatedPosts);
			console.log('Tags updated successfully');
		  } else {
			console.log('Failed to update tags');
		  }
		} catch (error) {
		  console.error('Error updating tags:', error);
		}
	  };

	const handleStatusChange = async () => {
		try {
		  const response = await fetch(`http://localhost:4000/api/posts/${postId}/status`, {
			method: 'PATCH',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({ newStatus }),
		  });
	
		  if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		  }
	
		  const data = await response.json();
		  console.log(data); // Log the response from the server
		} catch (error) {
		  console.error('Error updating post status:', error.message);
		}
	  };

	/*const handleStatusChange = (newStatus) => {
		if (isAdmin) {
			console.log('Changing status to:', newStatus);
		} else {
			alert('You do not have permission to change the status');
		}
	};*/

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
									status={post.status}
									tags={post.tags}
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
