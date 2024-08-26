import {jwtDecode} from 'jwt-decode'

const isTokenExpired = (token) => {
    if(!token) return true;
    try{
        const decodeToken = jwtDecode(token);
        let currentTime = Math.floor(Date.now() / 1000);
        return decodeToken.exp < currentTime;
    }
    catch(err){
        console.log(err.message);
    }
}

export default isTokenExpired;