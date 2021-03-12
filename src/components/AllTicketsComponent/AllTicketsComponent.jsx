import React, {useContext,} from "react";
import UserContext from "../../context/UserContext";
import LoginComponent from "../LoginComponent/LoginComponent";
import ParkingTicketsComponent from "./ParkingTicketsComponent";

function AllTicketsComponent() {
  
  const {user} = useContext(UserContext);
  return (user.isAuth ? <ParkingTicketsComponent/> : <LoginComponent/>);
}

export default AllTicketsComponent;
