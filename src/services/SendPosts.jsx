// Importing necessary hooks
import { useState, useEffect } from 'react';

// Importing the PostForm component
import PostForm from '../routes/newPost/PostForm';

// Component for sending posts to the server
function SendPosts() {
	// State variable to manage potential errors during post submission
	const [error, setError] = useState(null);

	// Function to submit a new post to the server
	const submitForm = async (post) => {
		// Making a POST request to the server's post creation endpoint
		const response = await fetch(`http://localhost:4000/api/posts`, {
			method: 'POST',
			body: JSON.stringify(post),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// Parsing the response as JSON
		const json = await response.json();

		// Handling errors during the post submission
		if (!response.ok) {
			setError(json.error);
		}

		// Handling successful post submission
		if (response.ok) {
			setError(null);
			console.log('new post added');
		}
	};

	// Rendering the PostForm component and passing the submitForm function as a prop
	return (
		<div>
			<PostForm onSubmit={submitForm} />
		</div>
	);
}

// Exporting the SendPosts component
export default SendPosts;
