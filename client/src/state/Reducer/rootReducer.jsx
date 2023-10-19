import { combineReducers } from "redux";
import counterReducer from "./counter";
import LoggedReducer from "./isLoged";
import LoginLogout from "./LoginLogout";

const rootReducer = combineReducers({
  counter:counterReducer,
  isLogged:LoggedReducer,
  LoginLogout:LoginLogout,
})
 
export default rootReducer