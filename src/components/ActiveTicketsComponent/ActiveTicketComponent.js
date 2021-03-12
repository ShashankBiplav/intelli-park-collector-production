import React from "react";

function ActiveTicketComponent (props) {
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
    <div className= {"m-6 w-full lg:w-1/5  rounded-lg shadow-lg bg-green-300"}>
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
          <button onClick={() =>  props.endActiveTicket(data._id, amount)}
                   className={"px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none"}> END TICKET</button>
      </div>
    </div>
  );
}

export default ActiveTicketComponent;
