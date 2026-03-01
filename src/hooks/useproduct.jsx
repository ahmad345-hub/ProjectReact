import { useQuery } from '@tanstack/react-query';
import axiosinstance from '../api/axiosinstance';

export default function useProducts(id) {

  const getProduct = async () => {
    const response = await axiosinstance.get(`/Products/${id}`,{
      headers:{
       "Accept-language":"en"
      }
    });
    return response.data;
      console.log(response.data);

  };

  return useQuery({
    queryKey: ['Product', id],
    queryFn:getProduct,
    staleTime: 1000 * 60 * 5
  });
}
