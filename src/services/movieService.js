import api from './apiService';

const apiEndpoint = '/movies';

export async function getMovies() {
  return await api.get(apiEndpoint);
}

export async function getMovie(id) {
  return await api.get(`${apiEndpoint}/${id}`);
}

export async function getMovieWithGenre(id) {
  return await api.get(`${apiEndpoint}/${id}/with/genre`);
}

export async function saveMovie(data) {
  if (data.id === 0) {
    return await api.post(`${apiEndpoint}/add`, data);
  } else {
    return await api.put(`${apiEndpoint}/${data.id}`, data);
  }
}

export async function setLike(id, like) {
  return await api.patch(
    `${apiEndpoint}/${id}/like`, {
      id: id,
      like: like
    }
  );
}

export async function deleteMovie(_id) {
  return await api.delete(`${apiEndpoint}/${_id}`, {
    data: {
      id: _id
    }
  });
}