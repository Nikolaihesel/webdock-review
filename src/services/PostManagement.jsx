import { useState, useEffect, useContext } from 'react';
import { TokenContext } from '../assets/contexts/TokenContext';
export function usePostManagement() {
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

	const fetchPostsById = async () => {
		try {
			const response = await fetch(
				`http://localhost:4000/api/posts/user/22786`
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

	// const fetchPostsUnderReview = async () => {
	// 	try {
	// 		const response = await fetch(
	// 			`http://localhost:4000/api/posts/featureStatus?featureStatus=Under%20Review`
	// 		);
	// 		if (response.ok) {
	// 			const json = await response.json();
	// 			setFetchedPosts(json);
	// 		} else {
	// 			console.log('Failed to fetch posts');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error fetching posts:', error);
	// 	}
	// };

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

	return {
		fetchedPosts,
		fetchPosts,
		user,
		handleLike,
		handleDelete,
		fetchPostsById,
	};
}
