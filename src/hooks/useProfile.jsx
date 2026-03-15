import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Authaxiosinstance from '../api/Authaxiosinstance';

export default function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await Authaxiosinstance.get('/profile');
      return response.data;
    },
        staleTime: 1000 * 60 * 5

    });
}  