import { useMutation, useQueryClient } from "@tanstack/react-query";
import Authaxiosinstance from "../api/Authaxiosinstance";

export default function useUpdateProfile() {

  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedData) => {
      return Authaxiosinstance.patch("/Profile", updatedData);
    },

    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

}