import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
//style
function p({ FirstLetter, Title, Description, Upvotes, LikePost, ButtonText }) {
	const admin = false;
	return (
		<div className='user-post'>
			<span>{FirstLetter}</span>
			<div className='post-wrap'>
				<h3>{Title}</h3>
				<p>{Description}</p>
				<p>{Upvotes}</p>
				{admin && (
					<button
						className
						Button
						onClick={LikePost}>
						{ButtonText}
					</button>
				)}
			</div>
			<FaLongArrowAltRight className='icon' />
		</div>
	);
}

export default p;
