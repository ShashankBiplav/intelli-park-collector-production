
import React, {useContext, useRef} from 'react';
import UserContext from "../../context/UserContext";
import ReactToPrint from "react-to-print";
import {Redirect} from "react-router-dom";

function PrintableComponent() {
  const {user, setUser} = useContext(UserContext);
  const componentRef = useRef();
  
  const donePrinting = () =>{
    setUser({
      ...user,
      vehicleNumber: "",
      amount: 0,
      printing: false
    });
  };
  
  return (
    <div className="mx-auto mt-2 mb-4">
      {user.printing === false ? <Redirect to='/new-ticket' />: null}
      <ReactToPrint trigger={() => <button className="mx-auto mb-4 px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-amber-700 hover:from-amber-600 to-amber-600 hover:to-amber-700 focus:ring focus:outline-none">PRINT</button>}
                    content={() => componentRef.current}
      />
      <div  ref={componentRef}>
        <h1 className="font-extrabold text-sm">VN:{user.vehicleNumber.toUpperCase()}</h1>
        <h1 className="font-extrabold text-sm">Adv:{user.amount}</h1>
        <h1 className="font-extrabold text-sm">{user.companyName}</h1>
        <h1 className="font-extrabold text-sm">{user.gst}</h1>
      </div>
        <button onClick={donePrinting} className="mx-auto mb-4 px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-green-700 hover:from-green-600 to-green-600 hover:to-green-700 focus:ring focus:outline-none">DONE</button>
    </div>
  );
}

export default PrintableComponent;
