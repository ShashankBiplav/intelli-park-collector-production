import React, {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import UserContext from "./context/UserContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AllTicketsComponent from "./components/AllTicketsComponent/AllTicketsComponent";
import NewTicketComponent from "./components/NewTicketComponent/NewTicketComponent";
import ActiveTicketsComponent from "./components/ActiveTicketsComponent/ActiveTicketsComponent";
import PrintableComponent from "./components/NewTicketComponent/PrintableComponent";

function App() {
  const [user, setUser] = useState({
    isAuth: false,
    token: undefined,
    user: undefined,
    expiryTime: undefined,
    phone: undefined,
    password:undefined,
    vehicleNumber:"",
    amount:undefined,
    printing: false,
    companyName: "SYED ALEY HASSAN FARIDI",
    gst: "10AAJPF4316M2ZZ"
  });
  useEffect(() => {
    //TODO: set timer in this function
    const autoLogin = () => {
      //check for the token in the localStorage
      let token = localStorage.getItem("auth-token");
      console.log(token);
      //check for the expiredTime in localStorage
      let expTime = localStorage.getItem("exp-time");
      let companyName = localStorage.getItem("companyName");
      let gst = localStorage.getItem("gst");
      if (token === null || expTime === null || expTime === "" || companyName=== "" || gst === "") {
        //if no token key found, set it to an empty string
        localStorage.setItem("auth-token", "");
        localStorage.setItem("exp-time", "");
        localStorage.setItem("companyName", "");
        localStorage.setItem("gst", "");
        token = "";
        expTime = "";
        return;
      }
      
      let currentTime = new Date().toISOString();
      let expiryTime = new Date(expTime).toISOString();
      if ((expiryTime > currentTime) && token) {
        setUser(user => ({
          ...user,
          isAuth: true,
          token,
          expiryTime,
          companyName,
          gst
        }));
      } else {
        token = "";
      }
    }
    autoLogin();
  }, []);
  
  //logic for logout
  const logOut = () => {
    setUser({
      ...user,
      token: undefined,
      user: undefined,
      isAuth: false,
      expiryTime: undefined,
      companyName: "",
      gst: ""
    });
    
    //removing the token from localStorage
    const token = localStorage.getItem("auth-token");
    if (token) {
      localStorage.setItem("auth-token", "");
      localStorage.setItem("exp-time", "");
      localStorage.setItem("companyName", "");
      localStorage.setItem("gst", "");
    }
  }
  
  return (
    <>
      <UserContext.Provider value={{user, setUser, logOut}}>
        <BrowserRouter>
          <Navbar/>
          <div className="flex flex-col h-screen justify-between">
            <Switch>
              <Route exact path="/" component={AllTicketsComponent}/>
              <ProtectedRoute exact path="/new-ticket" component={NewTicketComponent}/>
              <ProtectedRoute exact path="/active-tickets" component={ActiveTicketsComponent}/>
              <ProtectedRoute exact path="/print" component={PrintableComponent}/>
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
