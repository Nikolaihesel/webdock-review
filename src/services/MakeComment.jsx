import { useState } from 'react';
import { usePostManagement } from '../services/PostManagement';
import SendPosts from './SendPosts';
function MakeComment() {
	const { user } = usePostManagement();
	const [comment, setComment] = useState('');
	const [error, setError] = useState(null);

	const sendComment = async (comment) => {
		const response = await fetch(`http://ttp://45.136.70.229/api/posts`, {
			method: 'POST',
			body: JSON.stringify(comment),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		if (!response.ok) {
			setError(json.error);
		} else {
			setError(null);
			console.log('new comment added');
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newComment = {
			comment,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
			upvotes: 0,
		};
		console.log(newComment);
		onSubmit(sendComment);
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
