import React from 'react'
import { useLocation } from 'react-router-dom';

import { Navbar } from "../components/index";
import { Outlet } from 'react-router-dom';

import { TextTyping } from "../components/Components";

import "./Home.css";

export default function Home() {

  let location = useLocation();

  const title = "MSCM";
  const item = [
    {
      name: "Home",
      pathname: "/",
      icon:"bi bi-house-check-fill"
    },
    // {
    //   name: "About",
    //   pathname: "about-us",
    //   icon:"bi bi-file-person"
    // },
    {
      name: "Contact",
      pathname: "contact-us",
      icon:"bi bi-person-lines-fill"
    },
  ];

  return ( 
    <>
    <Navbar title={title} item={item} />
    {location.pathname === "/" && (
    <div className='home-container'>
     <div>
      <TextTyping />
     </div>
      </div>
    )
}
    <Outlet/>
    </>
  )
}
