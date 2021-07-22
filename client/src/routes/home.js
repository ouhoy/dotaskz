import React from "react";
import { isAuth } from "./auth";
import HomePage from "./homePage";
import Task from "./task";

 

function home() {
    return <div> 

    {isAuth()?  <Task/> : <HomePage /> }

     </div>

}

export default home;