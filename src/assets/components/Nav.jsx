import { NavLink, Outlet } from "react-router-dom";
import React, { useContext, useEffect } from 'react'

// Img
import Logo from '../webdock-logo-hvid.svg'


//Css
import '../stylesheet/nav.css'

//Components
import Tabs from '../components/FeatureTabs'
import Roadmap from "../../routes/Roadmap";
import FeatureRequest from "../../routes/featureRequest"
import MyRequest from "../../routes/MyRequest";
import { AuthContext } from "../contexts/AuthContext";


function Nav() {
  const {user, setUser} = useContext(AuthContext)
//function body = body af en function
  useEffect(() => {
    console.log(user)
  }, [user])
  return (
    <div className="nav-container">
      <div className="container">
        <div className="nav">
          <img src={Logo} alt="Logo" />

          <div> {/*Ternary = hvis den først er true tage den statement før : hvis false den efter - kortere else/if */}
            {!!user ? (
              <p onClick={() => setUser(null)}>Log out</p>
            ) : (
              <> {/* fragment */}
                <p onClick={() => setUser({name: 'Preben'})}>Login</p>
                <p>Sign up</p>
              </>
            )}
            
          </div>

          
        </div>

        <div className="tab-container">
          <NavLink to="roadmap"  > 
            <Tabs Title="Roadmap" />
          </NavLink>
          <NavLink to="featurerequest"  >
            <Tabs Title="Feature request" />
          </NavLink>
          {!!user && ( //truthy and falsy - testes i "if" - hvis user er et object = true hvis null = false - når du rammer noget ikke er sandt stopper den med at kigge efter det
            <NavLink to="myrequest">
              <Tabs Title="My Request" />
            </NavLink>
          )}
            
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Nav