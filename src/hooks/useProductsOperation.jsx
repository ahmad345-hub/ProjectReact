import { useQuery } from '@tanstack/react-query';
import axiosinstance from '../api/axiosinstance';

export default function useProductsOperation({
  page = 1,
  limit = 3,
  sortBy = 'price',
  ascending = true
} = {}) { // افتراضيًا فارغ إذا لم يتم تمريره

  const getProducts = async () => {
    const response = await axiosinstance.get('/Products', {
      params: {
        page,
        limit,
        sortBy,
        ascending
      },
      headers: {
        "Accept-Language": "en"
      }
    });

    console.log("Fetched products:", response.data);
return Array.isArray(response.data?.response?.data) ? response.data.response.data : [];  };

  return useQuery({
    queryKey: ['products', page, limit, sortBy, ascending],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5
  });
}