import React, {useContext} from "react";
import UserContext from "../../context/UserContext";
import {Route} from "react-router-dom";
import LoginComponent from "../LoginComponent/LoginComponent";

function ProtectedRoute({component: Component, ...rest}) {
  const {user} = useContext(UserContext);
  
  return (
    <Route {...rest} render={
      (props => {
        if (user.isAuth) {
          return <Component {...props}/>
        } else {
          return <LoginComponent {...props}/>
        }
      })
    }
    />
  );
}

export default ProtectedRoute;
