import { useMutation, useQueryClient } from "@tanstack/react-query";
import Authaxiosinstance from "../api/Authaxiosinstance";

export default function useChangeEmail() {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (newEmail) => {
      return Authaxiosinstance.patch("/Profile/change-email", {
        NewEmail: newEmail,
      });
    },

    onSuccess: () => {
      
      QueryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}