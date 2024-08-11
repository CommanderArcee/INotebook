import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './component/Home';
import Navbar from './component/Navbar';
import About from './component/About';
import NewNotes from './component/NewNotes';
import Login from './component/Login';
import Signup from './component/Signup';
import ForgotPassword from './component/ForgotPassword';

// We use BrowserRouter in the index.js file and add main component because other component used inside the main that's why we call main inside the BrowserRouter and, we
// are able to use routing in whole application.
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='container'>
        <div className='row my-3'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/About' element={<About />} />
            <Route exact path='/AddNote' element={<NewNotes />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup/>} />
            <Route exact path='/Forgotpassword' element={<ForgotPassword/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
