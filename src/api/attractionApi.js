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
  // 기본 params 설정
  const params = {
    keyword,
    sido,
    gugun,
    pageNo,
    pageCnt,
    order,
    sort,
  };

  // contentTypes 배열을 개별 contentType 파라미터로 추가
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
