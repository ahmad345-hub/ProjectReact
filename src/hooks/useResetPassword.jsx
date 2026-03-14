import { useMutation } from "@tanstack/react-query";
import axiosinstance from "../api/axiosinstance";

export default function useResetPassword() {

  const mutation = useMutation({
    mutationFn: async ({ email, code, newPassword }) => {
      return await axiosinstance.patch(
        "/auth/Account/ResetPassword",
        {
          email: email,
          code: code,
          newPassword: newPassword,
        }
      );
    },
  });

  return mutation;
}