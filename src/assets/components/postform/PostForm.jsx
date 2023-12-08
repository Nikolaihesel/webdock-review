import { useState, useContext } from 'react';

//User details
import { TokenContext } from '../../contexts/TokenContext';

function PostForm({ onSubmit }) {
	// States for inputs
	const [title, setTitle] = useState('');
	const [bodyText, setBodyText] = useState('');

	//User Data set
	const { token } = useContext(TokenContext);

	const submitForm = async (e) => {
		e.preventDefault();

		const post = {
			title,
			featureStatus: 'Under Review',
			// status: 'Under Review',
			bodyText,

			user: {
				id: token.id,
				name: token.name,
				email: token.email,
			},
			upvotes: 0,
			tags: ['første', 'anden'],
		};
		onSubmit(post);
		setTitle('');
		setBodyText('');
	};

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
				<button>Send Post</button>
			</form>
		</div>
	);
}

export default PostForm;
