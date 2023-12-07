import { useState, useEffect } from 'react';

import { usePostManagement } from '../services/PostManagement';
function Admin() {
	const { fetchedPosts, fetchPosts, user, handleLike, handleDelete } =
		usePostManagement();

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div>
			{fetchedPosts.map((post) => (
				<div key={post._id}>
					<h3>{post.title}</h3>
					<p>{post.body}</p>
				</div>
			))}
		</div>
	);
}

export default Admin;
