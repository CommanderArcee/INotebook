import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../redux/auth/page/signupSlice';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitSignUpDetails = async (e) => {
    e.preventDefault();
    const matchPassword = password === confirmPassword;
    if (!matchPassword) {
      alert("Password not matched");
      return;
    }
    const signupData = await dispatch(signupUser({ name: username, email, password }));
    if (signupData.type === 'signupAPi/fulfilled') {
      const {authToken , ErrorMsg} = signupData.payload;
      if (authToken) {
        localStorage.setItem('token', authToken);
        navigate("/Login");
      }
      else if (ErrorMsg) {
        //setAuthError(result.payload.ErrorMsg);
        alert(ErrorMsg);
      }
      else {
        //setAuthError("Login failed");
        alert("login failrd")
      }
    }

  }

  return (
    <div className='col-md-6 offset-md-3 my-3 mt-5'>
      <form onSubmit={submitSignUpDetails}>
        <h1 className='heading mb-5'>Sign Up</h1>
        <div className="mb-3 text-start">
          <label htmlFor="username" className="form-label">User Name</label>
          <input type="text" className="form-control" id="username" onChange={(ev) => setUername(ev.target.value)} value={username} required />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={(ev) => setEmail(ev.target.value)} value={email} required />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={(ev) => setPassword(ev.target.value)} value={password} minLength={5} required />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={(ev) => setConfirmPassword(ev.target.value)} value={confirmPassword} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
