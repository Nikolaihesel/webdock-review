import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';

import App from './routes/App';
import ErrorPage from './error-page';

// import { AuthProvider } from './assets/contexts/AuthContext';
import SsoLogin from './newui/ssoComponents/SsoLogin.jsx';
import SsoCallback from './newui/ssoComponents/SsoCallback.jsx';
import { TokenProvider } from './assets/contexts/TokenContext.jsx';

import UnderReviewRoute from './services/UnderReviewRoute.jsx';
import PostDetail from './routes/PostDetail.jsx';
import Dashboard from './routes/dashboard/Dashboard.jsx';
import NewPost from './routes/NewPost/NewPost.jsx';
import AllPostsRoute from './services/AllPostsRoute.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Navigate to='/dashboard/mostliked' /> },
			{
				path: 'dashboard',
				element: <Dashboard />,
				children: [
					{ path: 'mostliked', element: <AllPostsRoute /> },
					{
						path: 'underreview',
						element: <UnderReviewRoute featureStatus={'Under%20Review'} />,
					},

					{
						path: 'implemented', // Relative path to '/dashboard'
						element: <UnderReviewRoute featureStatus={'Implemented'} />,
					},
					{
						path: 'inprogress', // Relative path to '/dashboard'
						element: <UnderReviewRoute featureStatus={'In%20Progress'} />,
					},
				],
			},
			{
				path: 'posts/:postId',
				element: <PostDetail />,
			},
			{
				path: 'newPost', // Absolute path
				element: <NewPost />,
			},
			{
				path: 'ssologin', // Absolute path
				element: <SsoLogin />,
			},
			{
				path: 'ssocallback', // Absolute path
				element: <SsoCallback />,
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<TokenProvider>
			<RouterProvider router={router} />
		</TokenProvider>
	</React.StrictMode>
);
