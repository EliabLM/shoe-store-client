import { useQuery } from '@tanstack/react-query';
import { useSalesService } from 'services/useSalesService';

export const useSales = (state) => {
  const { getAllSales } = useSalesService();

  return useQuery({
    queryKey: ['sales'],
    queryFn: () => getAllSales({ sale_status: state?.saleStatus }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
