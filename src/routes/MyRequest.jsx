// Importing necessary React hooks and styles
import { useEffect } from 'react';
import '../assets/stylesheet/myrequest.css';

// Importing services and components
import { usePostManagement } from '../services/PostManagement';
import PostMarkup from '../assets/components/PostMarkup';

// MyRequest component definition
function MyRequest() {
	// Destructuring values from the usePostManagement hook
	const { fetchedPosts, user, handleLike, fetchPostsById } =
		usePostManagement();

	// useEffect hook to fetch posts by user ID when the component mounts
	useEffect(() => {
		fetchPostsById();
	}, []);

	// Render the MyRequest component
	return (
		<div className='mr-container'>
			<div className='double-container'>
				{fetchedPosts.map((post) => (
					<PostMarkup
						key={post._id}
						title={post.title}
						status={post.featureStatus}
						description={post.bodyText}
						upvotes={post.upvotes}
						BtnFunction={() => handleLike(post._id)}
					/>
				))}
			</div>
		</div>
	);
}

// Exporting the MyRequest component as the default export
export default MyRequest;
