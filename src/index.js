/* global chrome */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Notes from "./notes/notes.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Notes></Notes>
  </div>
);
