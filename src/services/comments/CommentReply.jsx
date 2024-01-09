import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../assets/hooks/useAuthContext';

function CommentReply({ commentId }) {
	const { user } = useAuthContext();
	const [reply, setReply] = useState(true);
	const [replyText, setReplyText] = useState('');
	const [error, setError] = useState(null);
	const { postId } = useParams();

	const handleReplyState = (e) => {
		e.preventDefault();
		setReply(!reply);
		console.log(commentId);
		console.log(postId);
	};

	const submitReply = async (reply) => {
		try {
			const response = await fetch(
				`/api/posts/${postId}/comments/replies`,
				{
					method: 'POST',
					body: JSON.stringify(reply),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				// If response is not ok, parse the error message and set it
				const errorResponse = await response.json();
			} else {
				// If response is ok, handle the success case
				setError(null);
				console.log('new reply added');
			}
		} catch (error) {
			// Catch any network-related errors
			setError('Network error');
			console.log('Network error', error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newReply = {
			postId,
			commentId,
			reply: {
				bodyText: replyText,
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
				},
			},
		};
		console.log(newReply);
		submitReply(newReply);
		setReplyText('');
		setReply(!reply);
	};

	return (
		<div>
			{reply ? (
				<button onClick={handleReplyState}>Reply</button>
			) : (
				<div>
					<form onSubmit={handleSubmit}>
						<textarea
							type='text'
							name='comment'
							placeholder='Write comment here'
							onChange={(e) => setReplyText(e.target.value)}
							value={replyText}></textarea>
						<button>Comment</button>
					</form>
				</div>
			)}
		</div>
	);
}

export default CommentReply;
