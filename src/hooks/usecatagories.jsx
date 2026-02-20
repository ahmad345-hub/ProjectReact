import { useQuery } from '@tanstack/react-query';
import axiosinstance from '../api/axiosinstance';

export default function usecatagories() {

  const getCategories = async () => {
    const response = await axiosinstance.get('/Categories',{
      headers:{
       "Accept-language":"en"
      }
    });
    return response.data;
  };

  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5
  });
}
