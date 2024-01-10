// Importing React and component-specific styles
import React from 'react';
import './comments.css';

// CommentMarkup component definition
function CommentMarkup({ Name, BodyText }) {
	// Render the CommentMarkup component
	return (
		<div>
			<div className='comment'>
				<p className='name'>{Name}</p>
				<p className='body-text'>{BodyText}</p>
			</div>
		</div>
	);
}

// Exporting the CommentMarkup component as the default export
export default CommentMarkup;
