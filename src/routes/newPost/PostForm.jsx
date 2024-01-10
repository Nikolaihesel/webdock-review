// Importing necessary React hooks and styles
import { useState, useContext } from 'react';
import '../newPost/newPost.css';

// Importing the TokenContext for user details
import { TokenContext } from '../../assets/contexts/TokenContext';

// PostForm component definition
function PostForm({ onSubmit }) {
	// States for managing input values
	const [title, setTitle] = useState('');
	const [bodyText, setBodyText] = useState('');
	const [tag, setTag] = useState('');

	// Accessing user data from the TokenContext
	const { token } = useContext(TokenContext);

	// Function to handle form submission
	const submitForm = async (e) => {
		e.preventDefault();

		// Creating a post object with form data and user details
		const post = {
			title,
			featureStatus: 'Under Review', // Setting a default feature status
			bodyText,

			user: {
				id: token.id,
				name: token.name,
				email: token.email,
			},
			upvotes: 0, // Setting an initial upvote count
			tags: ['første', 'anden'], // Default tags (can be updated based on user input)
		};

		// Calling the onSubmit function passed as a prop with the post data
		onSubmit(post);
		setTitle('');
		setBodyText('');
	};

	// Render the PostForm component
	return (
		<div className='form-wrap'>
			<form
				onSubmit={submitForm}
				className='post-form'>
				<input
					className='test-input '
					type='text'
					name='title'
					placeholder='Title'
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>

				<textarea
					className='test-input '
					type='text'
					name='bodyText'
					placeholder='Text'
					onChange={(e) => setBodyText(e.target.value)}
					value={bodyText}
				/>
				<input
					className='test-input '
					type='text'
					name='tags'
					placeholder='tags'
					onChange={(e) => setTag(e.target.value)}
					value={tag}
				/>
				<button>Send Post</button>
			</form>
		</div>
	);
}

// Exporting the PostForm component as the default export
export default PostForm;
