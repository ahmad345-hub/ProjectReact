import { useQuery } from '@tanstack/react-query';
import axiosinstance from '../api/axiosinstance';

export default function usecatagories(limit=4) {

  const getCategories = async () => {
    const response = await axiosinstance.get(`/Categories?limit=${limit}`,{
      headers:{
       "Accept-language":"en"
      }
    });
    return response.data;
      console.log(response.data);

  };

  return useQuery({
    queryKey: ['categories', limit],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5
  });
}
