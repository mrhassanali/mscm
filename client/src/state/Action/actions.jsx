export const increment = (number)=>{
    return {
        // name:'INCREMENT'
        type:'INCREMENT',
        // data:number
        payload:number
    }
} 

export const decrement = (number)=>{
    return {
        type:'DECREMENT',
        // data:number
        payload:number
    } 
}



// Action types

 
// Action creators
export const loginAction = ({wallet,role,password,name}) => {
  return {
    type: 'LOGIN',
    payload: {
      walletAddress: wallet,
      role: role,
      password:password,
      name:name,
      isLogged: true
    }
  };
};

export const logoutAction = () => {
  return {
    type: 'LOGOUT',
    payload: {
      walletAddress: null,
      role: null,
      password:null,
      name:null,
      isLogged: false
    }
  };
};

