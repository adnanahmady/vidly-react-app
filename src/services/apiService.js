import axios from 'axios';
import logger from './logService';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
  const condition =
  error.response &&
  error.response.status >= 400 &&
  error.response.status < 500;
  
  if (!condition) {
    logger.log(error);
  }
  
  return Promise.reject(error);
});

export const setJwt = (jwt) => {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt
}