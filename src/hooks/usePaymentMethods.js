import { useQuery } from '@tanstack/react-query';
import { usePaymentMethodsService } from 'services/usePaymentMethodsService';

export const usePaymentMethods = (state) => {
  const { getPaymentMethods } = usePaymentMethodsService();

  return useQuery({
    queryKey: ['payment_methods'],
    queryFn: () => getPaymentMethods({ active: state?.active }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
