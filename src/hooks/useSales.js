import { useQuery } from '@tanstack/react-query';
import { useSalesService } from 'services/useSalesService';
import { useAuth } from './useAuth';

export const useSales = (state) => {
  const { getAllSales } = useSalesService();

  const { user } = useAuth();

  if (user?.role === 'superadmin') {
    return useQuery({
      queryKey: ['sales'],
      queryFn: () => getAllSales({ sale_status: state?.saleStatus }),
      refetchOnWindowFocus: false,
      retry: 1,
    });
  } else if (user?.role === 'admin') {
    return useQuery({
      queryKey: [`sales-locations-${user.code}`],
      queryFn: () =>
        getAllSales({ saleStatus: state?.saleStatus, sale_location: user?.location?._id }),
      refetchOnWindowFocus: false,
      retry: 1,
    });
  } else if (user?.role === 'vendedor') {
    return useQuery({
      queryKey: [`sales-user-${user.code}`],
      queryFn: () => getAllSales({ saleStatus: state?.saleStatus, user_id: user.id }),
      refetchOnWindowFocus: false,
      retry: 1,
    });
  }
};
