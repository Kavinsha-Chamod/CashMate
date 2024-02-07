import React from 'react';
import './stylesheet/textElements.css';
import './stylesheet/formElements.css';
import './stylesheet/customComponents.css';
import './stylesheet/theme.css';
import './stylesheet/alignments.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

const AppRoutes = () => {
  return (
    <div>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      
    </Routes>
    </div>
    
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

