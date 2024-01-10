// Importing useState hook from React for managing state
import { useState } from 'react';
// Importing useParams hook from react-router-dom for accessing route parameters
import { useParams } from 'react-router-dom';
// Importing usePostManagement hook for managing post-related data
import { usePostManagement } from '../PostManagement';
// Importing component-specific styles
import '../comments/comments.css';

// MakeComment component definition
function MakeComment() {
	// Destructuring user and postId from the usePostManagement hook
	const { user } = usePostManagement();
	const [comment, setComment] = useState(''); // State for managing comment input
	const [error, setError] = useState(null); // State for managing comment submission errors
	const { postId } = useParams(); // Accessing postId from the route parameters

	// Function to send a new comment to the server
	const sendComment = async (comment) => {
		// Sending a POST request to add a new comment to the specified post
		const response = await fetch(
			`http://45.136.70.229/api/posts/${postId}/comments`,
			{
				method: 'POST',
				body: JSON.stringify(comment),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		// Parsing the response JSON
		const json = await response.json();
		// Handling errors if the response is not OK
		if (!response.ok) {
			setError(json.error);
		} else {
			setError(null);
			console.log('new comment added');
		}
	};

	// Extracting the comment body text from the state
	let bodyText = comment;

	// Function to handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		// Creating a new comment object with user details and comment text
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
		// Calling the sendComment function to submit the new comment
		sendComment(newComment);
		setComment(''); // Clearing the comment input after submission
	};

	// Render the MakeComment component
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

// Exporting the MakeComment component as the default export
export default MakeComment;
