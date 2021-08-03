import axios from 'axios';

const BACKEND_URL = 'https://7.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const HttpCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_UNAVAILABLE: 503,
};

const token = localStorage.getItem('token') ?? '';

export const createAPI = (onError) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'x-token': token,
    },
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response = {}} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onError.onUnauthorized();
    } else if (response.status === HttpCode.NOT_FOUND) {
      onError.onNotFound();
    } else if (response.status === HttpCode.SERVER_UNAVAILABLE) {
      onError.onServerUnavailable();
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
