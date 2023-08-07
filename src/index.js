import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./Pages/Sign-in/styles.css";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <MainRoutes />
        </BrowserRouter>
    </React.StrictMode>
);
