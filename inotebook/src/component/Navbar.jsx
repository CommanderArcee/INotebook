import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearNoteData } from '../redux/slice/GetNotesSlice';

const Navbar = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const loggedInUserDetails = useSelector(state => state.loggedInUserDetail.userData);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isChangePassword');
    dispatch(clearNoteData());
    navigate("/Login");
  }

  const handleChangePassword = () => {
    localStorage.setItem("isChangePassword", 1);
  }

  return (
    <nav className="navbar navbar-expand-lg text-light bg-dark">
      <div className="container-fluid">
            <Link className="navbar-brand" to="/">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon">Menus</span>
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
                <form className="d-flex ms-auto">
                  <Link className="btn btn-primary mx-2" to={'/Login'} role='button'>Login</Link>
                  <Link className="btn btn-primary mx-2" to={'/Signup'} role='button'>Signup</Link>
                </form> :
                <div className='d-flex msauto'>
                  <div className="dropdown">
                    <i className="fa-regular fa-user dropdown-toggle mx-3" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><button className="dropdown-item" type="button">My Profile </button></li>
                      <li><Link className="dropdown-item" to='/ChangePassword' type="button" onClick={handleChangePassword}>Change Password </Link></li>
                      <li><button className="dropdown-item" type="button" onClick={handleLogout}>Logout </button></li>
                    </ul>
                  </div>
                  <span className='username-fontsize'>{loggedInUserDetails?.Name}</span>
                </div>
              }
            </div>
      </div>
    </nav>
  )
}

export default Navbar;
