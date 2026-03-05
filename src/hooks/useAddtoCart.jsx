import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Authaxiosinstance from '../api/Authaxiosinstance';
import { useQueryClient } from '@tanstack/react-query';
export default function useAddtoCart() {
const QueryClien=useQueryClient();
  const mutation = useMutation({
mutationFn:async({ ProductId, Count })=>{
    return await Authaxiosinstance.post("/carts/",{
      ProductId: ProductId,
       Count: Count,
    })
}, onSuccess:()=>{
    QueryClien.invalidateQueries({ queryKey: ["Carts"] });
    
}
})

  return mutation;
}
