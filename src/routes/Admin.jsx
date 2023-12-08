import { useState, useEffect } from 'react';

//components
import PostMarkup from '../assets/components/PostMarkup';

//custom hook
import { usePostManagement } from '../services/PostManagement';
function Admin() {
	const [admin, setAdmin] = useState(true);

	console.log(admin);
	const { fetchedPosts, fetchPosts, user, handleLike, handleDelete } =
		usePostManagement();

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div>
			{fetchedPosts.map((post) => (
				<PostMarkup
					key={post._id}
					title={post.title}
					status={post.featureStatus}
					description={post.bodyText}
					upvotes={post.upvotes}
					BtnFunction={() => handleLike(post._id)}
					DeletePost={admin ? () => handleDelete(post._id) : null}
				/>
			))}
		</div>
	);
}

export default Admin;
