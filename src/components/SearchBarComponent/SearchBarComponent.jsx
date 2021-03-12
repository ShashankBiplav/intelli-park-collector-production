import React ,{useState, useContext}from "react";
import Axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import UserContext from "../../context/UserContext";
import FetchedTicketComponent from "./FetchedTicketComponent";

function SearchBar() {
  const {user} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [activeTicket, setActiveTicket] = useState([]);
  let searchTerm = "";
  
  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if(name === "search"){
      searchTerm = value;
    }
  };
  
  const fetchTicket = async () => {
    setIsLoading(true);
    const url = "https://intelli-park.herokuapp.com/user/find-ticket";
    let res;
    if (searchTerm.length<4){
      console.log(searchTerm.length)
      console.log(searchTerm)
      alert('Invalid Vehicle number');
      return;
    }
    try {
      res = await Axios.post(url, {
        "vehicleNumber": searchTerm.toUpperCase()
        },{headers: {
          'content-type': 'application/json'
        }}
      );
      setActiveTicket(res.data.ticket);
      console.log(activeTicket._id);
      setIsLoading(false);
    } catch (err) {
      alert("Invalid Vehicle Number");
      setIsLoading(false);
    }
  }
  
  const endTicket = async( amount) => {
    setIsButtonLoading(true);
    const url = `https://intelli-park.herokuapp.com/ticket-collector/end-ticket/${activeTicket._id}`;
    let res;
    try {
      res = await Axios.put(url, {
          "amount":parseInt(amount)
        },{headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + user.token
          }}
      );
      console.log(res.data.message);
      setIsButtonLoading(false);
      setActiveTicket([]);
      alert('Ticket Ended');
    } catch (err) {
      alert(`ERROR! ${err.message}`);
      setIsButtonLoading(false);
    }
  };
return(
  <div className="pt-2 relative mx-auto text-gray-600">
    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
           type="search" id="search" name="search" placeholder="search" onChange={inputHandler}/>
    {isLoading ? <LoadingSpinner/> :<button type="submit" className="absolute right-0 top-0 mt-5 mr-4" onClick={fetchTicket}>
      <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
           version="1.1" id="Capa_1" x="0px" y="0px"
           viewBox="0 0 56.966 56.966" xmlSpace="preserve"
           width="512px" height="512px">
        <path
          d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
      </svg>
    </button>}
    {activeTicket.isActive ?<FetchedTicketComponent data={activeTicket} endTicket={endTicket} state={isButtonLoading}/>: <></>}
  </div>
);
}

export default SearchBar;
