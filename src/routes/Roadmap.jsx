import React from 'react'
import { useState } from 'react'

//Components
import FeatureContainer from '../assets/components/FeatureRequestContainer'
import CreatePost from '../assets/components/CreatePost'
import RequestButton from '../assets/components/RequestButton'

//Css
import '../assets/stylesheet/roadmap.css'

const RequestPost = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
      
        const toggleModal = () => {
          setIsModalOpen(prev => !prev);
        };
    }

function Roadmap() {

    
  
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
            <button onClick={toggleModal}>Open Modal</button>
            <CreatePost isOpen={isModalOpen} onClose={toggleModal} />
        </div>
      
     </div>

  )
}


export default Roadmap