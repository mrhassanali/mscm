import React, { useEffect,useState } from 'react';
import "../css/Form.css";
import "./Navbar/Navbar.css";
import {useNavigate } from 'react-router-dom';
import BackgroundParticles from './Particles/BackgroundParticles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useSelector,useDispatch } from "react-redux";
import { loginAction} from '../state/Action/actions';
import Web3 from 'web3';
import AddUsers from "../contracts/AddUsers.json";
import CustomerContract from "../contracts/CustomerContract.json";


import { useContext } from "react";
import { AppContext } from '../context/AppContext';

export default function Login() {
    const counter = useSelector((state) => state.counter);
    const dispatch = useDispatch();

let navigate = useNavigate();
let pageTitle = "Login";
useEffect(() => {
    let pageTitle = "Login";
    document.title = pageTitle;
}, []);

    const[Login,setLogin] = useState({
        wallet:"",
        role:"",
        password:"",
        name:""
    });

      //connection with metamask
      let {setUser,connectWallet,walletBalence} = useContext(AppContext);
      const connectWalletPressed = async () => {
        let {balence,metamaskAccount} = await walletBalence();
        setLogin((preValue) => {
        return {
           ...preValue,
           wallet: metamaskAccount
        };
    });


    window.ethereum.on('accountsChanged', (accounts) => {
        // console.log("Account changed to:", accounts[0]);
            setLogin((preValue) => {
                return {
                    ...preValue,
                    wallet:accounts[0],
                };
            });
        });

  };


  useEffect(() => {
    connectWalletPressed();
  }, []);


const inputEvent = (event) => {
const { name, value } = event.target;
setLogin((preValue) => {
    return {
    // preValue Return the obj that match to name and value
    ...preValue,
    [name]: value,
    };
}); 
};

 
const sendTransactions = async(wallet)=>{
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); // Use the default provider or a local one
    const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
    const contract = new web3.eth.Contract(AddUsers.abi,import.meta.env.VITE_Admin_AddUser_Contract_Address); 
    const gasEstimate = await contract.methods.users(wallet).estimateGas({ from: accounts[0] });
  
    return await contract.methods.users(wallet).call({
        from: accounts[0],
        gas: gasEstimate,
      });
}

 
const customerCheck = async(wallet)=>{
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); // Use the default provider or a local one
    const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network
    const contract = new web3.eth.Contract(CustomerContract.abi,import.meta.env.VITE_CustomerContract_Address); 
    const gasEstimate = await contract.methods.getCustomerData(wallet).estimateGas({ from: accounts[0] });
  
    return await contract.methods.getCustomerData(wallet).call({
        from: accounts[0],
        gas: gasEstimate,
      });
}




function LoginFunc(){
    if (Login.role === 'admin' || Login.role === 'manufacturer' || Login.role === 'distributor' || Login.role === 'retailor') {
        sendTransactions(Login.wallet).then((result)=>{   
    if (result.role == Login.role && 
        ((result.walletAddress).toLowerCase() == (Login.wallet).toLowerCase()) &&
        result.accountStatus == true &&
        result.password == Login.password) {
        console.log("All conditions are valid");
       console.log(result);
        let data = {
          wallet: result.walletAddress,
          role: result.role,
          password:result.password,
          name:result.name,
    
        }
    dispatch(loginAction(data));
        navigate(`/${result.role}`)
        setUser(Login); // using context
        toast.success('You are Login Successfully!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    
    } else {
        console.log("One or more conditions are invalid");
        toast.error('Invalid Credential!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
    
            });     
    }else if(Login.role == 'customer'){
        customerCheck(Login.wallet).then((result)=>{   
            // console.log(result);
              
            if (result.role === 'customer' &&
            (result.walletAddress.toLowerCase() === Login.wallet.toLowerCase()) &&
            result.accountStatus === 'Active' &&
            result.password === Login.password) {
                console.log("All conditions are valid");
               console.log(result);
                let data = {
                  wallet: result.walletAddress,
                  role: result.role,
                  password:result.password,
                  name:result.name,
            
                }
            dispatch(loginAction(data));
                navigate(`/${result.role}`)
                setUser(Login); // using context
                toast.success('You are Login Successfully!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true, 
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            
            } else {
                console.log("One or more conditions are invalid");
                toast.error('Invalid Credential!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }



                    });     
    }else{
        toast.warning('Invalid Credential!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
            
      
}

    return (
    <>
        {/* <BackgroundParticles/> */}
        <div className="form-container" style={{maxWidth:"calc(460px)"}}>
        {/* <h2 style={{"color":"green"}}>{pageTitle}</h2> */}
        <div style={{fontSize:"8rem",display:"flex",justifyContent:"center",color:"green"}}>
        <i class="bi bi-person-bounding-box"></i>
        </div>
        <form action='#'>
            <div className='input-box'>
                <label>Wallet Address</label>
                <input type="text" placeholder="Enter metamask Address" name="wallet" value={Login.wallet}
                // onChange={inputEvent}
                disabled required />
            </div>
            <div className='input-box'>
                <label>Role</label>
                <select name="role" value={Login.role} onChange={inputEvent}  required>
                    <option value="" disabled defaultValue>Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="manufacturer">Manufacturer</option>
                    <option value="supplier">Supplier</option>
                    <option value="distributor">Distributor</option>
                    <option value="retailor">Retailor</option>
                    <option value="customer">Customer</option>
                </select>
            </div>
            <div className='input-box'>
                <label>Password</label>
                <input type="password" placeholder="Confirm Password" name='password'
                value={Login.password} onChange={inputEvent} required />
            </div>

<button type='button' onClick={()=>{LoginFunc()}}>Login</button> 

        </form>
            <br></br>
            <p style={{fontSize:"2.3rem"}}>New customer :
                <button type='button' className='btn btn-primary' 
                onClick={()=>navigate("/signup")}>Sign Up</button>
            </p>
        </div>
    </>
    )
}
