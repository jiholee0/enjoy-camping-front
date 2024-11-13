// src/api/campsiteApi.js
import apiClient from './axiosInstance';

export const getCampings = (pageNo = 1, pageCnt = 9, order = 'name', sort = 'asc') => {
  return apiClient.get('/campings', {
    params: { pageNo, pageCnt, order, sort },
  });
};
