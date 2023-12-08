import React from 'react';
import { useState, useEffect, useContext } from 'react';
import PostMarkup from './PostMarkup';
import { TokenContext } from '../contexts/TokenContext';
import { usePostManagement } from '../../services/PostManagement';
//css
import '../stylesheet/featureRequest.css';
function PostData({ MenuHeading, hrClass, Url }) {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 3;

	const { fetchedPosts, fetchPosts, user, handleLike, handleDelete } =
		usePostManagement();

	useEffect(() => {
		fetchPosts();
	}, []);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = fetchedPosts.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className='post-container'>
			<div className='post-container-heading'>
				<h2>{MenuHeading}</h2> {/* Pagination btn starts here*/}
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
			</div>
			<hr className={`${hrClass}`} />
			{currentPosts.map((post) => (
				<PostMarkup
					key={post._id}
					title={post.title}
					// classStatus={post.bodyText}
					status={post.featureStatus}
					description={post.bodyText}
					Upvotes={post.upvotes}
					BtnFunction={() => handleLike(post._id)}
					DeletePost={() => handleDelete(post._id)}
				/>
			))}
		</div>
	);
}

export default PostData;
