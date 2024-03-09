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

  const getAllSales = async ({ sale_status }) => {
    try {
      const params = { sale_status };
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

  return { createSale, getAllSales };
};
