import { useMutation, useQueryClient } from "@tanstack/react-query";
import Authaxiosinstance from "../api/Authaxiosinstance";

export default function useChangePassword() {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (passwords) => {
      return Authaxiosinstance.patch("/Profile/change-password", passwords);
    },

    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}