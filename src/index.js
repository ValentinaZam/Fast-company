import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./app/App";

const root = ReactDOMClient.createRoot(document.getElementById("root"));
// root.render(<App />);

root.render(
    <>
        <App />
    </>
);

// ReactDOMClient.createRoot(
//   document.getElementById("root"),
//   <>
//     <App />
//   </>
// );
reportWebVitals();
