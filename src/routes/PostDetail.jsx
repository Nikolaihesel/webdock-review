import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePostManagement } from '../services/PostManagement';
import MakeComment from '../services/comments/MakeComment';
import './postDetail.css';
import CommentMarkup from '../services/comments/CommentMarkup';

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

	const handleAdminUpdateStatus = async (newStatus) => {
		try {
		  // Send a PATCH request to the admin endpoint
		  await axios.patch(`/api/posts/admin/update-status/${fetchedPosts._id}`, {
			status: newStatus,
		  });
	
		  // Refresh the post details after updating status
		  fetchPostsById(postId);
		} catch (error) {
		  console.error('Error updating post status by admin:', error);
		}
	  };

	return (
		<>
			{' '}
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
			<div
				className='post-full-view'
				key={fetchedPosts?._id}>
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
					{admin && (
						<div>
						<button
							onClick={() => handleAdminUpdateStatus('Planned')}
							className='admin-update-status-button'
						>
							Update Status to Planned
						</button>
						{/* Add more buttons for other status options */}
						</div>
					)}
					<div className='post-meta'>
						<p className='post-comments'>
							{' '}
							{fetchedPosts.comments ? fetchedPosts.comments.length : ''}{' '}
							Comments
						</p>
						<p className='post-tag'>{fetchedPosts?.tag}</p>
					</div>
				</div>
				{/* Comment Section */}
				<div className='comments-section'>
					<MakeComment />

					<br />

					{fetchedPosts?.comments && fetchedPosts.comments.length > 0 ? (
						<h2>Comments</h2>
					) : (
						<h2>No one has commented yet</h2>
					)}

					{fetchedPosts?.comments &&
						fetchedPosts.comments.map((comment) => (
							<CommentMarkup
								key={comment._id}
								Name={comment.user.name}
								BodyText={comment.bodyText}
							/>
						))}
				</div>
			</div>
		</>
	);
};

export default PostDetail;
