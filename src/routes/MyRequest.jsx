import { useEffect } from 'react';
import '../assets/stylesheet/myrequest.css';

//Components
import { usePostManagement } from '../services/PostManagement';
import PostMarkup from '../assets/components/PostMarkup';

function MyRequest() {
	const { fetchedPosts, user, handleLike, fetchPostsById } =
		usePostManagement();

	useEffect(() => {
		fetchPostsById();
	}, []);

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

export default MyRequest;
