import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Routes, Route, NavLink, Link, Outlet } from 'react-router-dom';

//Components
import Post from '../assets/components/PostData';
import ModalButton from '../assets/components/button/Button';
//Css
import '../assets/stylesheet/roadmap.css';

function Roadmap() {
	return (
		<div className='roadmap-container'>
			<div className='roadmap-nav'>
				<ul className='roadmap-nav-list'>
					<NavLink
						className='roadmap-nav-menu-item'
						to='/roadmap/mostliked'>
						{' '}
						<li>Most liked</li>
					</NavLink>

					<NavLink
						className='roadmap-nav-menu-item'
						to='/roadmap/inprogress'>
						<li>In progress</li>{' '}
					</NavLink>

					<NavLink
						className='roadmap-nav-menu-item'
						to='/roadmap/underreview'>
						<li>Under review</li>{' '}
					</NavLink>

					<NavLink
						className='roadmap-nav-menu-item'
						to='/roadmap/implemented'>
						<li>Implemented</li>
					</NavLink>

					<ModalButton />
				</ul>
			</div>

			<div className='roadmap-mainside'>
				<Routes>
					<Route
						path='/mostliked'
						element={
							<Post
								MenuHeading={'Most liked requests'}
								hrClass={'hr-active'}
							/>
						}
					/>
					<Route
						path='/inprogress'
						element={
							<Post
								MenuHeading={'Requests in progress'}
								hrClass={'hr-active'}
							/>
						}
					/>

					<Route
						path='underreview'
						element={
							<Post
								MenuHeading={'Requests under review'}
								hrClass={'hr-active'}
							/>
						}
					/>
					<Route
						path='implemented'
						element={
							<Post
								MenuHeading={'Implemented requests'}
								hrClass={'hr-active'}
							/>
						}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default Roadmap;
