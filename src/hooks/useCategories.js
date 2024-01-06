import { useQuery } from '@tanstack/react-query';
import { useCategoriesService } from 'services/useCategoriesService';

export const useCategories = (state) => {
  const { getCategories } = useCategoriesService();

  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories({ active: state?.active }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
