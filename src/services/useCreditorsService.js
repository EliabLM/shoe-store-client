import { axiosErrorAdapter } from 'adapters/axiosErrorAdapter';
import { useAxios } from 'hooks/useAxios';

export const useCreditorsService = () => {
  const axiosInstance = useAxios();

  // ######### POST #########
  const createCreditor = async ({ body }) => {
    try {
      const response = await axiosInstance.post('/creditors/create-creditor', body);

      const createCreditorAdapter = {
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data,
      };

      return createCreditorAdapter;
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  // ######### GET ##########
  const getCreditors = async () => {
    try {
      const res = await axiosInstance.get('/creditors/get-creditors');

      const getCreditorsAdapter = {
        statusCode: res.data.statusCode,
        message: res.data.message,
        data: res.data.data,
      };

      return getCreditorsAdapter;
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  // ######### PUT ##########
  const deleteCreditor = async ({ creditor_id }) => {
    try {
      const params = { creditor_id };
      const res = await axiosInstance.put('/creditors/delete-creditor', null, { params });

      const deleteCreditorAdapter = {
        statusCode: res.data.statusCode,
        message: res.data.message,
        data: res.data.data,
      };

      return deleteCreditorAdapter;
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  const updateCreditor = async ({ body }) => {
    try {
      const res = await axiosInstance.put('/creditors/update-creditor', body);

      const updateCreditorAdapter = {
        statusCode: res.data.statusCode,
        message: res.data.message,
        data: res.data.data,
      };

      return updateCreditorAdapter;
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  return {
    createCreditor,
    getCreditors,
    deleteCreditor,
    updateCreditor,
  };
};
