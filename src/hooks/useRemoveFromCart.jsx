import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Authaxiosinstance from '../api/Authaxiosinstance';

export default function useRemoveFromCart() {

    const QueryClien=useQueryClient();
    return useMutation({
mutationFn:(CartItemId)=>Authaxiosinstance.delete(`/carts/${CartItemId}`),     
onSuccess:()=>{
    QueryClien.invalidateQueries({ queryKey: ["Carts"] });
}
    })
 
}
