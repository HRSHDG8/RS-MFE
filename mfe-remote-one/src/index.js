import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/TestimonialForm'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App onSubmit={async (...e)=>console.log(e)}/>
  </React.StrictMode>
);