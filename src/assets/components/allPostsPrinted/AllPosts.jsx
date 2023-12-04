import { useState, useEffect } from 'react';
import PostMarkup from '../PostMarkup';

const AllPosts = (Title) => {
	const handleDelete = async (postId) => {
		try {
			const response = await fetch(
				`http://localhost:4000/api/posts/${postId}`,
				{
					method: 'DELETE',
				}
			);

			if (response.ok) {
				const updatedPosts = fetchedPosts.filter((post) => post._id !== postId);
				setFetchedPosts(updatedPosts);
				console.log('Post deleted successfully');
			} else {
				console.log('Failed to delete post');
			}
		} catch (error) {
			console.error('Error deleting post:', error);
		}
	};

	return (
		<div>
			<div className='feature-container'>
				<h3 className='feature-title'>{Title}</h3>
				{fetchedPosts &&
					fetchedPosts.map((post) => (
						<PostMarkup
							key={post._id}
							title={post.title}
							description={post.bodyText}
							status={post.featureStatus}
							upvotes={post.upvotes}
							DeletePost={() => handleDelete(post._id)}
						/>
					))}
			</div>
		</div>
	);
};

export default AllPosts;
