import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearDataErrorMsg, clearVerifyDataErrorMsg, funcVerifyOtp, otpSendMail } from '../redux/auth/page/OtpSlice';

export default function Otp(props) {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const otpData = useSelector(state => state.otp);
    let verifiedData = otpData?.verifyData;

    const sendOtp = (event) => {
        event.preventDefault();
        dispatch(otpSendMail({ userEmail: props.email }));
    }

    const VerifyOtp = (event) => {
        event.preventDefault();
        const date = new Date();
        const nowUTCDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        const currentDateOtp = new Date(nowUTCDate).toUTCString();
        dispatch(funcVerifyOtp({ userEmail: props.email, userEnteredOtp: otp, currentDateTimeOfOtp: currentDateOtp }));
        if (verifiedData?.Verify === 1) {
            alert("Otp Verified");
        }
    }

    useEffect(() => {
        if (otpData.data?.ErrorMsg != null) {
            setTimeout(() => {
                dispatch(clearDataErrorMsg());
            }, 1000)
        }
        else if(otpData.data?.msg != null){
            setTimeout(() => {
                dispatch(clearDataErrorMsg());
            }, 1000)
        }
        if (otpData.verifyData?.ErrorMsg != null) {
            setTimeout(() => {
                dispatch(clearVerifyDataErrorMsg());
            }, 1000)
        }
    }, [otpData.data?.ErrorMsg, otpData.data?.msg, otpData.verifyData?.ErrorMsg])

    return (
        <>
            <form>
                <div className="mb-3 d-flex">
                    <div className='col-md-4'>
                        <label htmlFor="otp" className="form-label labelTxt">OTP</label>
                    </div>
                    <div className='col-md-8'>
                        <input type="text" className="form-control" id="otp" name='otp' onChange={(e) => setOtp(e.target.value)} value={otp} />
                    </div>
                </div>
                {otpData?.data?.ErrorMsg &&
                    <div id="divErrorMsg" className="col-md-5 offset-md-4 form-text text-white mb-4 fs-5 font-family-cursive bg-red">
                        <strong>
                            {otpData?.data?.ErrorMsg}
                        </strong>
                    </div>
                }
                {otpData?.data?.msg &&
                    <div id="divSentMailMsg" className="col-md-6 offset-md-4 form-text text-white mb-4 fs-5 font-family-cursive bg-green">
                        <strong>
                            {otpData?.data?.msg}
                        </strong>
                    </div>
                }
                {otpData.verifyData?.ErrorMsg &&
                    <div id="divErrorMsg" className="col-md-5 offset-md-4 form-text text-white mb-3 fs-5 font-family-cursive bg-red">
                        <strong>
                            {otpData.verifyData.ErrorMsg}
                        </strong>
                    </div>
                }
                <div className="mb-3 d-flex">
                    <div className='col-md-12 offset-md-4 d-flex'>
                        <button type='button' onClick={sendOtp} className="btn btn-primary mx-3">Send Otp</button>
                        <button type='button' onClick={sendOtp} className="btn btn-primary mx-3">Resend Otp</button>
                        <button type='button' onClick={VerifyOtp} className="btn btn-primary mx-3">Verify Otp</button>
                    </div>
                </div>
            </form>
        </>
    )
}
