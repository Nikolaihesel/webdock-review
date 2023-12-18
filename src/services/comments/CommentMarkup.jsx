import React from 'react';
import './comments.css';

function CommentMarkup({ Name, BodyText }) {
	return (
		<div>
			<div className='comment'>
				<p className='name'>{Name}</p>
				<p className='body-text'>{BodyText}</p>
			</div>
		</div>
	);
}

export default CommentMarkup;
