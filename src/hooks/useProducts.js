import { useQuery } from '@tanstack/react-query';
import { useProductsService } from 'services/useProductsService';

export const useProducts = (state) => {
  const { getProducts } = useProductsService();

  return useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts({ active: state?.active }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
