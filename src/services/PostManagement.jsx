import { useState, useEffect, useContext, useCallback } from 'react';
import { TokenContext } from '../assets/contexts/TokenContext';
export function usePostManagement(featureStatus) {
	const [fetchedPosts, setFetchedPosts] = useState([]);
	const [user, setUser] = useState({});
	const { token } = useContext(TokenContext);

	useEffect(() => {
		if (token) {
			setUser({
				id: token.id,
				name: token.name,
				email: token.email,
			});
		}
	}, [token]);

	const fetchPosts = async () => {
		try {
			const response = await fetch(`http://45.136.70.229/api/posts/`);
			if (response.ok) {
				const json = await response.json();
				setFetchedPosts(json);
				console.log(fetchedPosts);
			} else {
				console.log('Failed to fetch posts');
			}
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	};

	const fetchPostsById = async (postId) => {
		try {
			const response = await fetch(`http://45.136.70.229/api/posts/${postId}`);
			if (response.ok) {
				const json = await response.json();
				setFetchedPosts(json);
				console.log(fetchedPosts);
			} else {
				console.log('Failed to fetch posts');
			}
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	};

	const fetchPostByUserId = async (userId) => {
		try {
			const response = await fetch(
				`http://45.136.70.229/api/posts/user/${userId}`
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

	const fetchPostsWithStatus = async (featureStatus) => {
		try {
			console.log(`http://45.136.70.229/api/posts/?status=${featureStatus}`);
			const response = await fetch(
				`http://45.136.70.229/api/posts/status?status=${featureStatus}`
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

	const searchPosts = async (searchTerm) => {
		try {
			const response = await fetch(
				`http://45.136.70.229/api/posts/search/?q=${searchTerm}`
			);
			const data = await response.json();
			console.log(`http://localhost:4000/api/posts/search/?q=${searchTerm}`);
			const searchData = Array.isArray(data) ? data : [];
			setFetchedPosts(searchData);
		} catch (error) {
			console.error('Error fetching search results:', error);
		}
	};

	const handleLike = async (postId) => {
		try {
			const response = await fetch(
				`http://45.136.70.229/api/posts/${postId}/likes`,
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

	const handleDelete = async (postId) => {
		try {
			const response = await fetch(`http://45.136.70.229/api/posts/${postId}`, {
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
