import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Authaxiosinstance from "../api/Authaxiosinstance"
export default function usecart() {
const getitems = async () => {
    const token=localStorage.getItem("accessToken");
console.log("TOKEN:", token);
    const response = await Authaxiosinstance.get('/Carts',{
      headers:{
       "Accept-language":"en","Authorization": `Bearer ${token}`

      }
      
    });
    return response.data;
  };

  return useQuery({
    queryKey: ['Carts'],
    queryFn: getitems,
    staleTime: 1000 * 60 * 5
  });
}
