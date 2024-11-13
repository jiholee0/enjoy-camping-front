// src/api/contentTypeApi.js
import apiClient from './axiosInstance';

export const getContentType = (index) => {
  return apiClient.get(`/contenttypes/${index}`, {
    params: {},
  });
};
