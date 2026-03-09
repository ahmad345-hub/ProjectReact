import Authaxiosinstance from "../api/Authaxiosinstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCheckOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (PaymentMethod) => {
      return await Authaxiosinstance.post("/Checkouts", {
        PaymentMethod: PaymentMethod,
      });
    },

    onSuccess: (response) => {
        if(response.data.url){
            location.href = response.data.url;
        }
      queryClient.invalidateQueries({ queryKey: ["Carts"] });
    },
  });
}