import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
 
import { useSelector} from "react-redux";


export default function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  const location = useLocation();

/*
  useEffect(() => {
    let login = window.localStorage.getItem("login");
    if (!login) {
      navigate("/login");
    } else {
      // Check if the current location matches the login type
      const loginType = location.pathname.split("/")[1];
      // console.log(location.pathname);
      if (loginType !== login) {
        navigate(`/${login}`);
      }
    }
  }, [navigate, location]);
 */

  const LoginLogout = useSelector(state =>state.LoginLogout);
  // console.log(LoginLogout);

  const {role,isLogged} = LoginLogout;
  useEffect(() => {
    if (!role) {
      // navigate("/login");
      navigate("/");
    }
    else {
      const loginType = location.pathname.split("/")[1];
      if (loginType !== role) {
        navigate(`/${role}`);
      }
    }
  }, [navigate, location]);


  return (
    <div>
      <Component />
    </div>
  );
}
