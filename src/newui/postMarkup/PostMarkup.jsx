import React from 'react';

// Importing the 'FaLongArrowAltRight' icon from the 'react-icons/fa' library
import { FaLongArrowAltRight } from 'react-icons/fa';

// Definition of the 'p' component
function p({ FirstLetter, Title, Description, Upvotes, LikePost, ButtonText }) {
	// A constant 'admin' is set to 'false'. It is used to conditionally render the like button.
	const admin = false;

	// The main structure of the component
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

// Export 'p' component as the default export
export default p;
