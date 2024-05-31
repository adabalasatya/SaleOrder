import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [salesData, setSalesData] = useState([]); // Add state for sales data

  const updateSalesData = (newSale) => {
    setSalesData(prevSalesData => [...prevSalesData, newSale]); // Update sales data state
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
      <Route
        path="/"
        element={isAuthenticated ? <HomePage salesData={salesData} updateSalesData={updateSalesData} /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
