import { axiosErrorAdapter } from 'adapters/axiosErrorAdapter';
import { useAxios } from 'hooks/useAxios';

export const useLocationsService = () => {
  const axiosInstance = useAxios();

  const createLocation = async ({ body }) => {
    try {
      const response = await axiosInstance.post('/locations/create-location', body);

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

  const getLocations = async ({ active }) => {
    try {
      const params = { active };
      const response = await axiosInstance.get('/locations/get-locations', { params });

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

  const updateLocation = async ({ body }) => {
    try {
      const response = await axiosInstance.put('/locations/update-location', body);

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

  const deleteLocation = async ({ locationId }) => {
    try {
      const params = { location_id: locationId };
      const response = await axiosInstance.delete('/locations/delete-location', { params });

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

  return { createLocation, getLocations, updateLocation, deleteLocation };
};
