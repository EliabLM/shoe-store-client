import { axiosErrorAdapter } from 'adapters/axiosErrorAdapter';
import { useAxios } from 'hooks/useAxios';

export const usePaymentMethodsService = () => {
  const axiosInstance = useAxios();

  const createPaymentMethod = async ({ body }) => {
    try {
      const response = await axiosInstance.post('/payment-methods/create-payment-method', body);

      const res = {
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data,
      };

      return res;
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  const getPaymentMethods = async ({ active }) => {
    try {
      const params = { active };
      const response = await axiosInstance.get('/payment-methods/get-payment-methods', { params });

      const res = {
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data,
      };

      return res;
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  const updatePaymentMethod = async ({ body }) => {
    try {
      const response = await axiosInstance.put('/payment-methods/update-payment-method', body);

      const res = {
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data,
      };

      return res;
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  const deletePaymentMethod = async ({ paymentMethodId }) => {
    try {
      const params = { payment_method_id: paymentMethodId };
      const response = await axiosInstance.delete('/payment-methods/delete-payment-method', {
        params,
      });

      const res = {
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data,
      };

      return res;
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  return { createPaymentMethod, getPaymentMethods, updatePaymentMethod, deletePaymentMethod };
};
