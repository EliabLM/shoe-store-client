import { axiosErrorAdapter } from 'adapters/axiosErrorAdapter';
import { useAxios } from 'hooks/useAxios';

export const useSalesService = () => {
  const axiosInstance = useAxios();

  const createSale = async ({ body }) => {
    try {
      const response = await axiosInstance.post('/sales/create-sale', body);

      return {
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  const getAllSales = async ({ sale_status, sale_location, user_id, customer_id }) => {
    try {
      const params = { sale_status, user_id, customer_id, sale_location };
      const response = await axiosInstance.get('/sales/get-sales', { params });

      return {
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  const getSalesByUser = async ({ sale_status, user_id }) => {
    try {
      const params = { sale_status, user_id };
      const response = await axiosInstance.get('/sales/get-sales-by-user', { params });

      return {
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  return { createSale, getAllSales, getSalesByUser };
};
