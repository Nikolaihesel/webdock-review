import { NavLink, Outlet, useRouteLoaderData } from "react-router-dom";
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
import { TokenContext } from "../contexts/TokenContext";


function Nav() {
  const {token, setToken} = useContext(TokenContext)



//function body = body af en function
  return (
    <div className="nav-container">
      <div className="container">
        <div className="nav">
          <img src={Logo} alt="Logo" />

          <div> {/*Ternary = hvis den først er true tage den statement før : hvis false den efter - kortere else/if */}
      
            {!!token ? (
              <p >Log out</p>
            ) : (
              <> {/* fragment */}
           
                      <NavLink to="ssologin"><p>Login</p>   </NavLink>  
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
          {!!token && ( //truthy and falsy - testes i "if" - hvis user er et object = true hvis null = false - når du rammer noget ikke er sandt stopper den med at kigge efter det
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