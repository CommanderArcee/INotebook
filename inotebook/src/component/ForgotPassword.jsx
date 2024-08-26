import React, { useState } from 'react';
import useAlert from '../customhook/useAlert';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from './AlertMessage';
import { funcChangePassword } from '../redux/auth/page/PasswordChangeSlice';
import Otp from './Otp';


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const showAlert = useAlert();
  const validationAlertMsg = useSelector(state => state.ValidationAlert.alert);
  const dispatch = useDispatch();
  const otpData = useSelector(state => state.otp);
  let verifiedData = otpData?.verifyData;

  const forgotPassword = async (ev) => {
    ev.preventDefault();

    if (newPassword.length < 6) {
      showAlert({ type: "danger", message: "Your password length should be min 5" });
      return;
    }
    else if (newPassword !== confirmPassword) {
      showAlert({ type: "danger", message: "Password Not Matched" });
      return;
    }
    else {
      const result = await dispatch(funcChangePassword({ email, newPassword,  ...verifiedData }));
      let { SuccessMsg, ErrorMsg } = result.payload;

      if (result.type === 'Change_ForgotPassword/fulfilled') {
        showAlert({ type: "success", message: SuccessMsg });
      }
      else if (result.type === 'Change_ForgotPassword/rejected') {
        showAlert({ type: "danger", message: ErrorMsg });
      }
      else {
        alert("loading");
      }
    }
  } 

  return (
    <div className='col-md-6 offset-md-3 my-3 mt-5'>
      <form onSubmit={forgotPassword}>
        {localStorage.getItem("isChangePassword") === "1" ? <h2 className='mb-5 heading'>Change Password</h2> : <h2 className='mb-5 heading'>Forgot Password</h2>}
        <div className="mb-3 d-flex">
          <div className='col-md-4'>
            <label htmlFor="email" className="form-label labelTxt lh-5">Email</label>
          </div>
          <div className='col-md-8'>
            <input type="email" className="form-control" id="Email" aria-describedby="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>
        </div>
        {
          localStorage.getItem("isChangePassword") === "1" ? <></> : <Otp email={email} />
        }
        <div className="mb-3 d-flex">
          <div className='col-md-4'>
            <label htmlFor="newpassword" className="form-label labelTxt">New Password</label>
          </div>
          <div className='col-md-8'>
            <input type="password" className="form-control" id="newpassword" name='newpassword' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
          </div>
        </div>
        <div className="mb-3 d-flex">
          <div className='col-md-4'>
            <label htmlFor="confirmpassword" className="form-label labelTxt">Confirm Password</label>
          </div>
          <div className='col-md-8'>
            <input type="password" className="form-control" id="confirmpassword" name='confirmpassword' onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPassword} />
          </div>
        </div>
        <button type="submit" disabled={localStorage.getItem("isChangePassword") === "1" ? (!newPassword) : !(verifiedData?.Verify)} className="btn btn-primary">Submit</button>
      </form>
      <div className='errordiv'>
        {validationAlertMsg && <AlertMessage alert={validationAlertMsg.type} message={validationAlertMsg.message} />}
      </div>
    </div>
  )
}
