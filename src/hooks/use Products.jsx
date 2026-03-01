import { useQuery } from '@tanstack/react-query';
import axiosinstance from '../api/axiosinstance';

export default function useProducts() {

  const getProducts = async () => {
    const response = await axiosinstance.get('/Products',{
      headers:{
       "Accept-language":"en"
      }
    });
    return response.data;
      console.log(response.data);

  };

  return useQuery({
    queryKey: ['Products'],
    queryFn:getProducts,
    staleTime: 1000 * 60 * 5
  });
}
