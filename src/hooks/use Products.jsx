import { useQuery } from '@tanstack/react-query';
import axiosinstance from '../api/axiosinstance';
import i18n from '../i18next.jsx';

export default function useProducts() {

  const getProducts = async () => {
    const response = await axiosinstance.get('/Products',{
      
  });
    return response.data;
      console.log(response.data);

  };

  return useQuery({
    queryKey: ['Products', i18n.language ],
    queryFn:getProducts,
    staleTime: 1000 * 60 * 5
  });
}
