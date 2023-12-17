import MainBoardRoutes from '../../newui/mainBoardRoutes/MainBoardRoutes';
import Header from '../../newui/header/Header';

import '../../newui/main.css';
import '../../newui/variables.scss';
import './dashboard.css';
import MyPosts from '../../newui/myPosts/MyPosts';
import FeaturePosts from '../../newui/featurePosts/FeaturePosts';

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

export default Dashboard;
