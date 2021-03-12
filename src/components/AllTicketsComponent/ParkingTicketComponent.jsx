import React from "react";


function ParkingTicketComponent(props) {
const data = props.data;

  function getDateTime(date) {
    let parsedDate = new Date(date);
    return [
      parsedDate.toLocaleString('default', {month: 'short'}) + ' ' + (parsedDate.getDate()) + ', ' + parsedDate.getFullYear() + '  |  ',
      parsedDate.getHours() + ':' + parsedDate.getMinutes()
    ];
  }
  
    return (
      <div className={`m-6 w-full lg:w-1/5  rounded-lg shadow-lg ${data.isActive ? "bg-green-300" : "bg-blue-200"}`}>
        <div className="p-6 object-cover object-center">
          <h2 className="mb-3 text-lg font-semibold text-gray-700 lg:text-2xl title-font"> {data.vehicleNumber}
          </h2>
          <h2
            className="mb-3 text-lg font-semibold text-gray-700 lg:text-xl title-font">ADVANCE : ₹ {(Math.round(data.amount * 100) / 100).toFixed(2)}
          </h2>
          <hr/>
          <p className="mb-4 text-base leading-relaxed">STARTING TIME:{getDateTime(data.startingTime)}</p>
          {!data.isActive ?
            <><p className="mb-4 text-base leading-relaxed">ENDING TIME: {getDateTime(data.endingTime)}</p>
            <p className="mb-4 text-xl font-bold leading-relaxed text-green-900">FINAL AMOUNT:  {data.finalAmount}</p>
            </>: null}
        </div>
      </div>
    );
}

export default ParkingTicketComponent;


