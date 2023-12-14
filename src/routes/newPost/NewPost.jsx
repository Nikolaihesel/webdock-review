import { useEffect, useState } from 'react';
import '../newPost/newPost.css';
import '../../newui/featurePosts/featureposts.css';

import { usePostManagement } from '../../services/PostManagement';
import SendPosts from '../../services/SendPosts';

function NewPost() {
	const { user, fetchPosts, fetchedPosts, searchPosts } = usePostManagement();
	const [searchTerm, setSearchTerm] = useState('');

	function truncateText(text, maxLength) {
		if (text.length > maxLength) {
			return text.slice(0, maxLength) + '...';
		}
		return text;
	}

	const handleSearch = () => {
		if (searchTerm.trim() !== '') {
			searchPosts(searchTerm);
		}
	};

	const clearSearch = () => {
		fetchPosts();
		setSearchTerm('');
	};

	useEffect(() => {
		fetchPosts();
		console.log(1);
		console.log(fetchedPosts);
	}, []);

	console.log;
	return (
		<div className='new-post'>
			<div className='create-post'>
				<h3>Create a new feature request</h3>
				<SendPosts />
			</div>

			<div className='all-posts'>
				<input
					type='text'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder='Search posts...'
				/>
				<button onClick={handleSearch}>Search</button>
				<button onClick={clearSearch}>Search</button>

				<h3>All feature Request</h3>
				{fetchedPosts.map((post) => (
					<div className='post-preview'>
						<p className='post-title'>{post.title}</p>
						<p className='post-author'>{post.user.name}</p>
						<p className='post-preview-text'>
							{truncateText(post.bodyText, 150)}
						</p>
						<div className='post-details'>
							<button className='upvote-button'>Upvote ({post.upvotes})</button>
							<div className='post-meta'>
								<p className='post-comments'>{post.comments.length} Comments</p>
								<p className='post-tag'>{post.tag}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default NewPost;
