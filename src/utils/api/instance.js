import axios from 'axios';
import qs from 'query-string';

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  paramsSerializer: (params) => qs.stringify(params),
});
