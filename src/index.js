/* global chrome */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Notes from "./notes/notes.js"
import Logo from "./logo/logo.js"
import Timer from "./timer/timer.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div id="app-container">
    <Logo></Logo>
    <Timer></Timer>
    <Notes></Notes>
  </div>
);
