import { useQuery } from '@tanstack/react-query';
import axiosinstance from '../api/axiosinstance';

export default function useProductsByCategory(categoryId) {
  const getProducts = async () => {
    const response = await axiosinstance.get(`/Products/category/${categoryId}`, {
      headers: {
        "Accept-Language": "en"
      }
    });
    console.log("Fetched products:", response.data);

    // نرجع مباشرة الـ array داخل response
    return response.data?.response || [];
  };

  return useQuery({
    queryKey: ['categoryProducts', categoryId],
    queryFn: getProducts,
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5
  });
}