import React, { useState} from "react";
import axios from "axios";
import jwt from "jsonwebtoken"
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'

function Activate({ match }){
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    // const [show, setShow] = useState(true);
    const [buttonText, setButtonText] = useState("Submit");

   
        let token1 = match.params.token;
        let {name1} = jwt.decode(token);
        if(token) {
            setToken(token1)
            setName(name1)
        }
  

      async  function handelSubmit(e){
            e.preventDefault();
             setButtonText("Submitting");
            
                 const registerData = {
                     token
                 };
                 await axios.post(`${process.env.REACT_APP_API}/account-activation`, registerData)
                 .then(res=>{
                    setButtonText("Submitted");
                    toast.success(res.data.message)
                 }) 
                 .catch(error=>{
                    setButtonText("Submit");
                    toast.error(error.response.data.errorMessage)

                 })
                 
            
           
        }
  
    return <div>
        <ToastContainer />

        <h1>Activate</h1>

        <form onSubmit={handelSubmit}>
        
        <h1 className="p-5 text-center "> Hey {name}, ready to actuvate your account? </h1>
        <button type="submit" className="btn btn-primary">{buttonText}</button>

        </form>

    </div>
}

export default Activate;
