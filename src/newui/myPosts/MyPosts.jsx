// React and useEffect hooks imports
import { useEffect, useState } from 'react';

// Post management service for handling user posts
import { usePostManagement } from '../../services/PostManagement';

// Icon import from react-icons library
import { FaLongArrowAltRight } from 'react-icons/fa';

// Styling import
import './myPosts.css';

// MyPosts component definition
function MyPosts() {
	// Function to truncate the title for display
	function truncateTitle(title) {
		return title.length > 15 ? title.substring(0, 12) + '...' : title;
	}
	// Destructuring values from usePostManagement hook
	const { fetchPostByUserId, fetchedPosts, user } = usePostManagement();

	// State variables for managing pagination and user information
	const [currentPage, setCurrentPage] = useState(1);
	const [login, setLogin] = useState(null);
	const [username, setUsername] = useState('');
	const postsPerPage = 3;

	// useEffect to set the username when the user object is available
	useEffect(() => {
		if (user && user.name && user.name.length > 0) {
			setUsername(user.name[0]);
		} else {
		}
	}, []);

	
	useEffect(() => {
		user;
	});

	// useEffect to fetch posts when the user ID changes
	useEffect(() => {
		// Fetch posts when the user ID changes
		if (user && user.id) {
			fetchPostByUserId(user.id);
		}
	}, [user]); // Update posts when user changes

	// Calculate the index of the last and first posts for pagination
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = fetchedPosts.slice(indexOfFirstPost, indexOfLastPost);

	// Function to handle pagination
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Return JSX for rendering the user's posts
	return (
		<div className='my-posts'>
			<div className='pagination-wrapper'>
				{currentPosts.length > 0 ? <p>{user.name}'s Posts</p> : ''}
				<ul className='pagination'>
					{Array.from({
						length: Math.ceil(fetchedPosts.length / postsPerPage),
					}).map((_, index) => (
						<li
							className='li-pagination'
							key={index}>
							<button
								className={currentPage === index + 1 ? 'current-btn' : ''}
								onClick={() => paginate(index + 1)}>
								{index + 1}
							</button>
						</li>
					))}
				</ul>
			</div>
			{currentPosts.length > 0 ? (
				currentPosts.map((post) => (
					<div
						className='small-post-preview'
						key={post._id}>
						<div className='post-title'>{truncateTitle(post.title)}</div>
						<div className='post-upvotes'>{post.upvotes}</div>
						<FaLongArrowAltRight className='icon' />
					</div>
				))
			) : (
				<p>No user posts to show</p>
			)}
		</div>
	);
}

// Export MyPosts component as the default export
export default MyPosts;
