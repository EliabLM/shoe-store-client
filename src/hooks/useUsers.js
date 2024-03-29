import { useQuery } from '@tanstack/react-query';
import { useUsersService } from 'services/useUsersService';

export const useUsers = (state) => {
  const { getUsers } = useUsersService();

  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers({ active: state?.active }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
