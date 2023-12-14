import React from 'react';
import './mainBoardRoutes.css';
import { NavLink, Link } from 'react-router-dom';

function MainBoardRoutes() {
	return (
		<div className='mainboard-routes'>
			<div className='mainboard-flex'>
				<NavLink to='mostliked'>
					<div className='neumorphic-route-box  '>
						<div className='box-inside-wrap'>
							<h2 className='mainboard-headings'>All posts</h2>
						</div>
					</div>
				</NavLink>
				<NavLink to='inprogress'>
					<div className='neumorphic-route-box'>
						<div className='box-inside-wrap'>
							<h2 className='mainboard-headings'>In Progress</h2>
						</div>
					</div>
				</NavLink>
			</div>
			<div className='mainboard-flex'>
				<NavLink to='underreview'>
					<div className='neumorphic-route-box'>
						<div className='box-inside-wrap'>
							<h2 className='mainboard-headings'>Under Review</h2>
						</div>
					</div>
				</NavLink>
				<NavLink to='implemented'>
					<div className='neumorphic-route-box'>
						<div className='box-inside-wrap'>
							<h2 className='mainboard-headings'>Implemented</h2>
						</div>
					</div>
				</NavLink>
			</div>
		</div>
	);
}

export default MainBoardRoutes;
