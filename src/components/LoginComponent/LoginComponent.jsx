import React,{useState, useContext} from "react";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


function LoginComponent () {
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const setCompany1 = () => {
    setUser({
      ...user,
      companyName: "SYED ALEY HASSAN FARIDI",
      gst: "10AAJPF4316M2ZZ"
    })
    localStorage.setItem("companyName", "SYED ALEY HASSAN FARIDI");
    localStorage.setItem("gst", "10AAJPF4316M2ZZ");
    setIsActive(false);
  };
  
  const setCompany2 = () => {
    setUser({
      ...user,
      companyName: "BHAGALPUR MULTISERVICES PVT LTD",
      gst: "10AAICB1517A1ZO"
    })
    localStorage.setItem("companyName", "BHAGALPUR MULTISERVICES PVT LTD");
    localStorage.setItem("gst", "10AAICB1517A1ZO");
    setIsActive(true);
  };
  
   const login= async () => {
     setIsLoading(true);
     const phone = document.getElementById("phone").value;
     const password = document.getElementById("password").value;
     setUser({
       ...user,
       phone:phone,
       password:password
     });
     if (!phone || !password){
       alert("Empty");
       setIsLoading(false);
       return;
     }
     const url = "https://intelli-park.herokuapp.com/auth/ticket-collector/login-password";
     let res;
     try {
       res = await Axios.post(url, {
         "phone": phone,
          "password": password
       }, {
         headers: {
           'content-type': 'application/json'
         }
       });
     } catch (err) {
       alert(`ERROR: ${err.message}`);
       setIsLoading(false);
       return;
     }
     setIsLoading(false);
     let {token, userId} = res.data;
     let tomorrow = new Date();
     tomorrow.setDate(tomorrow.getDate() + 1)
     localStorage.setItem("auth-token", token);
     localStorage.setItem("exp-time", tomorrow.toISOString());
     setUser({
       ...user,
       isAuth: true,
       token,
       user: userId,
       expiryTime: tomorrow,
       phone: undefined,
       password: undefined
     });
   };
  
  return (
    <section className="text-gray-700 body-font">
      <div className="flex mt-20">
        <div className={`w-1/2 ${isActive ? "border-blue-500 rounded-lg font-bold text-blue-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white mr-6 text-center":"bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 text-center"}`} onClick={setCompany1}> Company1</div>
        <div className={`w-1/2 ${!isActive ? "border-blue-500 rounded-lg font-bold text-blue-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white mr-6 text-center":"bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 text-center"}`} onClick={setCompany2}> Company2</div>
      </div>
      <div className="container px-8 pt-20 pb-24 mx-auto lg:px-4">
        <div
          className="flex flex-col w-full p-8 mx-auto mt-10 border rounded-lg lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">
          <div className="relative ">
            <input type="number" id="phone" name="phone" placeholder="Phone"
                   className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
          </div>
          <div className="relative ">
            <input type="password" id="password" name="password" placeholder="Password"
                   className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
          </div>
          {!isLoading ?<button onClick={login}
                               className="px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none">LOGIN
          </button> : <LoadingSpinner/>}
        </div>
      </div>
    </section>
);
}

export default LoginComponent;
