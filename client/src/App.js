import React from 'react';
import './stylesheet/textElements.css';
import './stylesheet/formElements.css';
import './stylesheet/customComponents.css';
import './stylesheet/layout.css';
import './stylesheet/theme.css';
import './stylesheet/alignments.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Transactions from './pages/Transactions';
import Requests from './pages/Requests';
import Users from './pages/Users';


const AppRoutes = () => {
  return (
    <div>
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
      <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      
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

