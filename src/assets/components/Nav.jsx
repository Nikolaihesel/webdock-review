import { NavLink, Outlet } from "react-router-dom";
import React from 'react'
import Logo from '../webdock-logo-hvid.svg'
import Banner from '../banner.jpg'

//Css
import '../stylesheet/nav.css'

//Components
import Tabs from '../components/FeatureTabs'
import Roadmap from "../../routes/Roadmap";
import FeatureRequest from "../../routes/featureRequest"

function Nav() {
  return (
    <div className="nav-container">
<div className="container">
    <div className="nav">
        <img src={Logo} alt="Logo" />

        <div>
            <p>Login</p>
            <p>Sign up</p>
        </div>

        
        </div>

    <div className="tab-container">
    <NavLink to="roadmap"  > 
      <Tabs Title="Roadmap" />
    </NavLink>
    <NavLink to="featurerequest"  >
        <Tabs Title="Feature request" />
      </NavLink>
        <Tabs Title="My Request" />
     </div>
    </div>
    <Outlet />
  </div>
  )
}

export default Nav