import apiClient from './axiosInstance';

const createPresignedUrl = (fileName, contentType = "image/jpeg") => {
  return apiClient.post(`/reviews/images/presignedUrl`, {
    fileName,
    contentType,
  });
};

const uploadImageToS3 = (presignedUrl, imageFile) => {
  return apiClient.put(presignedUrl, imageFile, {
    headers: {
      'Content-Type': imageFile.type,
    },
  });
};

const submitReview = (reviewData) => {
  return apiClient.post(`/reviews`, reviewData);
};

const getReviewDetail = (index) => {
  return apiClient.get(`/reviews/${index}`);
};

const getReviewByCampsite = (index) => {
  return apiClient.get(`/reviews/campings/${index}`);
};

export { createPresignedUrl, uploadImageToS3, submitReview, getReviewDetail, getReviewByCampsite };
