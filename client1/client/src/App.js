import './App.css';
import axios from './axios';
import { useEffect, useState } from 'react';
import Form from './components/Form';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Data from './components/Data';

function App() {
  
  return (
    <div className="full-site">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Data/>} />
          <Route path='/users/signup' element={<Signup />} />
          <Route path='/users/login' element={<Login />} />
          <Route path='/books/post' element={<Form />} />
        </Routes>
        
      </BrowserRouter>
      
    </div>
 
  );
}

export default App;
