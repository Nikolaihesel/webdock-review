import { useState, useContext } from 'react';
import '../newPost/newPost.css';
//User details
import { TokenContext } from '../../assets/contexts/TokenContext';

function PostForm({ onSubmit }) {
	// States for inputs
	const [title, setTitle] = useState('');
	const [bodyText, setBodyText] = useState('');
	
	const [tag, setTag] = useState('');
	const [image, setImage] = useState(null); //Tilføjet state for billede

	//User Data set
	const { token } = useContext(TokenContext);

	const submitForm = async (e) => {
		e.preventDefault();
	
		if (token && token.id) {
			// Brug token.id sikkert her
			const post = {
				title,
				featureStatus: 'Under Review',
				bodyText,
				user: {
					id: token.id,
					name: token.name,
					email: token.email,
				},
				upvotes: 0,
				tags: ['første', 'anden'],
				image: image,
			};
			onSubmit(post);
			setTitle('');
			setBodyText('');
			setImage(null);
		} 
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		console.log('Valgt fil:', file);

		setImage(file);
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

				<input 
					className="custom-image-button"
					type='file'
					name="image"
					accept='.jpg, .jpeg, .png'
					onChange={handleImageChange}
				/>

				<button>Send Post</button>
			</form>
		</div>
	);
};

export default PostForm;