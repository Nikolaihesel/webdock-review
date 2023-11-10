import React from 'react'
import { useState } from 'react'

//Components
import FeatureContainer from '../assets/components/FeatureRequestContainer'
import CreatePost from '../assets/components/CreatePost'
import {Button} from '../assets/components/Button'

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
            <div className="triple-container">
                <div className='mostLiked'>
                    <FeatureContainer title="Most Liked" />
                </div>

                <div className='comingSoon'>
                    <FeatureContainer title="Coming Soon" />
                </div>

                <div className='newIn'>
                    <FeatureContainer title="New In" />
                </div>
            </div>

            <div className="ImpleRequest">
                <FeatureContainer title="Implemented request" />
            </div>

            <div className="CenterButton">
                <Button onClick={handleModalOpen} title='Request' />
                <CreatePost isOpen={isModalOpen} onClose={handleModalClose} />
            </div>
        
        </div>

    )
}


export default Roadmap