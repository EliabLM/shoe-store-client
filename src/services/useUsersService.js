import { axiosErrorAdapter } from 'adapters/axiosErrorAdapter';
import { useAxios } from 'hooks/useAxios';

export const useUsersService = () => {
  const axiosInstance = useAxios();

  // ######### POST #########
  const createUser = async ({ body }) => {
    try {
      const response = await axiosInstance.post('/users/create-user', body);

      const createUserAdapter = {
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data,
      };

      return createUserAdapter;
    } catch (error) {
      console.log('🚀 ~ createUser ~ error:', error);
      return axiosErrorAdapter(error);
    }
  };

  // ######### GET ##########
  const getUsers = async () => {
    try {
      const res = await axiosInstance.get('/users/get-users');

      const getUsersAdapter = {
        statusCode: res.data.statusCode,
        message: res.data.message,
        data: res.data.data,
      };

      return getUsersAdapter;
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  // ######### PUT ##########
  const deleteUser = async ({ user_id }) => {
    try {
      const params = { user_id };
      const res = await axiosInstance.put('/users/delete-user', null, { params });

      const deleteUserAdapter = {
        statusCode: res.data.statusCode,
        message: res.data.message,
        data: res.data.data,
      };

      return deleteUserAdapter;
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  return { createUser, getUsers, deleteUser };
};
