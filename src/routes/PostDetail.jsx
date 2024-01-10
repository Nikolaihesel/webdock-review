// Importing necessary React hooks, components, and styles
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePostManagement } from '../services/PostManagement';
import MakeComment from '../services/comments/MakeComment';
import './postDetail.css';
import CommentMarkup from '../services/comments/CommentMarkup';
import axios from 'axios';

// PostDetail component definition
const PostDetail = () => {
	// State to track admin status
	const [admin, setAdmin] = useState(false);

	// Extracting postId from the route parameters
	const { postId } = useParams();

	// Navigate hook for programmatic navigation
	const navigate = useNavigate();

	// Destructuring values from the usePostManagement hook
	const { fetchPostsById, fetchedPosts, user, handleDelete, handleLike } =
		usePostManagement();

	// useEffect hook to fetch post details when the component mounts or postId changes	
	useEffect(() => {
		fetchPostsById(postId);
	}, [postId]);

	// Toggle admin status
	const handleToggle = () => {
		setAdmin(!admin);
	};

	// Function to handle status change
	const handleStatusChange = async (newStatus) => {
		try {
		  // Send a PATCH request to update the post status
		  await axios.patch(`http://localhost:4000/api/posts/${fetchedPosts._id}/status`, {
			newStatus,
		  });
	
		  // Refresh the post details after updating status
		  fetchPostsById(postId);
		} catch (error) {
		  console.error('Error updating post status:', error);
		}

		// Show a popup message indicating the status update
		showPopup(`Status updated to: ${newStatus}`);
	};

// Function to show a popup message
const showPopup = (message) => {
	const popup = document.createElement('div');
	popup.className = 'popup';
	popup.textContent = message;
  
	// Append popup to the body
	document.body.appendChild(popup);
  
	// Remove popup after a while
	setTimeout(() => {
	  document.body.removeChild(popup);
	}, 1000); // 1000 ms = 1 second
  };	

  // Render the PostDetail component
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
						<p>Update Status to:</p>
						<button
							onClick={() => handleStatusChange('Under Review')}
							className='admin-update-status-button'
						>
							Under Review
						</button>
						<button
							onClick={() => handleStatusChange('In Progress')}
							className='admin-update-status-button'
						>
							In Progress
						</button>
						<button
							onClick={() => handleStatusChange('Implemented')}
							className='admin-update-status-button'
						>
							Implemented
						</button>
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

// Exporting the PostDetail component as the default export
export default PostDetail;
