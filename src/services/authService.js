import jwtDecode from 'jwt-decode';
import api from './apiService';

const apiEndpoint = '/users';
const tokenKey = 'token';


export const login = async data => {
  const { data: result } = await api.post(`${apiEndpoint}/login`, data);
  loginWithJwt(result.token);
}

export const logout = () => {
  localStorage.removeItem(tokenKey);
}

export const loginWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
}

export const getCurrentUser = () => {
  try {
    const jwt = getJwt();
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export const getJwt = () => {
  return localStorage.getItem(tokenKey);
}

api.setJwt(getJwt());

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
}