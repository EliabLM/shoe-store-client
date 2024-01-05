import { axiosErrorAdapter } from 'adapters/axiosErrorAdapter';
import { useAxios } from 'hooks/useAxios';

export const useBrandsService = () => {
  const axiosInstance = useAxios();

  const createBrand = async ({ body }) => {
    try {
      const response = await axiosInstance.post('/brands/create-brand', body);

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

  const getBrands = async () => {
    try {
      const response = await axiosInstance.get('/brands/get-brands');

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

  const updateBrand = async ({ body }) => {
    try {
      const response = await axiosInstance.put('/brands/update-brand', body);

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

  const deleteBrand = async ({ brandId }) => {
    try {
      const params = { brand_id: brandId };
      const response = await axiosInstance.delete('/brands/delete-brand', { params });

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

  return { createBrand, getBrands, updateBrand, deleteBrand };
};
