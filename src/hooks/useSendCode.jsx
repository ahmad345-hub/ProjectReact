import { useMutation } from "@tanstack/react-query";
import axiosinstance from "../api/axiosinstance";

export default function useSendCode() {

  const mutation = useMutation({
    mutationFn: async (email) => {
      return await axiosinstance.post(
        "/auth/Account/SendCode",
        {
          email: email,
        }
      );
    },
  });

  return mutation;
}