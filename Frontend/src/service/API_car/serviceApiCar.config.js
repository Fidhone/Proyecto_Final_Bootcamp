import axios from 'axios';

import { updateToken } from '../../utils/updateToken';

const APIHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Authorization: `Bearer ${updateToken()}`,
};

export const APIcar = axios.create({
  baseURL: `http://localhost:8080/api/v1/cars`,
  headers: APIHeaders,
  timeout: 600000,
});
