// Importing necessary hooks and components
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../newui/featurePosts/featurePosts.css';
import { usePostManagement } from './PostManagement';

// AllPostsRoute component definition
const AllPostsRoute = ({ featureStatus }) => {
	// Initializing navigate function from react-router-dom
	const navigate = useNavigate();

	// Function to truncate text to a specified maxLength
	function truncateText(text, maxLength) {
		if (text.length > maxLength) {
			return text.slice(0, maxLength) + '...';
		}
		return text;
	}

	// Destructuring data and functions from usePostManagement hook
	const { fetchPosts, fetchedPosts, handleLike } = usePostManagement();

	// State for managing the current page number in pagination
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 3; // Number of posts to display per page

	// Fetching posts when the component mounts or when featureStatus changes
	useEffect(() => {
		fetchPosts();
	}, [featureStatus]);

	// Calculating the index range of posts to display on the current page
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = fetchedPosts.slice(indexOfFirstPost, indexOfLastPost);

	// Function to update the current page in pagination
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Render the AllPostsRoute component
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
				<p>no post chosen</p>
			)}
		</div>
	);
};

// Exporting the AllPostsRoute component as the default export
export default AllPostsRoute;
