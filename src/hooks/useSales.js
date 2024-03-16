import { useQuery } from '@tanstack/react-query';
import { useSalesService } from 'services/useSalesService';
import { useAuth } from './useAuth';

export const useSales = (state) => {
  const { getAllSales, getSalesByUser } = useSalesService();

  const { user } = useAuth();

  if (user?.role === 'superadmin') {
    return useQuery({
      queryKey: ['sales'],
      queryFn: () => getAllSales({ sale_status: state?.saleStatus }),
      refetchOnWindowFocus: false,
      retry: 1,
    });
  } else {
    return useQuery({
      queryKey: [`sales-user-${user.code}`],
      queryFn: () => getSalesByUser({ saleStatus: state?.saleStatus, user_id: user.id }),
      refetchOnWindowFocus: false,
      retry: 1,
    });
  }
};
