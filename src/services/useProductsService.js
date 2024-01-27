import { axiosErrorAdapter } from 'adapters/axiosErrorAdapter';
import { useAxios } from 'hooks/useAxios';

export const useProductsService = () => {
  const axiosInstance = useAxios();

  // ######### POST #########
  const createProduct = async ({ body }) => {
    try {
      const response = await axiosInstance.post('/products/create-product', body);

      const createProductAdapter = {
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data,
      };

      return createProductAdapter;
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  // ######### GET ##########
  const getProducts = async ({ active }) => {
    try {
      const params = { active };
      const res = await axiosInstance.get('/products/get-products', { params });

      const getProductAdapter = {
        statusCode: res.data.statusCode,
        message: res.data.message,
        data: res.data.data,
      };

      return getProductAdapter;
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  // ####### DELETE ########
  const deleteProduct = async ({ productId }) => {
    try {
      const params = { product_id: productId };
      const res = await axiosInstance.delete('/products/delete-product', { params });

      const deleteProductAdapter = {
        statusCode: res.data.statusCode,
        message: res.data.message,
        data: res.data.data,
      };

      return deleteProductAdapter;
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  // ######### PUT ##########
  const updateProduct = async ({ body }) => {
    try {
      const res = await axiosInstance.put('/products/update-product', body);

      return {
        statusCode: res.data.statusCode,
        message: res.data.message,
        data: res.data.data,
      };
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  const updateProductState = async ({ productId, active }) => {
    try {
      const params = { product_id: productId, active };
      const response = await axiosInstance.patch('/products/update-product-state', null, {
        params,
      });

      return {
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error) {
      return axiosErrorAdapter(error);
    }
  };

  return { createProduct, getProducts, deleteProduct, updateProduct, updateProductState };
};
