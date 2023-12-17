import React from 'react';
import './comments.css';

function CommentMarkup({ Name, BodyText }) {
	return (
		<div>
			<div className='comment'>
				<p>{Name}</p>
				<p>{BodyText}</p>
			</div>
		</div>
	);
}

export default CommentMarkup;
