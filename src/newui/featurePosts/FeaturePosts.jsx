import { Routes, Route, Router, Outlet } from 'react-router-dom';

import '../featurePosts/featurePosts.css';

function FeaturePosts() {
	return (
		<div className='feature-posts-container'>
			<Outlet />
		</div>
	);
}

export default FeaturePosts;
