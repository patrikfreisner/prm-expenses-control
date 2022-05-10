import axios from 'axios';
import CognitoService from '../../assets/js/cognito-service';
import UserLoginService from '../../assets/js/user-login-service';
// const axios = require('axios');

const API_BASE_URL = "https://n1ecug9pmk.execute-api.us-east-1.amazonaws.com/V1";
// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
const primumAxiosInterception = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, 
    // headers: { 'api-key': 'eyJz-CI6Ikp-4pWY-lhdCI6' }
});

// Step-2: Create request, response & error handlers
const requestHandler = (request: any) => {
    // Token will be dynamic so we can use any app-specific way to always   
    // fetch the new token before making the call
    var c = new CognitoService();
    var token = c.getAuthToken();
    request.headers.Authorization = token;
  
    return request;
};

// const responseHandler = (response: any) => {
//     if (response.status === 401) {
//         window.location = '/login';
//     }

//     return response;
// };

const errorHandler = (error: any) => {
    return Promise.reject(error);
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
primumAxiosInterception.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

// primumAxiosInterception.interceptors.response.use(
//     (response) => responseHandler(response),
//     (error) => errorHandler(error)
//  );


// Step-4: Export the newly created Axios instance to be used in different locations.
export default primumAxiosInterception;