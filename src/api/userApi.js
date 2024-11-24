import apiClient from './axiosInstance';

export const join = ({
  name, email, password
}) => {
  return apiClient.post(`/users/join`, {
    name, email, password
  });
};

export const login = ({
  email, password
}) => {
  return apiClient.post(`/users/login`, {
    email, password
  });
};

export const logout = () => {
  return apiClient.post(`/users/logout`);
};

export const withdrawal = () => {
  return apiClient.patch(`/users/delete`);
};

export const getMyDetail = () => {
  return apiClient.get(`/users/detail`);
};

export const modifyPassword = ({
  password,
  newPassword
}) => {
  return apiClient.patch(`/users/updatePwd`, {password, newPassword});
};
