import { useQuery } from '@tanstack/react-query';
import { useBrandsService } from 'services/useBrandsService';

export const useBrands = (state) => {
  const { getBrands } = useBrandsService();

  return useQuery({
    queryKey: ['brands'],
    queryFn: () => getBrands({ active: state?.active }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
