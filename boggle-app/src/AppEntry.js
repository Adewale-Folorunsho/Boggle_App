import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import App from './App';
import Application from './Application';


const AppEntry = () => {
    return (
         <Router>
             <Routes>
              <Route path="/" element={<App/>} />
              <Route path="/profile" element={<Application/>} />
            </Routes>
    </Router>
    );
}

export default AppEntry;