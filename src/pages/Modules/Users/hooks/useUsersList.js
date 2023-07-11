import { useQuery } from '@tanstack/react-query';
import { useUsersService } from 'services/useUsersService';

export const useUsersList = () => {
  const { getUsers } = useUsersService();
  return useQuery({ queryKey: ['users'], queryFn: getUsers });
};
