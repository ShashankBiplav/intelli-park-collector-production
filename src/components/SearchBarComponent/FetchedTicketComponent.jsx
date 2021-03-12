import React from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function FetchedTicketComponent (props) {
  const data = props.data;
  let amount = undefined;
  
  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if(name === "amt"){
      amount = value;
    }
  };
  
  function getDateTime(date) {
    let parsedDate = new Date(date);
    return [
      parsedDate.toLocaleString('default', {month: 'short'}) + ' ' + (parsedDate.getDate()) + ', ' + parsedDate.getFullYear() + '  |  ',
      parsedDate.getHours() + ':' + parsedDate.getMinutes()
    ];
  }
  
  return (
    <div className="container px-8  pt-6 mx-auto lg:px-4 ">
      <div className="flex flex-wrap items-center text-center text-white">
    <div className= "m-6 w-full  rounded-lg shadow-lg bg-green-300">
      <div className="p-6 object-cover object-center">
        <h2 className="mb-3 text-lg font-semibold text-gray-700 lg:text-2xl title-font"> {data.vehicleNumber}
        </h2>
        <h2 className="mb-3 text-lg font-semibold text-gray-700 lg:text-xl title-font">Advance: ₹ {(Math.round(data.amount *100)/100).toFixed(2)}
        </h2>
        <hr/>
        
        <p className="mb-4 text-base leading-relaxed">CREATED BY: {data.createdBy['name']}</p>
        <p className="mb-4 text-base leading-relaxed">TIME: {getDateTime(data.startingTime)}</p>
        {!data.isActive?<p className="mb-4 text-base leading-relaxed">ENDING TIME: <br/> {getDateTime(data.endingTime)}</p> : null}
        {data.isActive ?<div className="relative ">
          <input type="number" id="amt" name="amt" placeholder="AMOUNT"
                 value={amount} onChange={inputHandler}
                 className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
        </div>: <></>}
        {props.state?<LoadingSpinner/>:<button onClick={() => props.endTicket(amount)}
                 className={"px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none"}> END
          TICKET</button>}
      </div>
    </div>
      </div>
    </div>
  );
}

export default FetchedTicketComponent;
