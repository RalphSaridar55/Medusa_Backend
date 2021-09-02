import axios from 'axios';
import base64 from 'react-native-base64'
import * as SecureStore from 'expo-secure-store';
// Create axios client, pre-configured with baseURL
const username = "cashmystock"
const password = "cashmystock@123"



let APIKit = axios.create({
  baseURL: 'https://ecomstgapi.appskeeper.in/cashmystock/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    language: 'en',
    platform: '3',
    timezone: '+3',
    Authorization: 'Basic ' + base64.encode(username + ":" + password)
  }
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
  APIKit.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export const setToken = (token) => {
  return SecureStore.setItemAsync('secure_token', token);
};

export const getToken = () => {
  return SecureStore.getItemAsync('secure_token');
};

export const isUserLoggedIn = () => {
  let user = getToken()
  if (user === null) return false
  else {
    return true;
  }
}

export const logout = () => {
  SecureStore.deleteItemAsync('secure_token')
  alert("logout")
}

export const login = async (userInfo) => {
  return await APIKit.post('/user/forgot-password-details', '/user/login', userInfo).then((res) => {
    return res.data.data;
  });
}

export const verifyEmail = async (owner_email) => {
  return await APIKit.post('/user/forgot-password-details', { owner_email }).then((res) => {
    return res.data.data;
  });
}

export const sendOtp = async (usernfo) => {
  return await APIKit.post('/user/forgot-password', usernfo).then((res) => {
    return res.data;
  }).catch((error) => {
    console.error(error.response);
    setAuthorized(false);
    setLoading(false)
  });
}

export const sendEmailLink = async () => {
  return await APIKit.get('/user/deepLink').then((res) => {
    return res.data.data;
  })
}

export const verifyOtp = async (userOtpAndMobile) => {
  return await APIKit.get(
    '/user/verify-forgot-otp?' + 'otp=' + userOtpAndMobile.otp + '&' + 'owner_mobile_number=' + userOtpAndMobile.owner_mobile_number
  )
    .then((res) => {
      return res.data.statusCode;
    })
    .catch((error) => {
      return error.response;
    })
}

export default APIKit;