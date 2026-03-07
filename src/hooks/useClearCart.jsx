import { useMutation, useQueryClient } from "@tanstack/react-query";
import Authaxiosinstance from "../api/Authaxiosinstance";

export default function useClearCart() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      Authaxiosinstance.delete("/carts/clear"),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Carts"] });
    },
  });

}