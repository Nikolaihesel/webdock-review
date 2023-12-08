import React from 'react';
import { useState, useEffect, useContext } from 'react';
import PostMarkup from './PostMarkup';

import { TokenContext } from '../contexts/TokenContext';

//css
import '../stylesheet/featureRequest.css';
function PostData({ MenuHeading, hrClass }) {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [fetchedPosts, setFetchedPosts] = useState([]);
	const postsPerPage = 3;

	//User Data set
	const { token } = useContext(TokenContext);

	let user = {};
	if (token) {
		user = {
			id: token.id,
			name: token.name,
			email: token.email,
		};
	}

	console.log(user);

	//upvote
	const handleUpvote = (postId) => {
		setPosts((prevPosts) =>
			prevPosts.map((post) =>
				post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
			)
		);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`http://localhost:4000/api/posts`);
			const json = await response.json();

			if (response.ok) {
				setFetchedPosts(json);
			}
		};

		fetchPosts();
	}, []);

	console.log(fetchedPosts);

	//deletePost
	const handleDelete = async (postId) => {
		try {
			const response = await fetch(
				`http://localhost:4000/api/posts/${postId}`,
				{
					method: 'DELETE',
				}
			);

			if (response.ok) {
				const updatedPosts = fetchedPosts.filter((post) => post._id !== postId);
				setFetchedPosts(updatedPosts);
			} else {
				console.log('Failed to delete post');
			}
		} catch (error) {
			console.error('Error deleting post:', error);
		}
	};

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
					BtnFunction={() => handleUpvote(post.id)}
					DeletePost={() => handleDelete(post._id)}
				/>
			))}
		</div>
	);
}

export default PostData;
