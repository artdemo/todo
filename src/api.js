// import axios from 'axios';
import axios from './fakeAxios/fakeAxios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
