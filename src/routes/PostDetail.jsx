import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { usePostManagement } from '../services/PostManagement';

import './postDetail.css';

const PostDetail = () => {
	const isAdmin = true;
	const { postId } = useParams();
	const { fetchPostById, fetchedPost, user } = usePostManagement();

	useEffect(() => {
		if (postId) {
			fetchPostById(postId);
		}
		console.log(1);
	}, [postId, fetchPostById]);

	return (
		<div
			className='post-full-view'
			key={fetchedPost?._id}>
			<h1 className='post-title'>{fetchedPost.title}</h1>
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
