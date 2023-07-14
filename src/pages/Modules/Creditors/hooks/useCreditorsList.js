import { useQuery } from '@tanstack/react-query';
import { useCreditorsService } from 'services/useCreditorsService';

export const useCreditorsList = () => {
  const { getCreditors } = useCreditorsService();
  return useQuery({ queryKey: ['creditors'], queryFn: getCreditors });
};
