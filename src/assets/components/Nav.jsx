import React from 'react'
import Logo from '../webdock-logo-hvid.svg'
import Banner from '../banner.jpg'

//Css
import '../stylesheet/nav.css'

//Components
import Tabs from '../components/FeatureTabs'

function Nav() {
  return (
<div className="container">
    <div className="nav">
        <img src={Logo} alt="Logo" />

        <div>
            <p>Login</p>
            <p>Sign up</p>
        </div>

        
        </div>

    <div className="tab-container">
        <Tabs Title="Roadmap"  className="active" />
        <Tabs Title="Feature request" />
        <Tabs Title="My Request" />
     </div>
    </div>
  )
}

export default Nav