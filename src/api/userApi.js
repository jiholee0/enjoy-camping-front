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

// const logout = () => {
//   return apiClient.post(`/users/logout`);
// };

// const withdrawal = () => {
//   return apiClient.patch(`/users/delete`);
// };
