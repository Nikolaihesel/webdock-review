import { useState, useEffect } from 'react';

//Components
import PostForm from '../routes/newPost/PostForm';

function SendPosts() {
	const [error, setError] = useState(null);

	// create post, send database
	const submitForm = async (post) => {
		const response = await fetch(`http://45.136.70.229/api/posts`, {
			method: 'POST',
			body: JSON.stringify(post),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
		}
		if (response.ok) {
			setError(null);
			console.log('new post added');
		}
	};

	return (
		<div>
			<PostForm onSubmit={submitForm} />
		</div>
	);
}

export default SendPosts;
