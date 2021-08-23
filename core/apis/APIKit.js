import axios from 'axios';
import base64 from 'react-native-base64'

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


export default APIKit;