import React from 'react'
import DropdownMenu from '../assets/components/dropDown/Dropdown'
import Post from '../assets/components/PostData'

//css
import "../index.css"
import "../assets/stylesheet/featureRequest.css"

function FeatureRequest() {
  return (
    <div className="fr-req-container">
    <div className='filter-nav'>
      <div className='filter'>
          <div className="">
            <p className="">Sort By</p>
            <DropdownMenu option1="Progress" option2="Planned" option3="Complete" />
          </div>
          <div className=""> 
            <p className="">posts with</p>
            <DropdownMenu option1="DNS" option2="VPN" option3="Server" />
          </div> 
        </div>
        <div className="searchContainer">
        <input type="search" className="" placeholder='Search' />
        <button type='submit'>Search</button>
        </div>  

    </div> 
    <div className="card-post">
          <Post />
    </div>

    </div>

  )
}

export default FeatureRequest