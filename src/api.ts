import axios from 'axios';

const apiPath = 'http://localhost:3000/api';

export const getApi = (resource: string) => axios(`${apiPath}/${resource}`);

export const postApi = (resource: string, data?: any) =>
  axios.post(`${apiPath}/${resource}`, data);

export const patchApi = (resource: string, data: any) =>
  axios.patch(`${apiPath}/${resource}`, data);
