// Importing necessary React hooks and components
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importing styles for the component
import '../newPost/newPost.css';
import '../../newui/featurePosts/featurePosts.css';

// Importing custom hooks and services for post management
import { usePostManagement } from '../../services/PostManagement';
import SendPosts from '../../services/SendPosts';

// NewPost component definition
function NewPost() {
	// Using the useNavigate hook for programmatic navigation
	const navigate = useNavigate();

	// Destructuring values from the usePostManagement custom hook
	const { user, fetchPosts, fetchedPosts, searchPosts } = usePostManagement();

	// State for storing the search term entered by the user
	const [searchTerm, setSearchTerm] = useState('');

	// Function to truncate text based on a maximum length
	function truncateText(text, maxLength) {
		if (text.length > maxLength) {
			return text.slice(0, maxLength) + '...';
		}
		return text;
	}

	// Function to handle search based on the entered search term
	const handleSearch = () => {
		if (searchTerm.trim() !== '') {
			searchPosts(searchTerm);
		}
	};

	// Function to clear the search and fetch all posts
	const clearSearch = () => {
		fetchPosts();
		setSearchTerm('');
	};

	// Effect hook to fetch posts when the component mounts
	useEffect(() => {
		fetchPosts();
	}, []);

	console.log;
	// Render the NewPost component
	return (
		<div className='new-post'>
			<div className='create-post'>
				<h3>Create a new feature request</h3>
				<SendPosts />
			</div>

			<div className='all-posts'>
				<div className='all-posts-container'>
					<div className='search-field'>
						<input
							type='text'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder='Search posts...'
						/>
						<button
							className='search-btn'
							onClick={handleSearch}>
							Search
						</button>
						<button
							className='clearsearch-btn'
							onClick={clearSearch}>
							Clear
						</button>
					</div>

					<h3>All feature Request</h3>
					{fetchedPosts.map((post) => (
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
								<button className='upvote-button'>
									Upvote ({post.upvotes})
								</button>
								<div className='post-meta'>
									<p className='post-comments'>
										{post.comments.length} Comments
									</p>
									<p className='post-tag'>{post.tag}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

// Exporting the NewPost component as the default export
export default NewPost;
