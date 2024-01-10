// React library imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// React Router imports for routing
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';

// Component imports
import App from './routes/App';
import ErrorPage from './error-page';
// import { AuthProvider } from './assets/contexts/AuthContext';
import SsoLogin from './newui/ssoComponents/SsoLogin.jsx';
import SsoCallback from './newui/ssoComponents/SsoCallback.jsx';
import { TokenProvider } from './assets/contexts/TokenContext.jsx';

// Service and route components imports
import UnderReviewRoute from './services/UnderReviewRoute.jsx';
import PostDetail from './routes/PostDetail.jsx';
import Dashboard from './routes/dashboard/Dashboard.jsx';
import NewPost from './routes/newPost/NewPost.jsx';
import AllPostsRoute from './services/AllPostsRoute.jsx';

// Create a BrowserRouter instance with route configuration
const router = createBrowserRouter([
	{
		// Root path configuration
		path: '/',
		element: <App />, // Render App component for the root path
		errorElement: <ErrorPage />, // Render ErrorPage component for errors
		children: [
			{ index: true, element: <Navigate to='/dashboard/mostliked' /> }, // Redirect to mostliked on the root index
			{
				path: 'dashboard',
				element: <Dashboard />,
				children: [
					{ path: 'mostliked', element: <AllPostsRoute /> }, // Render AllPostsRoute component for mostliked
					{
						path: 'underreview',
						element: <UnderReviewRoute featureStatus={'Under%20Review'} />, // Render UnderReviewRoute with 'Under Review' status
					},

					{
						path: 'implemented', // Relative path to '/dashboard'
						element: <UnderReviewRoute featureStatus={'Implemented'} />, // Render UnderReviewRoute with 'Implemented' status
					},
					{
						path: 'inprogress', // Relative path to '/dashboard'
						element: <UnderReviewRoute featureStatus={'In%20Progress'} />, // Render UnderReviewRoute with 'In Progress' status
					},
				],
			},
			{
				path: 'posts/:postId',
				element: <PostDetail />, // Render PostDetail component for dynamic post ID
			},
			{
				path: 'newPost', // Render NewPost component for the '/newPost' path
				element: <NewPost />,
			},
			{
				path: 'ssologin', // Render SsoLogin component for the '/ssologin' path
				element: <SsoLogin />,
			},
			{
				path: 'ssocallback', // Render SsoCallback component for the '/ssocallback' path
				element: <SsoCallback />,
			},
		],
	},
]);

// Use ReactDOM.createRoot to render the app into the root element
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<TokenProvider>
			<RouterProvider router={router} />
		</TokenProvider>
	</React.StrictMode>
);
