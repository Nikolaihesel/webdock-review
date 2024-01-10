// Importing the useRouteError hook from react-router-dom
import { useRouteError } from 'react-router-dom';

// Defining the ErrorPage component to handle and display route errors
export default function ErrorPage() {
	// Using the useRouteError hook to get information about the route error
	const error = useRouteError();

	// Logging the error details to the console
	console.error(error);
	console.error({
		statusText: error.statusText,
		message: error.message,
		status: error.status,
	});

	// Rendering the error page with error details
	return (
		<div id='error-page'>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
