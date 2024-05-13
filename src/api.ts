import axios from 'axios';

const apiPath = 'http://localhost:3000/api';

export const getApi = async <T>(resource: string) => {
  const response = await axios.get<T>(`${apiPath}/${resource}`);
  return response.data;
};

export const postApi = async <T>(resource: string, data?: T) => {
  const response = await axios.post<T>(`${apiPath}/${resource}`, data);
  return response.data;
};

export const patchApi = async <T>(resource: string, data: T) => {
  const response = await axios.patch<T>(`${apiPath}/${resource}`, data);
  return response.data;
};
