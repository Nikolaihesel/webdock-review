import { useEffect, useState } from 'react';
import { usePostManagement } from '../../services/PostManagement';
import PostMarkup from '../postMarkup/PostMarkup';

//style
import './myPosts.css';
//icon

function MyPosts() {
	const { fetchPostsById, fetchedPosts, user } = usePostManagement();
	const [currentPage, setCurrentPage] = useState(1);
	const [login, setLogin] = useState(null);
	const [username, setUsername] = useState('');
	const postsPerPage = 3;

	useEffect(() => {
		if (user && user.name && user.name.length > 0) {
			setUsername(user.name[0]);
		} else {
			console.log("User or user's name is undefined or empty.");
		}
	}, []);

	console.log(username);

	useEffect(() => {
		user;
		console.log(user);
	});

	useEffect(() => {
		// Fetch posts when the user ID changes
		if (user && user.id) {
			fetchPostsById(user.id);
		}
	}, [user]); // Update posts when user changes

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = fetchedPosts.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
					<PostMarkup
						key={post._id}
						FirstLetter={username}
						Description={post.bodyText}
					/>
				))
			) : (
				<p>User not logged in</p>
			)}
		</div>
	);
}

export default MyPosts;
