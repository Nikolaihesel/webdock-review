// Importing necessary React components and styles
import MainBoardRoutes from '../../newui/mainBoardRoutes/MainBoardRoutes';
import Header from '../../newui/header/Header';

// Importing additional stylesheets
import '../../newui/main.css';
import '../../newui/variables.scss';
import './dashboard.css';

// Importing other components used in the Dashboard
import MyPosts from '../../newui/myPosts/MyPosts';
import FeaturePosts from '../../newui/featurePosts/FeaturePosts';

// Dashboard component definition
function Dashboard() {
	return (
		<div className='dashboard-wrapper'>
			<div className='flex-column-wrap'>
				<Header />
				<div className='row-wrapper'>
					<div className='flex-row-wrap'>
						<MainBoardRoutes />
						<MyPosts />
					</div>

					<div className='flex-row-wrap'>
						<FeaturePosts />
					</div>
				</div>
			</div>
		</div>
	);
}

// Exporting the Dashboard component as the default export
export default Dashboard;
