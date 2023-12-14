import React from "react";
import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import "../sideNav/sideNav.scss";
import { IoIosHome } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";
import Logo from "../../assets/img/webdock-logo.png";

function SideNav() {
  return (
    <div className="side-nav">
      <div className="logo">
        <img src={Logo} alt="Webdocks Logo" />
      </div>
      <IconContext.Provider
        value={{
          style: { color: "#f2f3f7", verticalAlign: "middle" },
          className: "icons",
        }}
      >
        <div className="icon-wrapper">
          <NavLink to="mostliked">
            <IoIosHome className="test-icon" />
          </NavLink>
          <NavLink to="newpost">
            <MdAddCircle />
          </NavLink>
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default SideNav;
