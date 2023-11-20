import React from 'react'
import { useState } from 'react'
import { Routes, Route, NavLink, Link, Outlet } from 'react-router-dom';
//Components
import FeatureContainer from '../assets/components/RoadmapInfoBox'
import CreatePost from '../assets/components/CreatePost'
import {Button} from '../assets/components/button/Button'
import Post from '../assets/components/PostData'

//Css
import '../assets/stylesheet/roadmap.css'


function Roadmap() {
    const [isModalOpen, setIsModalOpen] = useState(false);
      
    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    
  
    return (
    

   
        <div className="roadmap-container"> 


           

           <div className="roadmap-nav">
            <ul className="roadmap-nav-list">

             <NavLink className="roadmap-nav-menu-item" to="/roadmap/mostliked">   <li  >Most liked</li>
             </NavLink>

             <NavLink className="roadmap-nav-menu-item" to="/roadmap/inprogress"> 
                <li >In progress</li> </NavLink>

                 <NavLink className="roadmap-nav-menu-item" to="/roadmap/underreview"> 
                <li >Under review</li> </NavLink>

                 <NavLink className="roadmap-nav-menu-item" to="/roadmap/implemented"> 
                <li  >Implemented</li>
                </NavLink>
            </ul>
           </div>

           <div className="roadmap-mainside">
            <Routes >
                <Route path="/mostliked"  element={<Post />}/>
                <Route path="/inprogress" element={<Post />}/>
                <Route path="underreview" element={<Post />} />
                <Route path="implemented" element={<Post />}/>
            </Routes>
            </div>
            

         
         


            {/* <div className="CenterButton">
                <Button onClick={handleModalOpen} title='Request' />
                <CreatePost isOpen={isModalOpen} onClose={handleModalClose} />
            </div>
         */}
        </div>

    )
}


export default Roadmap