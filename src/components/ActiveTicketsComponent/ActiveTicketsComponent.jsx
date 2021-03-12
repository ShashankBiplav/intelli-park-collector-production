import React,{useState, useEffect, useContext} from "react";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import ActiveTicketComponent from "./ActiveTicketComponent";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SearchBar from "../SearchBarComponent/SearchBarComponent";

function ActiveTicketsComponent() {
  const {user} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTickets, setActiveTickets] = useState({});
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  
  const nextPage = () => {
    if (skip > total) return;
    setSkip(skip + 20);
  };
  
  const previousPage = () => {
    if(skip <=0) return;
    setSkip(skip - 20);
  };
  
  useEffect(() => {
    const fetchActiveTickets = async () => {
      const url = "https://intelli-park.herokuapp.com/ticket-collector/active-tickets";
      let res;
      try {
        res = await Axios.post(url, {
          "skip" : skip,
          "limit": 20
          },{headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + user.token
          }}
        );
        console.log(res.data);
        setActiveTickets(res.data);
        setTotal(res.data.total);
        setIsLoading(false);
      } catch (err) {
        alert(`Unable to fetch ${err.message}`);
        setIsLoading((isLoading) => !isLoading);
      }
    }
    fetchActiveTickets();
  }, [skip, user.token]);
  
  const endTicket = async(ticketId, amount) => {
    setIsLoading(true);
    const url = `https://intelli-park.herokuapp.com/ticket-collector/end-ticket/${ticketId}`;
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
      const ticketIndex=activeTickets.parkingTickets.findIndex(ticket=> ticket['id'] === ticketId)
      activeTickets.parkingTickets.splice(ticketIndex, 1);
      setIsLoading(false);
    } catch (err) {
      alert(`ERROR! ${err.message}`);
      setIsLoading(false);
    }
  };
  
  
  return(
    <>
          <SearchBar />
      {isLoading? <LoadingSpinner/>
        : <div>
          <div className="container px-8  pt-6 mx-auto lg:px-4 ">
            <div className="flex flex-wrap items-center text-center text-white">
              {activeTickets.parkingTickets.map((parkingTicket, index)=><ActiveTicketComponent key={parkingTicket['_id']}  data={activeTickets.parkingTickets[index]} endActiveTicket={endTicket}/>)}
            </div>
          </div>
          <div className="flex mx-auto">
            <button className="border border-teal-500 text-teal-500 block rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:bg-teal-500 hover:text-white" onClick={nextPage}>
              <svg className="h-5 w-5 mr-2 fill-current" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                   x="0px" y="0px" viewBox="-49 141 512 512"
              >
                <path id="XMLID_10_"
                      d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"></path>
              </svg>
              </button>
            <button className="border border-teal-500 bg-teal-500 text-white block rounded-sm font-bold py-4 px-6 ml-2 flex items-center" onClick={previousPage}>
              <svg className="h-5 w-5 ml-2 fill-current" clasversion="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                   x="0px" y="0px"
                   viewBox="-49 141 512 512">
                <path id="XMLID_11_" d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
            l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
            c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"/>
              </svg>
            </button>
          </div>
        </div>}
    </>
  );
}

export default ActiveTicketsComponent;
