import { useMutation, useQueryClient } from "@tanstack/react-query";
import Authaxiosinstance from "../api/Authaxiosinstance";

export default function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, count }) =>
      Authaxiosinstance.patch(`/carts/${id}`, {
        count: count,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Carts"] });
    },
  });
}