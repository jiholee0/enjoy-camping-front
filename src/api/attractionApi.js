// src/api/attractionApi.js
import apiClient from './axiosInstance';

export const getAttractions = (pageNo, pageCnt, order, sort) => {
  return apiClient.get('/attractions', {
    params: { pageNo, pageCnt, order, sort },
  });
};

export const getAttractionDetail = (index) => {
  return apiClient.get(`/attractions/${index}`, {
    params: {},
  });
};
