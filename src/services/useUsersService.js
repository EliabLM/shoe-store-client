import { useAxios } from 'hooks/useAxios';

export const useUsersService = () => {
  const axiosInstance = useAxios();

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
      console.error('🚀 ~ ERROR getUsers ~ error:', error);

      const getUsersAdapter = {
        statusCode: error.response.data.statusCode || 400,
        message: error.response.data.message || 'Ha ocurrido un error obteniendo los datos',
        data: null,
      };

      return getUsersAdapter;
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
      console.error('🚀 ~ deleteUser ~ error:', error);

      const deleteUserAdapter = {
        statusCode: error.response.data?.statusCode || error.response.status || 400,
        message:
          error.response.data?.message ||
          error.response.statusText ||
          'Ha ocurrido un error eliminando el usuario.',
        data: null,
      };

      return deleteUserAdapter;
    }
  };

  return { getUsers, deleteUser };
};
