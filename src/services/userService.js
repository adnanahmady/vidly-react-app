import api from './apiService';

const apiEndpoint = '/users/register';

export const register = async data => {
  return await api.post(apiEndpoint, data);
}