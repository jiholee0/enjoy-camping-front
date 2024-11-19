import apiClient from './axiosInstance';

const getPresignedUrl = (fileName) => {
  return apiClient.get(`/reviews/images/presignedUrl`, {
    params: {
      fileName: fileName,
    },
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

export { getPresignedUrl, uploadImageToS3, submitReview };
