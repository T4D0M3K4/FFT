import React from "react";
import {Routes, Route} from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import Transactions from './Pages/Transactions/Transactions';
import Bills from './Pages/Bills/Bills';
import Budgets from './Pages/Budgets/Budgets';
import Categories from './Pages/Categories/Categories';
import BillUploadForm from './Pages/BillUploadForm/BillUploadForm';
import Profile from './Pages/Profile/Profile';
import ProtectedRoute from './Auth/ProtectedRoute/ProtectedRoute';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter } from "react-router-dom";
import Users from "./Pages/Users/Users";

function App() {

  return (
    <>
      
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/transactions" element={<ProtectedRoute role='Regular'><Transactions/></ProtectedRoute>}/>
        <Route path="/bills" element={<ProtectedRoute role='Regular'><Bills/></ProtectedRoute>}/>
        <Route path="/bills/upload" element={<ProtectedRoute role='Admin'><BillUploadForm/></ProtectedRoute>}/>
        <Route path="/budgets" element={<ProtectedRoute role='Regular'><Budgets/></ProtectedRoute>}/>
        <Route path="/categories" element={<ProtectedRoute role='Admin'><Categories/></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute role='Regular'><Profile/></ProtectedRoute>}/>
        <Route path="/users" element={<ProtectedRoute role='Admin'><Users/></ProtectedRoute>}/>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
