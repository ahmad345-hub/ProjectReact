import { useQuery } from '@tanstack/react-query';
import axiosinstance from '../api/axiosinstance';

export default function useProductsByCategory(categoryId) {
  return useQuery({
    queryKey: ['categoryProducts', categoryId],
    queryFn: async () => {
      const response = await axiosinstance.get(`/Products/category/${categoryId}`);
   
      return Array.isArray(response.data) ? response.data : response.data?.data || [];
    },
    enabled: !!categoryId,       
    staleTime: 1000 * 60 * 5,    
  });
}