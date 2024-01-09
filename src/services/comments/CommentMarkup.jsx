import React from 'react';
import './comments.css';
import CommentReply from './CommentReply';

function CommentMarkup({ Name, BodyText }) {
	return (
		<div>
			<div className='comment'>
				<p className='name'>{Name}</p>
				<p className='body-text'>{BodyText}</p>
			</div>
			<CommentReply />
		</div>
	);
}

export default CommentMarkup;
