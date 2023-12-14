import { useState, useContext } from 'react';
import '../newPost/newPost.css';
//User details
import { TokenContext } from '../../assets/contexts/TokenContext';

function PostForm({ onSubmit }) {
	// States for inputs
	const [title, setTitle] = useState('');
	const [bodyText, setBodyText] = useState('');

	const [tag, setTag] = useState('');

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

export default PostForm;
