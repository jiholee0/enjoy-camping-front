// src/api/campsiteApi.js
import apiClient from './axiosInstance';

export const getCampsiteDetail = (index) => {
  return apiClient.get(`/campings/${index}`, {
    params: {},
  });
};

export const getCampsites = ({
  keyword,
  sido,
  gugun,
  pageNo,
  pageCnt,
  order,
  sort
}) => {
  return apiClient.get('/campings', {
    params: { keyword, sido, gugun, pageNo, pageCnt, order, sort },
  });
}

export const getNearByAttraction = (index, pageNo, pageCnt, order, sort) => {
  return apiClient.get(`/campings/attractions/${index}`, {
    params: { pageNo, pageCnt, order, sort },
  });
}
