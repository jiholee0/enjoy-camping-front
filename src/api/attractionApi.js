// src/api/attractionApi.js
import apiClient from './axiosInstance';
import qs from 'qs';

export const getAttractions = ({
  keyword,
  sido,
  gugun,
  contentTypes,
  pageNo,
  pageCnt,
  order,
  sort
}) => {
  const params = {
    keyword,
    sido,
    gugun,
    pageNo,
    pageCnt,
    order,
    sort,
  };

if (contentTypes) {
  params['contentType'] = contentTypes;
}

return apiClient.get('/attractions', {
  params,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});
};

export const getAttractionDetail = (index) => {
  return apiClient.get(`/attractions/${index}`, {
    params: {},
  });
};

export const getNearByCampsite = (index, pageNo, pageCnt, order, sort) => {
  return apiClient.get(`/attractions/campings/${index}`, {
    params: { pageNo, pageCnt, order, sort },
  });
}
