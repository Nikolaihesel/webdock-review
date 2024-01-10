// Importing necessary hooks and contexts
import { useState, useEffect, useContext, useCallback } from 'react';
import { TokenContext } from '../assets/contexts/TokenContext';

// Custom hook for managing post-related data and actions
export function usePostManagement(featureStatus) {
	// State variables to store fetched posts and user information
	const [fetchedPosts, setFetchedPosts] = useState([]);
	const [user, setUser] = useState({});

	// Destructuring token from TokenContext
	const { token } = useContext(TokenContext);

	// Effect to update user information when the token changes
	useEffect(() => {
		if (token) {
			setUser({
				id: token.id,
				name: token.name,
				email: token.email,
			});
		}
	}, [token]);

	// Function to fetch all posts
	const fetchPosts = async () => {
		try {
			const response = await fetch(`http://localhost:4000/api/posts/`);
			if (response.ok) {
				const json = await response.json();
				setFetchedPosts(json);
			} else {
				console.log('Failed to fetch posts');
			}
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	};

	// Function to fetch a specific post by ID
	const fetchPostsById = async (postId) => {
		try {
			const response = await fetch(`http://localhost:4000/api/posts/${postId}`);
			if (response.ok) {
				const json = await response.json();
				setFetchedPosts(json);
			} else {
				console.log('Failed to fetch posts');
			}
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	};

	// Function to fetch posts created by a specific user
	const fetchPostByUserId = async (userId) => {
		try {
			const response = await fetch(
				`http://localhost:4000/api/posts/user/${userId}`
			);
			if (response.ok) {
				const json = await response.json();
				setFetchedPosts(json);
			} else {
				console.log('Failed to fetch posts');
			}
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	};

	// Function to fetch posts based on their feature status
	const fetchPostsWithStatus = async (featureStatus) => {
		try {
			const response = await fetch(
				`http://localhost:4000/api/posts/status?status=${featureStatus}`
			);
			if (response.ok) {
				const json = await response.json();
				setFetchedPosts(json);
			} else {
				console.log('Failed to fetch posts');
			}
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	};

	// Function to search for posts based on a search term
	const searchPosts = async (searchTerm) => {
		try {
			const response = await fetch(
				`http://localhost:4000/api/posts/search/?q=${searchTerm}`
			);
			const data = await response.json();

			const searchData = Array.isArray(data) ? data : [];
			setFetchedPosts(searchData);
		} catch (error) {
			console.error('Error fetching search results:', error);
		}
	};

	// Function to handle post likes
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
				const updatedPosts = fetchedPosts.map((post) =>
					post._id === postId ? { ...post, upvotes: post.likes + 1 } : post
				);
				setFetchedPosts(updatedPosts);
				console.log('Post liked successfully');
			} else if (response.status === 404) {
				console.log('Post not found');
			} else if (response.status === 400) {
				console.log('User already liked the post');
			} else {
				console.log('Failed to like post');
			}
		} catch (error) {
			console.error('Error liking post:', error);
		}
	};

	// Function to handle post deletion
	const handleDelete = async (postId) => {
		try {
			const response = await fetch(`http://localhost:4000/api/posts/${postId}`, {
				method: 'DELETE',
			});

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

	// Returning the functions and data as an object
	return {
		fetchedPosts,
		fetchPosts,
		user,
		handleLike,
		handleDelete,
		fetchPostsById,
		fetchPostByUserId,
		fetchPostsWithStatus,
		searchPosts,
	};
}
