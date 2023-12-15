import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePostManagement } from '../services/PostManagement';

import './postDetail.css';

const PostDetail = () => {
	const isAdmin = true;
	const { postId } = useParams();
	const navigate = useNavigate(); // Added for navigation
	const { fetchPostById, fetchedPost, user } = usePostManagement();
	const [post, setPost] = useState(null);

	useEffect(() => {
		fetchPostById(postId);

		setPost(fetchPostById);
	}, [postId, fetchPostById]);

	// Check if data is still loading
	if (!fetchedPost) {
		return <div>Loading...</div>; // Show loading or spinner
	}
	return (
		<div
			className='post-full-view'
			key={fetchedPost?._id}>
			<h1 className='post-title'>{fetchedPost?.title}</h1>
			<p className='post-author'>{user.name}</p>
			<p className='post-body'>{fetchedPost?.bodyText}</p>
			<div className='post-details'>
				<button
					onClick={() => handleLike(fetchedPost?._id)}
					className='upvote-button'>
					Upvote ({fetchedPost?.upvotes})
				</button>
				{isAdmin && (
					<button
						onClick={() => {
							handleDelete(fetchedPost?._id);
							navigate('/');
						}}
						className='delete-button'>
						Delete Post
					</button>
				)}
				<div className='post-meta'>
					<p className='post-comments'>{fetchedPost?.comments} Comments</p>
					<p className='post-tag'>{fetchedPost?.tag}</p>
				</div>
			</div>
			{/* Comment Section */}
			<div className='comments-section'>
				<h2>Comments</h2>
				{/* Implement comment display and functionality here */}
			</div>
		</div>
	);
};

export default PostDetail;
