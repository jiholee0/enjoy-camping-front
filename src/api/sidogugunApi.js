// src/api/sidogugunApi.js
import apiClient from './axiosInstance';

const getSidos = () => {
  return apiClient.get('/sidoguguns/sidos', {
    params: {}
  });
};

const getGuguns = (sidoCode) => {
  return apiClient.get(`/sidoguguns/sidos/${sidoCode}/guguns`, {
    params: {}
  });
};

const getSido = (index) => {
  return apiClient.get(`/sidoguguns/sidos/${index}`, {
    params: {}
  });
};

const getGugun = (sidoCode, index) => {
  return apiClient.get(`/sidoguguns/sidos/${sidoCode}/guguns/${index}`, {
    params: {}
  });
};

export {getSidos, getGuguns, getSido, getGugun};
