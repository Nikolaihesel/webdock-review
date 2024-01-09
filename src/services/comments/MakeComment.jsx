import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostManagement } from '../PostManagement';
import { useAuthContext } from '../../assets/hooks/useAuthContext';
import '../comments/comments.css';

import CommentReply from './CommentReply';
function MakeComment() {
	const { user } = useAuthContext();
	const [comment, setComment] = useState('');
	const [error, setError] = useState(null);
	const { postId } = useParams();

	const sendComment = async (comment) => {
		const response = await fetch(
			`http://localhost:4000/api/posts/${postId}/comments`,
			{
				method: 'POST',
				body: JSON.stringify(comment),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const json = await response.json();
		if (!response.ok) {
			setError(json.error);
		} else {
			setError(null);
			console.log('new comment added');
		}
	};

	let bodyText = comment;

	const handleSubmit = (e) => {
		e.preventDefault();
		const newComment = {
			bodyText,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
			upvotes: 0,
		};
		console.log(newComment);
		sendComment(newComment);
		setComment('');
	};
	return (
		<div className='comment-form-container'>
			<form onSubmit={handleSubmit}>
				<textarea
					type='text'
					name='comment'
					placeholder='Write comment here'
					onChange={(e) => setComment(e.target.value)}
					value={comment}></textarea>
				<button>Comment</button>
			</form>
		</div>
	);
}

export default MakeComment;
