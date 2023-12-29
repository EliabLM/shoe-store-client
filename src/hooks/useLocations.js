import { useQuery } from '@tanstack/react-query';
import { useLocationsService } from 'services/useLocationsService';

export const useLocations = (state) => {
  const { getLocations } = useLocationsService();

  return useQuery({
    queryKey: ['locations'],
    queryFn: () => getLocations({ active: state?.active }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
