import React from "react";
// import Router from "./Router";
import Router from "./routes/Router";

import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return  <Router />
  
}

export default App;
