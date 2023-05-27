import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {BrowserRouter} from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <GoogleOAuthProvider clientId='971766812836-re275ffnj3jnf9gcefunt2tavn29on7q.apps.googleusercontent.com'>
    <BrowserRouter>
      <App />
    </BrowserRouter>
   </GoogleOAuthProvider>
  </React.StrictMode>
);
