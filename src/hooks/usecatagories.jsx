import { useQuery } from '@tanstack/react-query';
import axiosinstance from '../api/axiosinstance';
import i18n from '../i18next.jsx';
export default function usecatagories(limit=4) {

  const getCategories = async () => {
    const response = await axiosinstance.get(`/Categories?limit=${limit}`,{
      
    });
    return response.data;
      console.log(response.data);

  };

  return useQuery({
    queryKey: ['categories', i18n.language, limit],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5
  });
}
