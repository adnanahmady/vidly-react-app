import api from './apiService';

const apiEndpoint = '/genres';

export async function getGenres() {
  return await api.get(apiEndpoint);
}