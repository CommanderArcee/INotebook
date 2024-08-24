import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './component/Navbar';
import About from './component/About';
import NewNotes from './component/NewNotes';
import Login from './component/Login';
import Signup from './component/Signup';
import ForgotPassword from './component/ForgotPassword';
import isTokenExpired from './utils/CommonMethod';

// We use BrowserRouter in the index.js file and add main component because other component used inside the main that's why we call main inside the BrowserRouter and, we
// are able to use routing in whole application.
function App() {
  let navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {

      if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token');

        if (isTokenExpired(token)) {
          localStorage.removeItem('token');
          localStorage.removeItem('isChangePassword');
          navigate("/Login");
        }

      } else {
        navigate("/Login");
      }
    };

    checkToken(); // Call the function on every route change
  }, [navigate]); 

  return (
    <div className="App">
      <Navbar />
      <div className='container'>
        <div className='row my-3'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/About' element={<About />} />
            <Route exact path='/AddNote' element={<NewNotes />} />
            <Route exact path='/Login' element={<Login />} />
            <Route exact path='/Signup' element={<Signup/>} />
            <Route exact path='/Forgotpassword' element={<ForgotPassword/>} />
            <Route exact path='/ChangePassword' element={<ForgotPassword/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
