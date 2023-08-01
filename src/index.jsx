import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {BrowserRouter} from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <GoogleOAuthProvider clientId='973842215309-addjgu3q118nr49n5flqboagti628ji6.apps.googleusercontent.com'>
    <BrowserRouter>
      <App />
    </BrowserRouter>
   </GoogleOAuthProvider>
);
