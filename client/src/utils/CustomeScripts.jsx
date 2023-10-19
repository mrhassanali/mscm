import {useSelector,useDispatch } from "react-redux";
import {logoutAction} from '../state/Action/actions';
import { useNavigate, Link } from "react-router-dom";

export const NavbarCode = ()=> {
  let navbar = document.querySelector("header .navbar");
  document.querySelector("#menu-btn").onClick = () => {
    navbar.classList.toggle("active");
  };
  // console.log(navbar);
}


//using the arrow function we perform the login and logout functionality in navbar
export const LoginLogout = ()=>{
  
  const dispatch = useDispatch();
  const LoginLogout = useSelector(state =>state.LoginLogout);
  const {role,isLogged} = LoginLogout;
  
  let navigate = useNavigate();
  return (
    <>
    {/* {!localStorage.getItem("login") ? ( */}
    {!role ? (
       <span>
         <Link to="/login">
          <button type="button" className="btn-dark btn-primary">Login</button>
        </Link>
        <Link to="/signup">
          <button type="button" className="btn-dark btn-primary">SignUp</button>
        </Link>
       </span>
    ):(
       <button
        onClick={() => {  dispatch(logoutAction());
          // window.localStorage.removeItem("login");
          // navigate("/login");
          navigate("/");
        }} type="button" className="btn-dark btn-danger">Logout</button>
    )
    }
    </>
  );
}

export const ModalCode = ()=>{
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
  // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal
    btn.onclick = function () {
      modal.style.display = "block";
    };
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function (event) {
    //   if (event.target == modal) {
    //     modal.style.display = "none";
    //   }
    // };
}
