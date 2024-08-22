const baseUrl = process.env.REACT_APP_API_URl;

const api = {
    getLoggedInUserDetails : `${baseUrl}/auth/getuser`
}

module.exports = api;
