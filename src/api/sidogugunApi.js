// src/api/sidogugunApi.js
import apiClient from './axiosInstance';

export const getSidos = () => {
  return apiClient.get('/sidoguguns/sidos', {
    params: {}
  });
};

export const getGuguns = (sidoCode) => {
  return apiClient.get(`/sidoguguns/guguns/${sidoCode}`, {
    params: {}
  });
};
