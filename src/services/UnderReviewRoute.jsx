// Importing necessary hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importing styles
import '../newui/featurePosts/featurePosts.css';

// Importing the usePostManagement hook for handling post-related actions
import { usePostManagement } from './PostManagement';

// Component for rendering posts with "Under Review" status
const UnderReviewRoute = ({ featureStatus }) => {
	// Using the react-router navigate hook
	const navigate = useNavigate();

	// Function to truncate text to a specified length
	function truncateText(text, maxLength) {
		if (text.length > maxLength) {
			return text.slice(0, maxLength) + '...';
		}
		return text;
	}

	// Using the usePostManagement hook to fetch posts and handle post-related actions
	const { fetchPostsWithStatus, fetchedPosts, handleLike } =
		usePostManagement(featureStatus);

	// State variables for handling pagination
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 3;

	// Effect to fetch posts with the specified status when the component mounts or when the status changes
	useEffect(() => {
		fetchPostsWithStatus(featureStatus);
	}, [featureStatus]);

	// Calculating the index of the last and first post on the current page
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;

	// Slicing the array of fetched posts to get the posts for the current page
	const currentPosts = fetchedPosts.slice(indexOfFirstPost, indexOfLastPost);
	
	// Function to handle pagination
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Rendering the component
	return (
		<div className='width-container'>
			<ul className='pagination'>
				{Array.from({
					length: Math.ceil(fetchedPosts.length / postsPerPage),
				}).map((_, index) => (
					<li key={index}>
						<button
							className={currentPage === index + 1 ? 'current-btn' : ''}
							onClick={() => paginate(index + 1)}>
							{index + 1}
						</button>
					</li>
				))}
			</ul>

			{currentPosts ? (
				currentPosts.map((post) => (
					<div
						className='post-preview'
						key={post._id}
						onClick={() => navigate(`/posts/${post._id}`)}>
						<p className='post-title'>{post.title}</p>
						<p className='post-author'>{post.user.name}</p>
						<p className='post-preview-text'>
							{truncateText(post.bodyText, 150)}
						</p>
						<div className='post-details'>
							<button
								onClick={() => handleLike(post._id)}
								className='upvote-button'>
								Upvote ({post.upvotes})
							</button>
							<div className='post-meta'>
								<p className='post-comments'>{post.comments.length} Comments</p>
								<p className='post-tag'>{post.tag}</p>
							</div>
						</div>
					</div>
				))
			) : (
				// Message to display if there are no posts
				<p>no post chosen</p>
			)}
		</div>
	);
};

// Exporting the component
export default UnderReviewRoute;
