import { useState, useEffect } from 'react';
import { useAuthContext } from '../assets/hooks/useAuthContext';

export function usePostManagement() {
	const [fetchedPosts, setFetchedPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [postsPerPage] = useState(3);

	const { user } = useAuthContext();

	const fetchPosts = async (page, limit) => {
		try {
			const response = await fetch(
				`http://localhost:4000/api/posts/?page=${page}&limit=${limit}`
			);
			console.log('Response:', response); // Check the raw response

			if (response.ok) {
				const json = await response.json();
				console.log('Fetched data:', json); // Check the JSON data

				setFetchedPosts(json.posts || []);
				setTotalPages(json.totalPages);
			} else {
				console.log('Failed to fetch posts');
			}
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	};
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

	const fetchPostsWithStatus = async (status) => {
		try {
			const response = await fetch(
				`http://localhost:4000/api/posts/status?status=${status}`
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
				`http://localhost:4000/api/posts/search/?q=${searchTerm}`
			);
			if (response.ok) {
				const json = await response.json();
				setFetchedPosts(json);
			} else {
				console.log('Failed to fetch posts');
			}
		} catch (error) {
			console.error('Error fetching search results:', error);
		}
	};

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

	const changePage = (newPage) => {
		setCurrentPage(newPage);
		fetchPosts(newPage);
	};

	return {
		fetchedPosts,
		fetchPosts,
		handleLike,
		handleDelete,
		fetchPostsById,
		fetchPostByUserId,
		fetchPostsWithStatus,
		searchPosts,
		totalPages,
	};
}
