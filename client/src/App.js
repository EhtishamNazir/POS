import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Button } from 'antd';
import Homepage from './pages/Homepage';
import Items from './pages/Items';
import CartPage from './pages/CartPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Bills from './pages/Bills';
import Custommers from './pages/Customers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Homepage /></ProtectedRoute>}></Route>
          <Route path='/items' element={<ProtectedRoute><Items /></ProtectedRoute>}></Route>
          <Route path='/cart' element={<ProtectedRoute><CartPage /></ProtectedRoute>}></Route>
          <Route path='/bills' element={<ProtectedRoute><Bills /></ProtectedRoute>}></Route>
          <Route path='/customers' element={<ProtectedRoute><Custommers /></ProtectedRoute>}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


export function ProtectedRoute({ children }) {
  if (localStorage.getItem('pos-user')) {
    return children;
  } else {
    return <Navigate to='/login' />
  }
}
