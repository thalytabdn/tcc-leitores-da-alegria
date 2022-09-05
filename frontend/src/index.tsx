import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/styles/global.css";
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { SessionContextProvider } from './contexts/SessionContext';
import {  HashRouter } from 'react-router-dom';
import '@fontsource/roboto';


ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <SessionContextProvider>
        <App />
      </SessionContextProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
