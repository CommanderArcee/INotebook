import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './component/Home';
import Navbar from './component/Navbar';
import About from './component/About';

// We use BrowserRouter in the index.js file and add main component because other component used inside the main that's why we call main inside the BrowserROuter and, we
// are able to use routing in whole application.
function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='row my-3'>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
