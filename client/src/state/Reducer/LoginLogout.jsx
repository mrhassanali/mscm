// Action types 
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Initial state
const initialState = {
  walletAddress:null,
  role: null,
  password:null,
  name:null,
  isLogged: false
};

// Reducer function
// const LoginLogout = (state = initialState, action) => {
  const LoginLogout = (state = initialState, {type,payload}) => {
  switch (type) {
    case LOGIN:
      return { 
        ...state,
        walletAddress: payload.walletAddress,
        role: payload.role,
        password:payload.password,
        name:payload.name,
        isLogged: payload.isLogged
      };
    case LOGOUT:
      return {
        ...state,
        walletAddress: payload.walletAddress,
        role: payload.role,
        password:payload.password,
        name:payload.name,
        isLogged: payload.isLogged
      };
    default:
      return state;
  }
};

export default LoginLogout;