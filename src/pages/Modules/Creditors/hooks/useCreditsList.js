import { useQuery } from '@tanstack/react-query';
import { useCreditorsService } from 'services/useCreditorsService';

export const useCreditsList = () => {
  const { getCredits } = useCreditorsService();
  return useQuery({ queryKey: ['credits'], queryFn: getCredits });
};
