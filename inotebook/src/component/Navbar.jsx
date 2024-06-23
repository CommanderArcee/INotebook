import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearNoteData } from '../redux/slice/GetNotesSlice';

const Navbar = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearNoteData());
    navigate("/Login");
  }

  return (
    <nav className="navbar navbar-expand-lg text-light bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">About</Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ?  
            <form className="d-flex">
            <Link className="btn btn-primary mx-2" to={'/Login'} role='button'>Login</Link>
            <Link className="btn btn-primary mx-2" to={'/Signup'} role='button'>Signup</Link>
          </form> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
