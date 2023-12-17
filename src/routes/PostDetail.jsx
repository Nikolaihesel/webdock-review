import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePostManagement } from '../services/PostManagement';

import './postDetail.css';

const PostDetail = () => {
	const [admin, setAdmin] = useState(false);
	const { postId } = useParams();
	const navigate = useNavigate();
	const { fetchPostsById, fetchedPosts, user, handleDelete, handleLike } =
		usePostManagement();

	useEffect(() => {
		fetchPostsById(postId);
	}, [postId]);

	const handleToggle = () => {
		setAdmin(!admin);
	};
	return (
		<div
			className='post-full-view'
			key={fetchedPosts?._id}>
			<div className='toggle-box'>
				<input
					id='admin-toggle'
					type='checkbox'
					checked={admin}
					onChange={handleToggle}
				/>
				<label
					htmlFor='admin-toggle'
					className='toggle-label'></label>
			</div>

			<label>{admin ? 'admin' : 'Not admin'}</label>
			<h1 className='post-title'>{fetchedPosts?.title}</h1>
			<p className='post-author'>
				{' '}
				By <i>{fetchedPosts.user ? fetchedPosts.user.name : 'user'}</i>
			</p>
			<p className='post-body'>{fetchedPosts?.bodyText}</p>
			<div className='post-details'>
				<button
					onClick={() => handleLike(fetchedPosts?._id)}
					className='upvote-button'>
					Upvote ({fetchedPosts?.upvotes})
				</button>
				{admin && (
					<button
						onClick={() => {
							handleDelete(fetchedPosts?._id);
							navigate('/');
						}}
						className='delete-button'>
						Delete Post
					</button>
				)}
				<div className='post-meta'>
					<p className='post-comments'>
						{' '}
						{fetchedPosts.comments ? fetchedPosts.comments.length : ''} Comments
					</p>
					<p className='post-tag'>{fetchedPosts?.tag}</p>
				</div>
			</div>
			{/* Comment Section */}
			<div className='comments-section'>
				{fetchedPosts?.comments && fetchedPosts.comments.length > 0 ? (
					<h2>Comments</h2>
				) : (
					<h2>No one has commented yet</h2>
				)}
			</div>
		</div>
	);
};

export default PostDetail;
