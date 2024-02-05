import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from "./App";

// require("dotenv").config();
const domEl = document.getElementById('root')
if (domEl) {
  const root = ReactDOM.createRoot(domEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.log("Could not find root element in HTML");
}