import { axiosErrorAdapter } from 'adapters/axiosErrorAdapter';
import { useAxios } from 'hooks/useAxios';

export const useCategoriesService = () => {
  const axiosInstance = useAxios();

  const createCategory = async ({ body }) => {
    try {
      const response = await axiosInstance.post('/categories/create-category', body);

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

  const getCategories = async ({ active }) => {
    try {
      const params = { active };
      const response = await axiosInstance.get('/categories/get-categories', { params });

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

  const updateCategory = async ({ body }) => {
    try {
      const response = await axiosInstance.put('/categories/update-category', body);

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

  const deleteCategory = async ({ categoryId }) => {
    try {
      const params = { category_id: categoryId };
      const response = await axiosInstance.delete('/categories/delete-category', { params });

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

  return { createCategory, getCategories, updateCategory, deleteCategory };
};
