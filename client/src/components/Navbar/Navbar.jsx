import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NavbarCode,LoginLogout } from "../../utils/CustomeScripts";
import "./Navbar.css";

const Navbar = (props) => {
  useEffect(() => {
    let navbar = document.querySelector("header .navbar");
    document.querySelector("#menu-btn").onclick = () => {
      navbar.classList.toggle("active");
    };
    // NavbarCode();
  }, []);

  let title = props.title;
  let item = props.item;
  // console.log(item[0].pathname)
  return (

    <header>
    <Link to={item[0].pathname} className="logo"><span>{title}</span></Link>
    <nav className="navbar">
      {item.map((element, index) => {
        return (
          <NavLink to={item[index].pathname} key={index}>
            <i className={item[index].icon?item[index].icon:""}></i>&nbsp;{item[index].name}</NavLink>
        );
      })}
      {/* Adding Login and Logout Functionality */}
       {LoginLogout()}
    </nav>
    <div className="icons">
      <div id="menu-btn" className="fas fa-bars"></div>
    </div>
  </header>
  );
};

export default Navbar;
