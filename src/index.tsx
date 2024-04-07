import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {router} from "./router";
import {RouterProvider} from "react-router-dom";
import Main from "./layout";

import './styles/globals.css'
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Main>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <RouterProvider router={router}/>
    </LocalizationProvider>
  </Main>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
