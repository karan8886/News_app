/* import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import  "./index.css"


ReactDOM.render(<div><App /><p className = "card">"starting"</p></div>, document.getElementById("root"));
*/

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);

//reportWebVitals();
